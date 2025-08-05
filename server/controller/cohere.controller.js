import { CohereClient } from "cohere-ai";
import dotenv from "dotenv";

dotenv.config();

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

export const createItinerary = async (req, res) => {
  const { destination, days, budget, tripType } = req.body;

  let itineraryInstruction = `Day-wise itinerary for ${days} days (2–3 activities per day).`;

  if (parseInt(days) > 10) {
    itineraryInstruction = `
- For the first 10 days: Provide detailed day-wise itinerary (2–3 activities per day).
- From Day 11 onward: Group into a single summary block (e.g., "day": "11–${days}").
- The grouped days should contain 5–10 lines of detailed summary activities.
`;
  }

  const prompt = `
Generate a valid JSON travel itinerary for a ${days}-day trip to ${destination}.
The traveler is going with ${tripType} and has a ${budget} budget.

🔧 Requirements:
- Include 3–4 budget hostels or zostels (with name, location, pricePerNight, rating, description)
- Include 3–4 restaurants (name, location, cuisine, avgPrice, rating, description)
${itineraryInstruction}
- Each activity must have "placeName", "details", and "ticketPrice"
- Do NOT include "travelTime"
- All keys and strings must be double-quoted ("") – no single quotes or unquoted keys
- Avoid trailing commas or malformed arrays

 If days > 10, example for summary block:
{
  "day": "11–${days}",
  "activities": [
    {
      "placeName": "Local Temples & Rural Villages",
      "details": "Visit lesser-known temples, rural farms, and small towns to explore the local cultural fabric.",
    
    },
    {
      "placeName": "Traditional Workshops",
      "details": "Participate in pottery, weaving, and cooking experiences with local artisans.",
     
    },
    {
      "placeName": "Cultural Events",
      "details": "Enjoy Haryanvi folk dance and music at regional auditoriums or community centers.",
     
    }
  ]
}

 Important:
- STRICTLY return ONLY valid JSON (no Markdown, comments, or explanations)
- Do not add any intro or summary outside JSON
- Ensure response is complete and fully closed

 Example format:
{
  "hostels": [
    {
      "name": "Zostel Goa",
      "location": "Anjuna",
      "pricePerNight": "INR 800",
      "rating": "4.5",
      "description": "A lively backpacker hostel near the beach."
    }
  ],
  "restaurants": [
    {
      "name": "Cafe Mambo",
      "location": "Baga Beach",
      "cuisine": "Goan",
      "avgPrice": "INR 500",
      "rating": "4.2",
      "description": "Popular spot for Goan seafood and nightlife."
    }
  ],
  "itinerary": [
    {
      "day": 1,
      "activities": [
        {
          "placeName": "Baga Beach",
          "details": "Relax and enjoy water sports",
          
        }
      ]
    }
  ]
}
`;

  try {
    const response = await cohere.generate({
      model: "command-r-plus",
      prompt,
      max_tokens: 5000,
      temperature: 0.8,
    });

    const rawText = response.generations[0].text.trim();
    console.log(" Raw AI Response:\n", rawText);

    const firstBrace = rawText.indexOf("{");
    const lastBrace = rawText.lastIndexOf("}");

    if (firstBrace === -1 || lastBrace === -1) {
      console.error(" No valid JSON braces found in AI response");
      return res.status(500).json({
        message: "No valid JSON structure in response",
        rawText,
      });
    }

    const jsonText = rawText.slice(firstBrace, lastBrace + 1);
    console.log("📦 Extracted JSON string:\n", jsonText);

    let structuredData;
    try {
      structuredData = JSON.parse(jsonText);
    } catch (parseErr) {
      console.error(" JSON parsing failed:", parseErr.message);
      return res.status(500).json({
        message: "JSON parsing failed",
        error: parseErr.message,
        rawText,
        jsonText,
      });
    }

    res.status(200).json({ data: structuredData });
  } catch (error) {
    console.error("Error creating itinerary:", error.message);
    res.status(500).json({
      message: "Something went wrong while generating itinerary",
      error: error.message,
    });
  }
};
