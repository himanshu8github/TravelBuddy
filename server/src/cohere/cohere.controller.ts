import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { CohereService } from './cohere.service';

@Controller('api')
export class CohereController {
  constructor(private readonly cohereService: CohereService) {}

  @Post('createitinerary')
  async createItinerary(
    @Body() body: {
      destination: string;
      days: string | number;
      tripType: string;
      budget: string;
      startDate?: string;
    },
  ) {
    const { destination, days, tripType, budget, startDate } = body;
    if (!destination || !days || !tripType || !budget) {
      throw new BadRequestException('Missing required fields');
    }
    return this.cohereService.createItinerary(destination, days, tripType, budget, startDate);
  }
}
