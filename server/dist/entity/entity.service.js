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
exports.EntityService = void 0;
const common_1 = require("@nestjs/common");
const nest_postgres_1 = require("nest-postgres");
const pg_1 = require("pg");
const Errors_constants_1 = require("../constants/Errors.constants");
let EntityService = class EntityService {
    constructor(pg) {
        this.pg = pg;
    }
    async findAll(link) {
        try {
            const project = (await this.pg.query('SELECT * FROM projects WHERE link=' + `'${link}'`)).rows.length;
            if (!project)
                throw new Error(Errors_constants_1.Errors.notFoundException);
            const query = `SELECT id, name FROM entities where "projectlink"='${link}'`;
            const queryCount = `SELECT count(*) FROM entities where "projectlink"='${link}'`;
            const result = (await this.pg.query(query)).rows;
            const totalCount = (await this.pg.query(queryCount)).rows[0].count;
            return {
                rows: result,
                totalCount
            };
        }
        catch (e) {
            if (e.message === Errors_constants_1.Errors.notFoundException) {
                throw new common_1.NotFoundException("Project not found");
            }
            throw new common_1.InternalServerErrorException();
        }
    }
    async findOne(id = -1, link = "", name = "") {
        try {
            const resultStr = this.createQueryStr(id, link, name);
            const query = `SELECT * from entities where ${resultStr}`;
            const result = (await this.pg.query(query)).rows;
            if (!result.length)
                return null;
            return result[0];
        }
        catch (e) {
            throw new common_1.InternalServerErrorException();
        }
    }
    async create(createEntityDto) {
        try {
            const { name, link } = createEntityDto;
            const project = (await this.pg.query(`SELECT * FROM projects where "link"='${link}'`)).rows;
            if (!project.length)
                throw new Error(Errors_constants_1.Errors.notFoundException);
            const isExist = (await this.pg.query(`SELECT * FROM entities where "projectlink"='${link}' and "name"='${name}'`)).rows.length;
            if (isExist)
                throw new Error(Errors_constants_1.Errors.badRequestException);
            const query = `INSERT INTO entities(name, value, "projectlink") values($1, $2, $3) RETURNING *`;
            const result = (await this.pg.query(query, [name, '[]', link])).rows[0];
            return Object.assign({}, result);
        }
        catch (e) {
            if (e.message === Errors_constants_1.Errors.notFoundException) {
                throw new common_1.NotFoundException("Project not found");
            }
            if (e.message === Errors_constants_1.Errors.badRequestException) {
                throw new common_1.BadRequestException("Entity already exists");
            }
            throw new common_1.InternalServerErrorException();
        }
    }
    async update(id = -1, updateEntityDto) {
        try {
        }
        catch (e) {
            if (e.message === Errors_constants_1.Errors.badRequestException) {
                throw new common_1.BadRequestException("Entity can not be updated without id or link and name");
            }
            if (e.message === Errors_constants_1.Errors.notFoundException) {
                throw new common_1.NotFoundException("Project not found");
            }
            throw new common_1.InternalServerErrorException();
        }
    }
    async remove(id = -1) {
        try {
            const query = `DELETE FROM entities WHERE id=${id}`;
            const result = (await this.pg.query(query)).rowCount;
            if (!result)
                throw new Error(Errors_constants_1.Errors.notFoundException);
            return Boolean(result);
        }
        catch (e) {
            if (e.message === Errors_constants_1.Errors.notFoundException) {
                throw new common_1.NotFoundException("Entity not found");
            }
            throw new common_1.InternalServerErrorException();
        }
    }
    createQueryStr(id = -1, link = "", name = "") {
        if (id === -1 && (!link.length && !name.length))
            throw new common_1.BadRequestException();
        const idStr = id > -1 ? `id=${id} ` : "";
        const projStr = link.length && name.length ? `"projectlink"='${link}' and "name"='${name}'` : "";
        return idStr.length ? idStr : projStr;
    }
};
EntityService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nest_postgres_1.InjectClient)()),
    __metadata("design:paramtypes", [typeof (_a = typeof pg_1.Client !== "undefined" && pg_1.Client) === "function" ? _a : Object])
], EntityService);
exports.EntityService = EntityService;
//# sourceMappingURL=entity.service.js.map