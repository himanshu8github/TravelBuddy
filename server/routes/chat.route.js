import express from "express";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({ success: false, message: "Invalid input." });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const generationConfig = {
      maxOutputTokens: 1024,
      temperature: 0.7,
    };

   
    const validationPrompt = `Respond only with "true" or "false": Is "${prompt}" a valid Indian travel destination?`;

    const validationResponse = await model.generateContent({
      contents: [{ role: "user", parts: [validationPrompt] }],
      generationConfig,
    });

    const isValid = validationResponse.response.text().trim().toLowerCase();
    console.log("Validation:", isValid);

    if (isValid !== "true") {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid Indian state, city, or destination.",
      });
    }

  
    const travelGuidePrompt = `
You are a travel assistant. Given the Indian state or city: "${prompt}", return a travel guide in JSON format.

Include 3-5 cities. For each city, include:
- spots
- experiences
- seasonalTips
- localFoods
- travelTips

Respond only with JSON like:
{
  "state": "${prompt}",
  "cities": [
    {
      "name": "",
      "spots": [],
      "experiences": [],
      "seasonalTips": [],
      "localFoods": [],
      "travelTips": []
    }
  ]
}
`;

    const travelGuideResponse = await model.generateContent({
      contents: [{ role: "user", parts: [travelGuidePrompt] }],
      generationConfig,
    });

    const rawText = travelGuideResponse.response.text().trim();
    const cleanedText = rawText.replace(/```json|```/g, "").trim();

    let json;
    try {
      json = JSON.parse(cleanedText);
    } catch (parseErr) {
      console.error(" JSON Parse Error:", parseErr);
      return res.status(500).json({
        success: false,
        message: "AI response was not valid JSON.",
        debug: cleanedText,
      });
    }

    console.log(" Travel Guide JSON Parsed");
    res.status(200).json({ success: true, answer: json });

  } catch (error) {
    console.error(" Gemini API error:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
});

export default router;
