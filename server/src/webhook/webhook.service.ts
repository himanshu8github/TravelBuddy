import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FirebaseService } from '../firebase/firebase.service';
import Stripe from 'stripe';

@Injectable()
export class WebhookService {
  private stripe: Stripe;

  constructor(
    private readonly configService: ConfigService,
    private readonly firebaseService: FirebaseService,
  ) {
    const secretKey = this.configService.get<string>('STRIPE_SECRET_KEY');
    this.stripe = new Stripe(secretKey);
  }

  async handleWebhook(rawBody: Buffer, signature: string) {
    let event: Stripe.Event;

    try {
      const webhookSecret = this.configService.get<string>('STRIPE_WEBHOOK_SECRET');
      event = this.stripe.webhooks.constructEvent(
        rawBody,
        signature,
        webhookSecret,
      );
    } catch (err) {
      console.error(' Webhook signature verification failed:', err.message);
      throw new BadRequestException(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const customerEmail = session.customer_email;
      const priceId = session.metadata?.price_id;

      let plan = 'Free';
      if (priceId === this.configService.get<string>('BASIC_PLAN_PRICE_ID')) plan = 'Basic';
      if (priceId === this.configService.get<string>('PRO_PLAN_PRICE_ID')) plan = 'Pro';
      if (priceId === this.configService.get<string>('ULTIMATE_PLAN_PRICE_ID')) plan = 'Ultimate';

      try {
        const db = this.firebaseService.getDb();
        const userRef = db.collection('users').where('email', '==', customerEmail);
        const snapshot = await userRef.get();

        if (snapshot.empty) {
          console.log('⚠️ No user found for:', customerEmail);
        } else {
          for (const doc of snapshot.docs) {
            await doc.ref.update({ plan });
            console.log(` Updated plan to ${plan} for ${customerEmail}`);
          }
        }
      } catch (err) {
        console.error(' Firestore update error:', err);
        throw new InternalServerErrorException('Firestore update failed');
      }
    }
  }
}
