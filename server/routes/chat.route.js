import express from "express";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/", async (req, res) => {
  try {
    const { prompt } = req.body;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });



const result = await model.generateContent(
`You are a travel expert assistant. Given an Indian state name, return a travel guide strictly in **valid JSON format**. Do not return markdown, text, or explanations. Your response MUST start with a JSON object that includes a top-level "state" key.

Instructions:
- Include 5 to 8 famous cities to visit in the given Indian state.
- For each city, include:
  - Top places/spots to visit
  - Unique experiences
  - Seasonal tips
  - Local foods
  - Travel tips

Input State: "${prompt}"

Return JSON like:
{
  "state": "${prompt}",
  "cities": [
    {
      "name": "City Name",
      "spots": ["spot1", "spot2"],
      "experiences": ["exp1", "exp2"],
      "seasonalTips": ["tip1"],
      "localFoods": ["food1"],
      "travelTips": ["tip1"]
    }
  ]
}

IMPORTANT: Only return raw JSON (no markdown/code blocks).`
);


    

    const response = result.response;
    const text = response.text();

    // Clean response text and parse
    const cleanedText = text.replace(/```json|```/g, "").trim();
    const json = JSON.parse(cleanedText);
    console.log("Raw Gemini Response:\n", text);
console.log("Cleaned JSON:\n", cleanedText);
console.log("Parsed JSON:\n", json);


    res.status(200).json({ success: true, answer: json });
  } catch (error) {
    console.error("Gemini API error:", error);
    res.status(500).json({ success: false, message: "Something went wrong", error: error.message });
  }
});

export default router;