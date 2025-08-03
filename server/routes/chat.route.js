import express from "express";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/generate-itinerary", async (req, res) => {
  try {
    const { prompt } = req.body;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(
      `Give me a travel guide for the Indian state "${prompt}" in structured JSON. Include:
- 3 to 5 most famous cities to visit in that state.
- For each city, include:
  - Top places/spots to visit
  - Unique experiences to try
  - Seasonal tips (like snowfall, avoid monsoon, etc.)

Return response in this JSON format only:

{
  "state": "${prompt}",
  "cities": [
    {
      "name": "",
      "spots": [],
      "experiences": [],
      "seasonalTips": []
    }
  ]
}`
    );

    const response = result.response;
    const text = response.text();

    // Clean response text and parse
    const cleanedText = text.replace(/```json|```/g, "").trim();
    const json = JSON.parse(cleanedText);

    res.status(200).json({ success: true, answer: json });
  } catch (error) {
    console.error("Gemini API error:", error);
    res.status(500).json({ success: false, message: "Something went wrong", error: error.message });
  }
});

export default router;