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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CohereController = void 0;
const common_1 = require("@nestjs/common");
const cohere_service_1 = require("./cohere.service");
let CohereController = class CohereController {
    constructor(cohereService) {
        this.cohereService = cohereService;
    }
    async createItinerary(body) {
        const { destination, days, tripType, budget, startDate } = body;
        if (!destination || !days || !tripType || !budget) {
            throw new common_1.BadRequestException('Missing required fields');
        }
        return this.cohereService.createItinerary(destination, days, tripType, budget, startDate);
    }
};
exports.CohereController = CohereController;
__decorate([
    (0, common_1.Post)('createitinerary'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CohereController.prototype, "createItinerary", null);
exports.CohereController = CohereController = __decorate([
    (0, common_1.Controller)('api'),
    __metadata("design:paramtypes", [cohere_service_1.CohereService])
], CohereController);
//# sourceMappingURL=cohere.controller.js.map