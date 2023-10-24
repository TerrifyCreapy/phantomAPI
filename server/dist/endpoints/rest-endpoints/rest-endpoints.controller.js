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
exports.RestEndpointsController = void 0;
const common_1 = require("@nestjs/common");
const rest_endpoints_service_1 = require("./rest-endpoints.service");
let RestEndpointsController = class RestEndpointsController {
    constructor(restEndpointsService) {
        this.restEndpointsService = restEndpointsService;
    }
    async findAll(req, endpoint) {
        const { subdomain } = req.headers;
        const result = await this.restEndpointsService.findAll(subdomain, endpoint);
        return result;
    }
    async createUser(body, req) {
        const { subdomain } = req.headers;
        console.log(subdomain);
        const result = await this.restEndpointsService.createUser(subdomain, body);
        return result;
    }
    async createItem(body, endpoint, req) {
        const { subdomain } = req.headers;
        const result = await this.restEndpointsService.createItem(subdomain, endpoint, body);
        return result;
    }
};
__decorate([
    (0, common_1.Get)(':endpoint'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('endpoint')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], RestEndpointsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('users'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RestEndpointsController.prototype, "createUser", null);
__decorate([
    (0, common_1.Post)(':endpoint'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('endpoint')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], RestEndpointsController.prototype, "createItem", null);
RestEndpointsController = __decorate([
    (0, common_1.Controller)('rest/dev'),
    __metadata("design:paramtypes", [rest_endpoints_service_1.RestEndpointsService])
], RestEndpointsController);
exports.RestEndpointsController = RestEndpointsController;
//# sourceMappingURL=rest-endpoints.controller.js.map