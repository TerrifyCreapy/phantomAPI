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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestEndpointsService = void 0;
const common_1 = require("@nestjs/common");
const project_service_1 = require("../project/project.service");
const nest_postgres_1 = require("nest-postgres");
const pg_1 = require("pg");
const Errors_constants_1 = require("../constants/Errors.constants");
let RestEndpointsService = class RestEndpointsService {
    constructor(projectService, pg) {
        this.projectService = projectService;
        this.pg = pg;
    }
    async checkProject(link) {
        return (await this.projectService.findOne(link));
    }
    async findEndPoint(link, endpoint) {
        try {
            await this.checkProject(link);
            const query = `SELECT json_array_elements(value) as items from entities where name='${endpoint}' and projectlink='${link}'`;
            const result = (await this.pg.query(query)).rows.map(e => (Object.assign({}, e.items)));
            if (!result.length)
                throw new Error(Errors_constants_1.Errors.notFoundException);
            return result;
        }
        catch (e) {
            console.log(e.message);
            throw new common_1.BadRequestException(e.message);
        }
    }
    async findAll(link, endpoint) {
        try {
            (await this.checkProject(link));
            const result = await this.findEndPoint(link, endpoint);
            return result;
        }
        catch (e) {
            if (e.message === Errors_constants_1.Errors.notFoundException) {
                throw new common_1.NotFoundException("Not found endpoint");
            }
            throw new common_1.InternalServerErrorException();
        }
    }
    async createItem(link, endpoint, body) {
        try {
            (await this.checkProject(link));
            const nextIndex = (await this.pg.query(`SELECT index FROM entities where projectlink='${link}' and name='${endpoint}'`)).rows[0].index;
            body.id = nextIndex;
            const query = `UPDATE entities SET value=array_append(value, '${JSON.stringify(body)}'::jsonb), index = index + 1 where projectlink='${link}' and name='${endpoint}' RETURNING *`;
            const isCompleted = Boolean((await this.pg.query(query)).rows.length);
            return body;
        }
        catch (e) {
        }
    }
    async findUserByEmail(email) {
        try {
            const query = `SELECT items FROM (SELECT unnest(value) as items FROM entities where name='users') as json WHERE (items->>'email')='${email}'`;
            const isExist = Boolean((await this.pg.query(query)).rows.length);
            return isExist;
        }
        catch (e) {
            throw new common_1.InternalServerErrorException();
        }
    }
    async createUser(link, body) {
        const errors = [];
        try {
            if (!(typeof body === "object")) {
                errors.push("Body is not json type");
                throw new Error(Errors_constants_1.Errors.badRequestException);
            }
            ;
            if (!body.email) {
                errors.push("Object does not have required property 'email'");
            }
            if (!body.password) {
                errors.push("Object does not have required property 'password'");
            }
            const isExistEmail = await this.findUserByEmail(body.email);
            if (isExistEmail) {
                errors.push("User already exist");
            }
            if (errors.length)
                throw new Error(Errors_constants_1.Errors.badRequestException);
            const result = await this.createItem(link, 'users', body);
            return result;
        }
        catch (e) {
            if (e.message === Errors_constants_1.Errors.badRequestException) {
                throw new common_1.BadRequestException(errors);
            }
            throw new common_1.InternalServerErrorException();
        }
    }
};
RestEndpointsService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, nest_postgres_1.InjectClient)()),
    __metadata("design:paramtypes", [project_service_1.ProjectService, typeof (_a = typeof pg_1.Client !== "undefined" && pg_1.Client) === "function" ? _a : Object])
], RestEndpointsService);
exports.RestEndpointsService = RestEndpointsService;
//# sourceMappingURL=rest-endpoints.service.js.map