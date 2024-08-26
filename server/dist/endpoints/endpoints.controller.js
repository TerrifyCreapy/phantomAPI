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
exports.EndpointController = void 0;
const common_1 = require("@nestjs/common");
const rest_endpoints_service_1 = require("./rest-endpoints.service");
let EndpointController = class EndpointController {
    constructor(endpointService) {
        this.endpointService = endpointService;
    }
    async getData(req, endpoint) {
        return (await this.endpointService.findEndPoint(req.headers.subdomain, endpoint));
    }
    async addData(req, endpoint, body) {
        return (await this.endpointService.createItem(req.headers.subdomain, endpoint, body));
    }
};
__decorate([
    (0, common_1.Get)(':endpoint'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('endpoint')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], EndpointController.prototype, "getData", null);
__decorate([
    (0, common_1.Post)(":endpoint"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('endpoint')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], EndpointController.prototype, "addData", null);
EndpointController = __decorate([
    (0, common_1.Controller)(''),
    __metadata("design:paramtypes", [rest_endpoints_service_1.RestEndpointsService])
], EndpointController);
exports.EndpointController = EndpointController;
//# sourceMappingURL=endpoints.controller.js.map