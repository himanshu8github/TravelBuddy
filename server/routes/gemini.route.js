import express from "express";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();
const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // or "gemini-1.5-pro"

router.post("/", async (req, res) => {
  const { destination, days, groupType, budget } = req.body;

  const prompt = `
Generate a travel plan for location ${destination}, for ${days} days for a ${groupType} with a ${budget} budget.
Return:
- A list of hostels with name, address, price per night, image URL, geo coordinates (latitude, longitude), rating, and description
- A ${days}-day itinerary, with day-wise activities, for each:
    - placeName, details, imageUrl, geo_coordinates, ticketPrice, travelTime
Strictly return only in JSON format. Do not include \`\`\`json or any Markdown code block formatting.
`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    // Remove Markdown-style ```json or ``` wrappers if any
    const cleanedText = text.replace(/```json|```/g, "").trim();

    // Try parsing the cleaned text
    const parsed = JSON.parse(cleanedText);
    res.status(200).json({ itinerary: parsed });

  } catch (error) {
    console.error("Gemini API error:", error);
    res.status(500).json({ error: "Failed to generate itinerary." });
  }
});

export default router;
