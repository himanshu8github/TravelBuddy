import Groq from "groq-sdk";

export const createItinerary = async (req, res) => {
  try {
    const { destination, days, tripType, budget, startDate } = req.body;

    if (!destination || !days || !tripType || !budget) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    const maxDays = Math.min(Number(days), 10);
    const month = startDate ? new Date(startDate).toLocaleString('default', { month: 'long' }) : 'current';

// const prompt = `Generate a COMPLETE, DETAILED, REALISTIC travel itinerary for ${destination} for ${maxDays} days in ${month}.
// Trip Type: ${tripType}. Budget Level: ${budget}.
// Assume Delhi as starting point for route planning.

// CRITICAL REQUIREMENTS:
// 1. REALISTIC DATA - Use actual current prices for ${destination}
// 2. DETAILED ADDRESSES - Include actual addresses and contact numbers
// 3. SPECIFIC DISTANCES - Mention distances like "5km from center", "8km from main ghat"
// 4. REALISTIC ROUTES - Include actual bus/train routes from Delhi with specific details
// 5. DETAILED DAY-WISE - Specific timings, temples, ghats, local experiences
// 6. CULTURE FOCUS - Local interactions, people meetings, cultural exploration
// 7. MINIMUM 2-4 OPTIONS - Stays and restaurants: minimum 4-5, maximum 7 each

// EXAMPLE ITINERARY FLOW (Reference only, adapt to destination):
// Day 1: Arrive → Check-in → Evening visit local ghat/temple → Explore evening market → Dinner → Rest
// Day 2: 5 AM morning aarti at main temple → Breakfast at local dhaba → Explore food stalls → Rent scooty → Visit nearby temple/waterfall → Lunch → Explore hidden gems → Evening ghat visit → Night exploration → Dinner

// Return STRICT JSON ONLY (NO MARKDOWN):

// {
//   "cost": {
//     "accommodation": "₹800-1500/night specify cheap moderate luxury options",
//     "food": "₹300-500/person/day breakfast lunch dinner breakdown",
//     "transport": {
//       "delhi_to_destination": "Bus Train ₹500-2000 specify exact route duration availability",
//       "local_transport": "₹200-400/day auto ₹8/km taxi ₹15/km bus ₹10-20/ride",
//       "scooty_rental": "₹300-500/day available at bus station or city center"
//     },
//     "activities": {
//       "items": [
//         "Temple visit: Free-₹200",
//         "Local adventure rafting trek: ₹500-2000",
//         "Cable car viewpoint: ₹200-500",
//         "Ghat evening visit: Free",
//         "Local tour guide: ₹500-1000/day"
//       ],
//       "total": "₹X total for activities"
//     },
//     "entryFees": "₹300-800 temples viewpoints attractions",
//     "totalEstimate": "₹X per person for ${maxDays} days",
//     "budgetStatus": "Within Budget",
//     "summary": "Detailed daily budget breakdown with tips to save money"
//   },
//   "weather": {
//     "month": "${month}",
//     "forecast": [
//       {
//         "day": 1,
//         "temp": "X-X°C",
//         "condition": "Sunny/Rainy/Cold/Windy",
//         "icon": "☀️",
//         "activities": "Suitable activities for this weather",
//         "alerts": "Road conditions safety warnings"
//       }
//     ],
//     "summary": "Overall weather pattern during trip"
//   },
//   "packing": {
//     "month": "${month}",
//     "weatherType": "Winter Summer Monsoon",
//     "categories": [
//       {
//         "name": "Clothing",
//         "items": ["Weather-appropriate outfits", "Comfortable walking clothes", "Formal outfit"]
//       },
//       {
//         "name": "Footwear",
//         "items": ["Comfortable trekking shoes", "Casual sandals", "Weather-appropriate socks"]
//       },
//       {
//         "name": "Weather-Specific Gear",
//         "items": ["Winter: Jackets thermal wear gloves", "Summer: Light clothes hat", "Monsoon: Raincoat waterproof bag"]
//       },
//       {
//         "name": "Electronics",
//         "items": ["Power bank", "Phone charger", "Camera", "Headphones"]
//       },
//       {
//         "name": "Health Safety",
//         "items": ["First aid kit", "Medications", "Sunscreen SPF 50", "Insect repellent"]
//       },
//       {
//         "name": "Documents",
//         "items": ["ID Passport", "Travel insurance", "Cash", "Credit cards", "Emergency contacts"]
//       },
//       {
//         "name": "Toiletries",
//         "items": ["Toothbrush paste", "Shampoo", "Soap", "Deodorant"]
//       },
//       {
//         "name": "Adventure Gear",
//         "items": ["Swimsuit", "Dry bag", "Light backpack", "Trekking equipment if needed"]
//       }
//     ]
//   },
//   "routes": {
//     "startingPoint": "Delhi",
//     "transportDetails": "Specify exact bus train routes timing duration cost",
//     "dayPlan": [
//       {
//         "day": 1,
//         "title": "Delhi to ${destination} Travel Day",
//         "route": "Delhi bus stand → Specific destination with stops",
//         "busDetails": "Bus operator names departure time arrival",
//         "activities": [
//           {
//             "time": "Early Morning 5-6 AM",
//             "activity": "Depart from Delhi bus stand",
//             "details": "Take bus from Kashmere Gate ISBT",
//             "duration": "Travel time"
//           },
//           {
//             "time": "Afternoon Evening",
//             "activity": "Arrive and check-in",
//             "details": "Rest refresh explore surroundings",
//             "duration": "2-3 hours"
//           },
//           {
//             "time": "Evening 5-6 PM",
//             "activity": "Visit local ghat temple for evening aarti",
//             "details": "Experience spiritual atmosphere meet locals",
//             "duration": "1-2 hours"
//           },
//           {
//             "time": "Night 7-8 PM",
//             "activity": "Explore evening market",
//             "details": "Try street food chat with shopkeepers",
//             "duration": "1-2 hours"
//           }
//         ]
//       },
//       {
//         "day": 2,
//         "title": "Local Exploration Culture Immersion",
//         "activities": [
//           {
//             "time": "Early Morning 5-5:30 AM",
//             "activity": "Visit main temple for morning aarti",
//             "details": "Join locals in prayers experience spirituality",
//             "duration": "1 hour"
//           },
//           {
//             "time": "Morning 6:30-7:30 AM",
//             "activity": "Breakfast at local dhaba",
//             "details": "Try authentic local breakfast interact with locals",
//             "duration": "45 mins",
//             "cost": "₹80-150"
//           },
//           {
//             "time": "Late Morning 8-9 AM",
//             "activity": "Explore local food markets",
//             "details": "Buy local snacks talk to vendors",
//             "duration": "1 hour",
//             "cost": "₹100-300"
//           },
//           {
//             "time": "Morning 9-11 AM",
//             "activity": "Rent scooty bike for day",
//             "details": "Get helmet basic insurance",
//             "duration": "Whole day",
//             "cost": "₹300-500"
//           },
//           {
//             "time": "Late Morning 11 AM-1 PM",
//             "activity": "Visit nearby temple waterfall",
//             "details": "Specific location X km from center",
//             "duration": "2 hours",
//             "cost": "₹200-1000"
//           },
//           {
//             "time": "Afternoon 1-2 PM",
//             "activity": "Lunch at local restaurant",
//             "details": "Try regional cuisine relax",
//             "duration": "1 hour",
//             "cost": "₹150-400"
//           },
//           {
//             "time": "Afternoon 2-5 PM",
//             "activity": "Explore hidden gems local cafes",
//             "details": "Interact with artists understand local lifestyle",
//             "duration": "3 hours",
//             "cost": "₹200-500"
//           },
//           {
//             "time": "Evening 5-6 PM",
//             "activity": "Visit ghat for sunset",
//             "details": "Meet travelers enjoy peaceful moment",
//             "duration": "1-2 hours",
//             "cost": "Free"
//           },
//           {
//             "time": "Evening 6-7 PM",
//             "activity": "Evening aarti at temple",
//             "details": "Experience spiritual gathering",
//             "duration": "1 hour",
//             "cost": "Free-₹50"
//           },
//           {
//             "time": "Night 7-8 PM",
//             "activity": "Dinner at local restaurant",
//             "details": "Try evening specialties",
//             "duration": "1-1.5 hours",
//             "cost": "₹150-400"
//           },
//           {
//             "time": "Late Night 8-10 PM",
//             "activity": "Night exploration ghat walk",
//             "details": "Chat with locals understand culture",
//             "duration": "2 hours",
//             "cost": "Free"
//           }
//         ]
//       }
//     ],
//     "localTransport": {
//       "taxi": "₹15/km negotiate before travel",
//       "auto": "₹8/km cheapest option",
//       "bus": "₹10-20 per ride",
//       "scooty": "₹300-500/day best exploration"
//     },
//     "recommendations": "Detailed recommendations about best routes and safety"
//   },
//   "tips": {
//     "bestTime": "Specify best months for ${destination}",
//     "cultureExploration": [
//       "Visit temples understand rituals",
//       "Attend aarti ceremonies",
//       "Eat at local dhabas",
//       "Meet shopkeepers residents",
//       "Explore local markets",
//       "Participate in local activities",
//       "Learn local language basic words",
//       "Respect customs traditions"
//     ],
//     "localTransport": {
//       "taxi": "₹15/km negotiate fixed price",
//       "auto": "₹8/km meter negotiate",
//       "bus": "₹10-20 per ride",
//       "scooty": "₹300-500/day best freedom"
//     },
//     "safetyTips": [
//       "Avoid solo trekking",
//       "Roads dangerous in monsoon",
//       "Dont trust strangers",
//       "Use official hotels",
//       "Keep valuables safe",
//       "Avoid traveling alone after 9 PM",
//       "Share location with home",
//       "Keep emergency numbers"
//     ],
//     "culturalEtiquette": [
//       "Dress modestly in temples",
//       "Remove shoes in sacred places",
//       "Ask permission for photos",
//       "Respect prayer times",
//       "Tip 5-10 percent",
//       "Learn local words",
//       "Dont point at sacred objects",
//       "Respect elders"
//     ],
//     "hiddenGems": [
//       "Lesser-known villages",
//       "Local viewpoints",
//       "Artist cafes",
//       "Nature trails",
//       "Ancient temples"
//     ],
//     "localEvents": [
//       "Festival dates",
//       "Local fairs",
//       "Night bazaars",
//       "Community celebrations"
//     ]
//   },
//   "stays": [
//     {
//       "budget": "cheap",
//       "accommodations": [
//         {
//           "name": "Ashram Name",
//           "type": "Ashram Hostel",
//           "pricePerNight": "₹500-800",
//           "address": "Specific address",
//           "distance": "X km from center",
//           "contact": "+91-XXXXXXXXXX",
//           "rating": "4.0",
//           "description": "Spiritual clean social"
//         },
//         {
//           "name": "Hostel Name",
//           "type": "Hostel Dorm",
//           "pricePerNight": "₹600-1000",
//           "address": "Specific location",
//           "distance": "X km from main area",
//           "contact": "+91-XXXXXXXXXX",
//           "rating": "4.2",
//           "description": "Social backpacker friendly"
//         },
//         {
//           "name": "Homestay Name",
//           "type": "Homestay",
//           "pricePerNight": "₹700-1200",
//           "address": "Specific address",
//           "distance": "X km from center",
//           "contact": "+91-XXXXXXXXXX",
//           "rating": "4.3",
//           "description": "Local family authentic meals"
//         },
//         {
//           "name": "Guesthouse Name",
//           "type": "Budget Hotel",
//           "pricePerNight": "₹800-1300",
//           "address": "Specific location",
//           "distance": "X km from main area",
//           "contact": "+91-XXXXXXXXXX",
//           "rating": "4.1",
//           "description": "Clean basic amenities"
//         }
//       ]
//     },
//     {
//       "budget": "moderate",
//       "accommodations": [
//         {
//           "name": "3-Star Hotel",
//           "type": "3-Star Hotel",
//           "pricePerNight": "₹1500-2500",
//           "address": "Specific address",
//           "distance": "X km from main attractions",
//           "contact": "+91-XXXXXXXXXX",
//           "rating": "4.5",
//           "description": "Comfortable AC good location"
//         },
//         {
//           "name": "Guesthouse Mid",
//           "type": "3-Star Guesthouse",
//           "pricePerNight": "₹1200-2000",
//           "address": "Specific location",
//           "distance": "X km from center",
//           "contact": "+91-XXXXXXXXXX",
//           "rating": "4.4",
//           "description": "Cozy friendly staff"
//         },
//         {
//           "name": "Resort Mid",
//           "type": "3-Star Resort",
//           "pricePerNight": "₹1800-2800",
//           "address": "Specific address",
//           "distance": "X km from main area",
//           "contact": "+91-XXXXXXXXXX",
//           "rating": "4.6",
//           "description": "Spacious garden comfortable"
//         },
//         {
//           "name": "Hotel Mid 2",
//           "type": "3-Star Hotel",
//           "pricePerNight": "₹1600-2600",
//           "address": "Specific location",
//           "distance": "X km from attractions",
//           "contact": "+91-XXXXXXXXXX",
//           "rating": "4.3",
//           "description": "Good amenities good location"
//         }
//       ]
//     },
//     {
//       "budget": "luxury",
//       "accommodations": [
//         {
//           "name": "5-Star Hotel",
//           "type": "5-Star Hotel",
//           "pricePerNight": "₹3500-5000",
//           "address": "Specific address",
//           "distance": "X km from attractions",
//           "contact": "+91-XXXXXXXXXX",
//           "rating": "4.8",
//           "description": "Premium spa pool excellent service"
//         },
//         {
//           "name": "Luxury Resort",
//           "type": "4-5 Star Resort",
//           "pricePerNight": "₹4000-6000",
//           "address": "Specific location scenic views",
//           "distance": "X km from center",
//           "contact": "+91-XXXXXXXXXX",
//           "rating": "4.9",
//           "description": "Spa fine dining valley views"
//         },
//         {
//           "name": "Luxury Villa",
//           "type": "Luxury Villa",
//           "pricePerNight": "₹5000-8000",
//           "address": "Specific address",
//           "distance": "X km from attractions",
//           "contact": "+91-XXXXXXXXXX",
//           "rating": "5.0",
//           "description": "Private personalized luxury"
//         },
//         {
//           "name": "Heritage Hotel",
//           "type": "4-Star Heritage",
//           "pricePerNight": "₹3800-5500",
//           "address": "Specific location",
//           "distance": "X km from main area",
//           "contact": "+91-XXXXXXXXXX",
//           "rating": "4.7",
//           "description": "Heritage charm luxury"
//         }
//       ]
//     }
//   ],
//   "restaurants": [
//     {
//       "budget": "cheap",
//       "restaurants": [
//         {
//           "name": "Local Dhaba",
//           "type": "Dhaba Street Food",
//           "cuisine": "Indian Local",
//           "avgPrice": "₹80-150",
//           "address": "Specific address Main Market",
//           "distance": "X km from center",
//           "contact": "+91-XXXXXXXXXX",
//           "rating": "4.0",
//           "description": "Authentic local food regional"
//         },
//         {
//           "name": "Street Food Court",
//           "type": "Street Food",
//           "cuisine": "Mixed Chaat",
//           "avgPrice": "₹50-120",
//           "address": "Specific market location",
//           "distance": "X km from main area",
//           "contact": "+91-XXXXXXXXXX",
//           "rating": "3.9",
//           "description": "Various food budget-friendly"
//         },
//         {
//           "name": "Chai Point",
//           "type": "Cafe Tea Stall",
//           "cuisine": "Beverages Snacks",
//           "avgPrice": "₹40-100",
//           "address": "Specific location",
//           "distance": "X km from attractions",
//           "contact": "+91-XXXXXXXXXX",
//           "rating": "4.1",
//           "description": "Chat with locals authentic"
//         },
//         {
//           "name": "Budget Restaurant",
//           "type": "Budget Restaurant",
//           "cuisine": "Indian",
//           "avgPrice": "₹100-200",
//           "address": "Specific address",
//           "distance": "X km from center",
//           "contact": "+91-XXXXXXXXXX",
//           "rating": "4.0",
//           "description": "Good portion value for money"
//         }
//       ]
//     },
//     {
//       "budget": "moderate",
//       "restaurants": [
//         {
//           "name": "Cafe Restaurant",
//           "type": "Cafe Restaurant",
//           "cuisine": "Multi-cuisine Fusion",
//           "avgPrice": "₹200-400",
//           "address": "Specific address",
//           "distance": "X km from attractions",
//           "contact": "+91-XXXXXXXXXX",
//           "rating": "4.5",
//           "description": "Good ambiance travelers"
//         },
//         {
//           "name": "Regional Restaurant",
//           "type": "Restaurant",
//           "cuisine": "Regional Indian",
//           "avgPrice": "₹180-350",
//           "address": "Specific location",
//           "distance": "X km from center",
//           "contact": "+91-XXXXXXXXXX",
//           "rating": "4.3",
//           "description": "Authentic regional good service"
//         },
//         {
//           "name": "Scenic Cafe",
//           "type": "Cafe Rooftop",
//           "cuisine": "Multi-cuisine",
//           "avgPrice": "₹250-450",
//           "address": "Specific scenic location",
//           "distance": "X km from main area",
//           "contact": "+91-XXXXXXXXXX",
//           "rating": "4.4",
//           "description": "Beautiful views sunset"
//         },
//         {
//           "name": "Casual Restaurant",
//           "type": "Cafe Restaurant",
//           "cuisine": "Multi-cuisine",
//           "avgPrice": "₹200-380",
//           "address": "Specific address",
//           "distance": "X km from attractions",
//           "contact": "+91-XXXXXXXXXX",
//           "rating": "4.2",
//           "description": "Casual dining good variety"
//         }
//       ]
//     },
//     {
//       "budget": "luxury",
//       "restaurants": [
//         {
//           "name": "Fine Dining",
//           "type": "Fine Dining",
//           "cuisine": "International Continental",
//           "avgPrice": "₹600-1200",
//           "address": "Specific address",
//           "distance": "X km from attractions",
//           "contact": "+91-XXXXXXXXXX",
//           "rating": "4.8",
//           "description": "Premium excellent service"
//         },
//         {
//           "name": "Resort Restaurant",
//           "type": "Restaurant",
//           "cuisine": "Multi-cuisine",
//           "avgPrice": "₹500-1000",
//           "address": "Specific resort location",
//           "distance": "X km from center",
//           "contact": "+91-XXXXXXXXXX",
//           "rating": "4.7",
//           "description": "Scenic excellent fine food"
//         },
//         {
//           "name": "Fusion Restaurant",
//           "type": "Specialty Restaurant",
//           "cuisine": "Fusion Gourmet",
//           "avgPrice": "₹700-1400",
//           "address": "Specific upscale location",
//           "distance": "X km from main area",
//           "contact": "+91-XXXXXXXXXX",
//           "rating": "4.9",
//           "description": "Creative premium unique"
//         },
//         {
//           "name": "Premium Cafe",
//           "type": "Premium Cafe",
//           "cuisine": "Gourmet International",
//           "avgPrice": "₹400-900",
//           "address": "Specific scenic location",
//           "distance": "X km from attractions",
//           "contact": "+91-XXXXXXXXXX",
//           "rating": "4.6",
//           "description": "Premium views excellent coffee"
//         }
//       ]
//     }
//   ],
//   "itinerary": [
//     {
//       "day": 1,
//       "dayTitle": "Arrival Day Travel and Settle",
//       "activities": [
//         {
//           "time": "Early Morning 5-6 AM",
//           "placeName": "Delhi Bus Stand",
//           "details": "Depart for ${destination}. Bus journey 6-14 hours.",
//           "ticketPrice": "₹500-1500"
//         },
//         {
//           "time": "Afternoon Evening 2-6 PM",
//           "placeName": "Arrival at ${destination}",
//           "details": "Check-in rest refresh",
//           "ticketPrice": "₹100-300"
//         },
//         {
//           "time": "Evening 5-6 PM",
//           "placeName": "Local Ghat Temple",
//           "details": "Evening aarti experience spirituality",
//           "ticketPrice": "Free to ₹100"
//         },
//         {
//           "time": "Night 7-8 PM",
//           "placeName": "Evening Market",
//           "details": "Street food local culture",
//           "ticketPrice": "₹100-300"
//         },
//         {
//           "time": "Late Night 8-9 PM",
//           "placeName": "Dinner Rest",
//           "details": "Dinner hotel rest",
//           "ticketPrice": "₹150-400"
//         }
//       ]
//     },
//     {
//       "day": 2,
//       "dayTitle": "Cultural Immersion Local Exploration",
//       "activities": [
//         {
//           "time": "Early Morning 5-5:30 AM",
//           "placeName": "Main Temple Aarti",
//           "details": "Morning prayers meditation",
//           "ticketPrice": "Free to ₹50"
//         },
//         {
//           "time": "Morning 6:30-7:30 AM",
//           "placeName": "Local Dhaba Breakfast",
//           "details": "Authentic breakfast local life",
//           "ticketPrice": "₹80-150"
//         },
//         {
//           "time": "Morning 8-9 AM",
//           "placeName": "Food Market Exploration",
//           "details": "Fresh fruits local ingredients",
//           "ticketPrice": "₹100-300"
//         },
//         {
//           "time": "Morning 9-11 AM",
//           "placeName": "Scooty Rental",
//           "details": "Rent bike helmet insurance",
//           "ticketPrice": "₹300-500"
//         },
//         {
//           "time": "Late Morning 11 AM-1 PM",
//           "placeName": "Nearby Attraction",
//           "details": "Temple waterfall adventure",
//           "ticketPrice": "₹200-1500"
//         },
//         {
//           "time": "Afternoon 1-2 PM",
//           "placeName": "Local Lunch",
//           "details": "Regional cuisine rest",
//           "ticketPrice": "₹200-400"
//         },
//         {
//           "time": "Afternoon 2-5 PM",
//           "placeName": "Hidden Gems Cafes",
//           "details": "Local artists viewpoints",
//           "ticketPrice": "₹200-500"
//         },
//         {
//           "time": "Evening 5-6 PM",
//           "placeName": "Sunset Ghat",
//           "details": "Peaceful moment travelers",
//           "ticketPrice": "Free"
//         },
//         {
//           "time": "Evening 6-7 PM",
//           "placeName": "Evening Aarti",
//           "details": "Spiritual gathering",
//           "ticketPrice": "Free to ₹100"
//         },
//         {
//           "time": "Night 7-8 PM",
//           "placeName": "Night Market",
//           "details": "Souvenirs local products",
//           "ticketPrice": "₹200-800"
//         },
//         {
//           "time": "Night 8-9 PM",
//           "placeName": "Dinner Restaurant",
//           "details": "Regional evening special",
//           "ticketPrice": "₹200-500"
//         },
//         {
//           "time": "Late Night 9-11 PM",
//           "placeName": "Ghat Walk",
//           "details": "Chat with locals night culture",
//           "ticketPrice": "Free"
//         }
//       ]
//     }
//   ]
// }`;

const prompt = `
Generate a REALISTIC travel itinerary for "${destination}" for ${maxDays} days in ${month}.
Trip Type: ${tripType}. Budget: ${budget}. Starting Point: Delhi.

CORE RULES:
- Use REAL places, hostels, restaurants, temples, viewpoints, markets, and cafés from ${destination}
- STRICT JSON ONLY. No markdown. No comments. No trailing commas.
- All keys and strings must be double-quoted.
- Every activity must include: "time", "placeName", "details", "ticketPrice"
- No "travelTime" field anywhere.

ITINERARY LOGIC:
If ${maxDays} <= 7 → Give full detailed itinerary (2–3 activities per day).

If ${maxDays} > 7:
- Day 1–7 → Detailed with timings.
- Day 8–${maxDays} → One grouped block:
  {
    "day": "8-${maxDays}",
    "activities": [
      {
        "time": "Flexible",
        "placeName": "Extended Exploration",
        "details": "5-8 real experiences like beaches, cafés, temples, markets, waterfalls, villages, sunsets.",
        "ticketPrice": "₹0-500"
      }
    ]
  }

RETURN JSON IN THIS FORMAT:

{
  "cost": {
    "accommodation": "₹800-1500/night typical budget stays",
    "food": "₹300-500/day",
    "transport": {
      "delhi_to_destination": "₹500-2000 by bus/train",
      "daily_local": "₹200-400/day"
    },
    "activities": "₹800-2500 total depending on destination",
    "totalEstimate": "₹X for ${maxDays} days",
    "budgetStatus": "Within Budget or Slightly Above"
  },

  "packing": {
    "essentials": ["ID proof", "Power bank", "Toiletries", "Medicines"],
    "weather": ["Jacket (winter)", "Raincoat (monsoon)", "Sunscreen (summer)"],
    "activity": ["Trekking shoes", "Swimsuit if water activities", "Small backpack"]
  },

  "tips": {
    "bestTime": "Best months to visit ${destination}",
    "mustDo": [
      "Morning aarti at a major temple",
      "Visit local markets",
      "Try authentic street food",
      "Sunset at a popular viewpoint"
    ],
    "localTransport": {
      "taxi": "₹15/km",
      "auto": "₹8/km",
      "scooty": "₹300-500/day"
    },
    "hiddenGems": [
      "A real lesser-known waterfall or temple",
      "A real café or viewpoint locals prefer"
    ],
    "safety": [
      "Avoid solo trekking at night",
      "Keep valuables secure",
      "Use verified stays and transport"
    ],
    "culturalTips": [
      "Dress modestly in temples",
      "Remove shoes before entering religious places",
      "Ask permission before taking photos"
    ]
  },

  "stays": [
    {
      "budget": "cheap",
      "accommodations": [
        {
          "name": "REAL hostel/zostel name",
          "type": "Hostel",
          "pricePerNight": "₹500-900",
          "location": "Area name",
          "landmark": "1-3 km from a famous spot",
          "rating": "4.0-4.4",
          "description": "Short real-style description of vibe"
        },
        {
          "name": "REAL hostel/guesthouse",
          "type": "Guesthouse/Hostel",
          "pricePerNight": "₹600-1000",
          "location": "Area name",
          "landmark": "Near a real landmark",
          "rating": "4.1",
          "description": "Backpacker-friendly budget stay"
        }
      ]
    },
    {
      "budget": "moderate",
      "accommodations": [
        {
          "name": "REAL 3-star hotel",
          "type": "Hotel",
          "pricePerNight": "₹1500-2500",
          "location": "Area",
          "landmark": "1 km from main attraction",
          "rating": "4.3-4.6",
          "description": "Comfortable rooms and good service"
        }
      ]
    },
    {
      "budget": "luxury",
      "accommodations": [
        {
          "name": "REAL luxury resort/hotel",
          "type": "Resort/5-Star",
          "pricePerNight": "₹3500-6000",
          "location": "Area",
          "landmark": "Near major tourist point",
          "rating": "4.7-4.9",
          "description": "Premium amenities and scenic views"
        }
      ]
    }
  ],

  "restaurants": [
    {
      "budget": "cheap",
      "restaurants": [
        {
          "name": "REAL dhaba/cafe",
          "type": "Dhaba",
          "cuisine": "Indian/Local",
          "avgPrice": "₹100-200",
          "location": "Market/area",
          "landmark": "Near famous spot",
          "rating": "3.8-4.2",
          "description": "Short real-style description"
        }
      ]
    },
    {
      "budget": "moderate",
      "restaurants": [
        {
          "name": "REAL mid-range restaurant",
          "type": "Restaurant",
          "cuisine": "Multi-cuisine/Indian",
          "avgPrice": "₹250-450",
          "location": "Area",
          "landmark": "Distance from landmark",
          "rating": "4.2-4.5",
          "description": "Good ambiance and food quality"
        }
      ]
    },
    {
      "budget": "luxury",
      "restaurants": [
        {
          "name": "REAL fine-dining place",
          "type": "Fine Dining",
          "cuisine": "Continental/Indian",
          "avgPrice": "₹600-1200",
          "location": "Upscale area",
          "landmark": "Near luxury hotel/market",
          "rating": "4.6-4.9",
          "description": "Premium dining experience"
        }
      ]
    }
  ],

  "itinerary": []
}
`;


    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 4000,
    });

    let content = response.choices?.[0]?.message?.content || "";
    content = content.replace(/```json|```/g, "").trim();

    // Extract JSON if wrapped in text
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      content = jsonMatch[0];
    }

    const data = JSON.parse(content);

    return res.status(200).json({
      success: true,
      data,
    });

  } catch (err) {
    console.error("Itinerary Error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to generate itinerary",
      error: err.message,
    });
  }
};