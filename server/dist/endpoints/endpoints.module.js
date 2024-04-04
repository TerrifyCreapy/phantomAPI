"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EndpointModule = void 0;
const common_1 = require("@nestjs/common");
const entity_module_1 = require("../entity/entity.module");
const rest_endpoints_service_1 = require("./rest-endpoints.service");
const endpoints_controller_1 = require("./endpoints.controller");
const subdomain_middleware_1 = require("../middlewares/subdomain.middleware");
const project_service_1 = require("../project/project.service");
const project_module_1 = require("../project/project.module");
const entity_service_1 = require("../entity/entity.service");
let EndpointModule = class EndpointModule {
    configure(consumer) {
        consumer.apply(subdomain_middleware_1.SubdomainMiddleware).forRoutes(":endpoint");
    }
};
EndpointModule = __decorate([
    (0, common_1.Module)({
        imports: [
            project_module_1.ProjectModule,
            entity_module_1.EntityModule
        ],
        controllers: [endpoints_controller_1.EndpointController],
        providers: [rest_endpoints_service_1.RestEndpointsService, project_service_1.ProjectService, entity_service_1.EntityService],
    })
], EndpointModule);
exports.EndpointModule = EndpointModule;
//# sourceMappingURL=endpoints.module.js.map