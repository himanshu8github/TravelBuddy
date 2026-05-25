import { OnModuleInit } from '@nestjs/common';
import { Firestore } from 'firebase-admin/firestore';
export declare class FirebaseService implements OnModuleInit {
    private dbInstance;
    onModuleInit(): void;
    getDb(): Firestore;
}
