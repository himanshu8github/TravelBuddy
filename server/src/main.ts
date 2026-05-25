import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true, // Enables NestJS built-in raw body parsing required for Stripe signatures
  });

  // Enable CORS matching express configuration
  app.enableCors({
    origin: [
      process.env.FRONTEND_URL,
      'http://localhost:5173',
    ].filter(Boolean),
    credentials: true,
  });

  const port = process.env.PORT || 5000;
  await app.listen(port);
  console.log(`Server running on http://localhost:${port}`);
}
bootstrap();
