import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Groq from 'groq-sdk';

@Injectable()
export class ChatService {
  private groq: Groq;

  constructor(private readonly configService: ConfigService) {
    this.groq = new Groq({
      apiKey: this.configService.get<string>('GROQ_API') || this.configService.get<string>('GROQ_API_KEY'),
    });
  }

  async getChatSuggestions(prompt: string) {
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
        throw new InternalServerErrorException('Could not parse AI response');
      }

      const jsonResponse = text.slice(jsonStart, jsonEnd + 1);
      let parsedData;
      try {
        parsedData = JSON.parse(jsonResponse);
      } catch (parseErr) {
        throw new InternalServerErrorException('Invalid JSON from AI response');
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
    } catch (error) {
      console.error('Groq Chat Error:', error);
      if (error instanceof InternalServerErrorException) {
        throw error;
      }
      throw new InternalServerErrorException('Something went wrong');
    }
  }
}
