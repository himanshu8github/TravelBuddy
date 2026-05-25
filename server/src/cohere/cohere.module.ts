import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CohereController } from './cohere.controller';
import { CohereService } from './cohere.service';

@Module({
  imports: [ConfigModule],
  controllers: [CohereController],
  providers: [CohereService],
})
export class CohereModule {}
