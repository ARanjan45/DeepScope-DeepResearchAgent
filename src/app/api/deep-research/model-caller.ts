import { groq } from "./services";
import { ActivityTracker, ModelCallOptions, ResearchState } from "./types";
import { MAX_RETRY_ATTEMPTS, RETRY_DELAY_MS } from "./constants";
import { delay } from "./utils";

export async function callModel<T>({
    model, prompt, system, schema, activityType = "generate"
}: ModelCallOptions<T>,
researchState: ResearchState, activityTracker: ActivityTracker): Promise<T | string> {

    let attempts = 0;
    let lastError: Error | null = null;

    while (attempts < MAX_RETRY_ATTEMPTS) {
        try {
            const messages: any[] = [];
            
            // Build the prompt with JSON instructions if schema is provided
            let finalPrompt = prompt;
            if (schema) {
                finalPrompt = `${prompt}

IMPORTANT: You MUST respond with ONLY a valid JSON object. No explanations, no markdown, no additional text.
Return ONLY the JSON object with no code blocks or formatting.`;
            }
            
            if (system) {
                messages.push({
                    role: "system",
                    content: system
                });
            }
            
            messages.push({
                role: "user",
                content: finalPrompt
            });

            const completion = await groq.chat.completions.create({
                model: model,
                messages: messages,
                temperature: 0.3,
                max_tokens: 4000,
            });

            let text = completion.choices[0]?.message?.content || "";
            
            // Track tokens
            researchState.tokenUsed += (completion.usage?.total_tokens || 0);
            researchState.completedSteps++;

            // If schema is provided, aggressively clean and parse JSON
            if (schema) {
                try {
                    // Remove markdown code blocks
                    text = text.trim()
                        .replace(/```json\s*/g, '')
                        .replace(/```\s*/g, '')
                        .replace(/^[^{[]*/, '')
                        .replace(/[^}\]]*$/, '');
                    
                    // Try to find JSON in the response
                    const jsonMatch = text.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
                    if (jsonMatch) {
                        text = jsonMatch[0];
                    }
                    
                    const parsed = JSON.parse(text);
                    return parsed as T;
                } catch (parseError) {
                    console.error("JSON parse error:", parseError);
                    console.error("Attempted to parse:", text);
                    
                    throw new Error(`Failed to parse JSON response: ${text.substring(0, 100)}...`);
                }
            }

            return text;
        } catch (error) {
            attempts++;
            lastError = error instanceof Error ? error : new Error('Unknown error');

            if (attempts < MAX_RETRY_ATTEMPTS) {
                activityTracker.add(activityType, 'warning', `Model call failed, attempt ${attempts}/${MAX_RETRY_ATTEMPTS}. Retrying...`)
                console.error(`Attempt ${attempts} failed:`, error);
            }
            await delay(RETRY_DELAY_MS * attempts)
        }
    }

    throw lastError || new Error(`Failed after ${MAX_RETRY_ATTEMPTS} attempts!`)
}