"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const firebase_module_1 = require("./firebase/firebase.module");
const cohere_module_1 = require("./cohere/cohere.module");
const chat_module_1 = require("./chat/chat.module");
const payment_module_1 = require("./payment/payment.module");
const webhook_module_1 = require("./webhook/webhook.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: [
                    process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development',
                    '.env',
                ],
            }),
            firebase_module_1.FirebaseModule,
            cohere_module_1.CohereModule,
            chat_module_1.ChatModule,
            payment_module_1.PaymentModule,
            webhook_module_1.WebhookModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map