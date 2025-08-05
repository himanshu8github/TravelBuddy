import { GoogleGenerativeAI } from "@google/generative-ai";
import { jsonrepair } from "jsonrepair";

//  Access key from already-loaded process.env
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
if (!genAI) {
  throw new Error("GEMINI_API_KEY environment variable is not set.");
}

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
  generationConfig: {
    temperature: 0.7,
    maxOutputTokens: 2800,
  },
});

export const generateItinerary = async (req, res) => {
  const { destination, days, groupType, budget } = req.body;

  if (!destination || !days || !groupType || !budget) {
    return res.status(400).json({ error: "Missing required fields in request body." });
  }

let prompt = `
You are a travel itinerary planner. Generate a ${days}-day itinerary for ${destination} for a ${groupType} with a ${budget} budget.
For each day, list 3-4 realistic and geographically logical activities with a short description.
Return a single JSON object.

Output Structure:
{
  "itinerary": {
    "Day 1": [
      { "activity": "Activity Name", "description": "Brief description." }
    ],
    "Day 2": [
      // ...
    ]
  }
}
`;


  if (parseInt(days) > 10) {
    prompt += `
If the trip exceeds 2 days, group extended activities as:
"Day 3-100: Summary of rural exploration, cultural events, or workshops with realistic details."
`;
  }

  try {
    const result = await model.generateContent(prompt);
    const rawText = (await result.response).text();
    const cleaned = rawText.replace(/```json|```/g, "").trim();

   try {
  const repaired = jsonrepair(cleaned);
  const parsed = JSON.parse(repaired);
  res.json({ success: true, data: parsed });

} catch (parseError) {
  console.error('JSON Parse Error:', parseError, 'Raw response:', cleaned);
  res.status(500).json({
    success: false,
    error: "Failed to parse or repair Gemini response",
    message: parseError.message,
    rawResponse: cleaned,
  });
}
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to generate itinerary.",
      message: error.message,
    });
  }
};
