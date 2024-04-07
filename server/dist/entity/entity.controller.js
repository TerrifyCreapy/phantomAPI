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
exports.EntityController = void 0;
const common_1 = require("@nestjs/common");
const entity_service_1 = require("./entity.service");
const create_entity_dto_1 = require("./dto/create-entity.dto");
const update_entity_dto_1 = require("./dto/update-entity.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
let EntityController = class EntityController {
    constructor(entityService) {
        this.entityService = entityService;
    }
    findAll(link) {
        console.log(1);
        return this.entityService.findAll(link);
    }
    findOne(id) {
        console.log("Next");
        return this.entityService.findOne(+id);
    }
    create(createEntityDto) {
        return this.entityService.create(createEntityDto);
    }
    update(id, updateEntityDto) {
        return this.entityService.update(+id, updateEntityDto);
    }
    remove(id) {
        return this.entityService.remove(+id);
    }
};
__decorate([
    (0, common_1.Get)(':link'),
    __param(0, (0, common_1.Param)('link')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EntityController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('one/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], EntityController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_entity_dto_1.CreateEntityDto]),
    __metadata("design:returntype", void 0)
], EntityController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_entity_dto_1.UpdateEntityDto]),
    __metadata("design:returntype", void 0)
], EntityController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EntityController.prototype, "remove", null);
EntityController = __decorate([
    (0, common_1.Controller)('entity'),
    (0, swagger_1.ApiTags)('entities'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [entity_service_1.EntityService])
], EntityController);
exports.EntityController = EntityController;
//# sourceMappingURL=entity.controller.js.map