"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CohereService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const groq_sdk_1 = require("groq-sdk");
let CohereService = class CohereService {
    constructor(configService) {
        this.configService = configService;
        this.groq = new groq_sdk_1.default({
            apiKey: this.configService.get('GROQ_API_KEY') || this.configService.get('GROQ_API'),
        });
    }
    async createItinerary(destination, days, tripType, budget, startDate) {
        try {
            const maxDays = Math.min(Number(days), 10);
            const month = startDate
                ? new Date(startDate).toLocaleString('default', { month: 'long' })
                : 'current';
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
            const response = await this.groq.chat.completions.create({
                model: 'llama-3.3-70b-versatile',
                messages: [{ role: 'user', content: prompt }],
                temperature: 0.7,
                max_tokens: 4000,
            });
            let content = response.choices?.[0]?.message?.content || '';
            content = content.replace(/```json|```/g, '').trim();
            const jsonMatch = content.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                content = jsonMatch[0];
            }
            const data = JSON.parse(content);
            return { success: true, data };
        }
        catch (err) {
            console.error('Itinerary Error:', err);
            throw new common_1.InternalServerErrorException({
                success: false,
                message: 'Failed to generate itinerary',
                error: err.message,
            });
        }
    }
};
exports.CohereService = CohereService;
exports.CohereService = CohereService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], CohereService);
//# sourceMappingURL=cohere.service.js.map