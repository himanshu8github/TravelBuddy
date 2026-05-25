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
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const groq_sdk_1 = require("groq-sdk");
let ChatService = class ChatService {
    constructor(configService) {
        this.configService = configService;
        this.groq = new groq_sdk_1.default({
            apiKey: this.configService.get('GROQ_API') || this.configService.get('GROQ_API_KEY'),
        });
    }
    async getChatSuggestions(prompt) {
        try {
            const userMessage = `You are a travel assistant.

A user will provide any **Indian location** — it can be a state (like Uttarakhand), a city (like Mussoorie), or a small place/spot (like Landour).

1. If the input is a **small town or place** (e.g., Landour), identify its **parent city** (e.g., Mussoorie) and suggest **3-4 nearby places or cities** in that region.
2. If the input is a **city** (e.g., Mussoorie), suggest other nearby places or cities that are commonly visited together.
3. If the input is a **state** (e.g., Uttarakhand), suggest 3–4 top cities or destinations within that state.

For each city, include:

- 2 tourist spots
- 2 popular experiences
- 2 seasonal travel tips
- 2 local foods
- 2 travel tips

Respond **strictly** in this JSON format:
{
  "destination": "string",
  "cities": [
    {
      "name": "string",
      "spots": ["string", "string"],
      "experiences": ["string", "string"],
      "seasonalTips": ["string", "string"],
      "localFoods": ["string", "string"],
      "travelTips": ["string", "string"]
    }
  ]
}

User input: ${prompt}`;
            const response = await this.groq.chat.completions.create({
                messages: [
                    {
                        role: 'user',
                        content: userMessage,
                    },
                ],
                model: 'openai/gpt-oss-20b',
            });
            const text = response.choices[0]?.message?.content || '';
            const jsonStart = text.indexOf('{');
            const jsonEnd = text.lastIndexOf('}');
            if (jsonStart === -1 || jsonEnd === -1) {
                throw new common_1.InternalServerErrorException('Could not parse AI response');
            }
            const jsonResponse = text.slice(jsonStart, jsonEnd + 1);
            let parsedData;
            try {
                parsedData = JSON.parse(jsonResponse);
            }
            catch (parseErr) {
                throw new common_1.InternalServerErrorException('Invalid JSON from AI response');
            }
            return {
                message: 'AI destination suggestion successful',
                data: {
                    destination: parsedData.destination || prompt,
                },
                answer: {
                    cities: parsedData.cities || [],
                },
            };
        }
        catch (error) {
            console.error('Groq Chat Error:', error);
            if (error instanceof common_1.InternalServerErrorException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Something went wrong');
        }
    }
};
exports.ChatService = ChatService;
exports.ChatService = ChatService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], ChatService);
//# sourceMappingURL=chat.service.js.map