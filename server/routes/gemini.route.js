import express from "express";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();
const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

router.post("/generate-itinerary", async (req, res) => {
  const { destination, days, groupType, budget } = req.body;

  if (!destination || !days || !groupType || !budget) {
  return res.status(400).json({ error: "Missing required fields in request body." });
}

  console.log(" Request received:", { destination, days, groupType, budget });

 const prompt = `
You are a professional travel planner. Create a detailed day-wise travel itinerary for a trip to ${destination} lasting ${days} days. The traveler is a ${groupType} and prefers a ${budget} budget.

 Requirements:
- The plan **must cover all ${days} days** without skipping.
- If ${destination} is a large region or state, include different cities or areas in a logical travel path.
- Each day should include multiple **activities**, **travel time**, **estimated ticket costs**, and **highlights**.
- Make the experience realistic: mix famous spots with hidden gems, and ensure enough rest days or light days for long trips (30+ days).
- Keep the **JSON format** strictly as described below.
- For long itineraries, avoid repeating the same phrases—make it engaging and practical.

Return strictly in this JSON format:
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
        console.log(" Gemini response:", text);

    const cleaned = text.replace(/```json|```/g, "").trim();
    const json = JSON.parse(cleaned);
    res.json(json);
  } catch (error) {
    console.error(" Error during itinerary generation:", error);
    res.status(500).json({
      error: "Failed to generate itinerary.",
      message: error.message,
      });
  }
});
export default router;
