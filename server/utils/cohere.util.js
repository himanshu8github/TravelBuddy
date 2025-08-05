import { CohereClient } from "cohere-ai";
import dotenv from "dotenv";

dotenv.config();

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

export const generateResponse = async (prompt) => {
  try {
    const response = await cohere.generate({
      model: "command-r-plus",  // Best for reasoning, planning
      prompt,
      maxTokens: 800,
      temperature: 0.8,
    });

    return response.generations[0].text.trim();
  } catch (error) {
    console.error("Cohere Error:", error);
    return "Sorry, couldn't generate response right now.";
  }
};
