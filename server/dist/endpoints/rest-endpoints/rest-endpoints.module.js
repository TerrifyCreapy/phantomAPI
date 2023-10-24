"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestEndpointsModule = void 0;
const common_1 = require("@nestjs/common");
const rest_endpoints_service_1 = require("./rest-endpoints.service");
const rest_endpoints_controller_1 = require("./rest-endpoints.controller");
const subdomain_middleware_1 = require("../../middlewares/subdomain.middleware");
const project_module_1 = require("../../project/project.module");
let RestEndpointsModule = class RestEndpointsModule {
    configure(consumer) {
        consumer.apply(subdomain_middleware_1.SubdomainMiddleware).forRoutes('rest/dev');
    }
};
RestEndpointsModule = __decorate([
    (0, common_1.Module)({
        imports: [project_module_1.ProjectModule],
        controllers: [rest_endpoints_controller_1.RestEndpointsController],
        providers: [rest_endpoints_service_1.RestEndpointsService],
    })
], RestEndpointsModule);
exports.RestEndpointsModule = RestEndpointsModule;
//# sourceMappingURL=rest-endpoints.module.js.map