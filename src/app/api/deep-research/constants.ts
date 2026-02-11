// Research constants
export const MAX_ITERATIONS = 4;  // Reduced from 5
export const MAX_SEARCH_RESULTS = 5;  // Reduced from 8
export const MAX_CONTENT_CHARS = 10000;  // Reduced from 15000
export const MAX_RETRY_ATTEMPTS = 3;
export const RETRY_DELAY_MS = 1000;

// Model names - Using Groq (FREE & FAST)
export const MODELS = {
  PLANNING: "llama-3.3-70b-versatile",
  EXTRACTION: "llama-3.1-8b-instant",
  ANALYSIS: "llama-3.3-70b-versatile",
  REPORT: "llama-3.3-70b-versatile"
};