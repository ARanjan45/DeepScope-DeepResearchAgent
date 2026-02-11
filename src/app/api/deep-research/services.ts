import Groq from "groq-sdk";
import Exa from "exa-js";

export const exa = new Exa(process.env.EXA_SEARCH_API_KEY || "");

export const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY || "",
});