import express from "express";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();
const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

router.post("/generate-itinerary", async (req, res) => {
  const { destination, days, groupType, budget } = req.body;

  const prompt = `
Generate a travel plan for ${destination} for ${days} days for a ${groupType} with a ${budget} budget.

Return strictly in JSON format:
{
  "hostels": [
    {
      "name": "",
      "location": "",
      "pricePerNight": "",
      "rating": "",
      "description": ""
    }
  ],
  "restaurants": [
    {
      "name": "",
      "location": "",
      "avgPrice": "",
      "cuisine": "",
      "rating": "",
      "description": ""
    }
  ],
  "itinerary": [
    {
      "day": 1,
      "activities": [
        {
          "placeName": "",
          "details": "",
          "ticketPrice": "",
          "travelTime": ""
        }
      ]
    }
  ]
}
`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const cleaned = text.replace(/```json|```/g, "").trim();
    const json = JSON.parse(cleaned);
    res.json(json);
  } catch (error) {
    console.error("Gemini API error:", error);
    res.status(500).json({ error: "Failed to generate itinerary." });
  }
});

export default router;
