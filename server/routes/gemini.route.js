import express from "express";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();
const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    temperature: 0.7,
    maxOutputTokens: 1200,
  },
});

router.post("/generate-itinerary", async (req, res) => {
  const { destination, days, groupType, budget } = req.body;


  if (!destination || !days || !groupType || !budget) {
    return res.status(400).json({ error: "Missing required fields in request body." });
  }

  console.log("Request received:", { destination, days, groupType, budget });

 
  let prompt = `
You are a travel planner. Create a day-wise travel itinerary for a ${days}-day trip to ${destination} for a ${groupType} with a ${budget} budget.

Guidelines:
- Cover all ${days} days.
- If ${destination} is a large region, include different areas in logical travel order.
- Include activities, travel time, estimated ticket cost, and highlights per day.
- Mix popular spots and hidden gems.
- Suggest suitable hostels and restaurants (budget-matching).
- Output must be strict valid JSON in the following format:

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
Return only valid JSON. Do not include markdown/code blocks.
`;


  if (parseInt(days) > 10) {
    prompt += `
If the trip exceeds 10 days, group extended activities as:
"Day 11-100: Summary of rural exploration, cultural events, or workshops with realistic details."
    `;
  }

  try {
    const result = await model.generateContent(prompt);
    const rawText = (await result.response).text();
    console.log("Gemini raw response:", rawText);

    const cleaned = rawText.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleaned);

    res.json({ success: true, data: parsed });
  } catch (error) {
    console.error("Error during itinerary generation:", error);
    res.status(500).json({
      success: false,
      error: "Failed to generate itinerary.",
      message: error.message,
    });
  }
});

export default router;
