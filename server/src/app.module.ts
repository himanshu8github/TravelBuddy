import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FirebaseModule } from './firebase/firebase.module';
import { CohereModule } from './cohere/cohere.module';
import { ChatModule } from './chat/chat.module';
import { PaymentModule } from './payment/payment.module';
import { WebhookModule } from './webhook/webhook.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development',
        '.env',
      ],
    }),
    FirebaseModule,
    CohereModule,
    ChatModule,
    PaymentModule,
    WebhookModule,
  ],
})
export class AppModule {}
