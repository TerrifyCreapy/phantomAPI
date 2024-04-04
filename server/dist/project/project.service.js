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
exports.ProjectService = void 0;
const common_1 = require("@nestjs/common");
const pg_1 = require("pg");
const nest_postgres_1 = require("nest-postgres");
const uid = require("uuid");
const entity_service_1 = require("../entity/entity.service");
let ProjectService = class ProjectService {
    constructor(pg, entityService) {
        this.pg = pg;
        this.entityService = entityService;
    }
    async findAll(email) {
        try {
            const query = `select p.link, p.name, p.createdat, count(e.id) as entity_count from projects as p left join entities as e on p.link = e.projectlink where p.useremail='${email}' group by p.link order by p.createdat desc;`;
            const result = await this.pg.query(query);
            return {
                rows: result.rows,
                count: result.rows.length,
                maxEntities: 20,
            };
        }
        catch (e) {
            throw new common_1.BadRequestException("Error");
        }
    }
    async findOne(link) {
        const query = `SELECT * FROM projects where "link"='${link}'`;
        const result = await this.pg.query(query);
        if (!result.rows.length)
            throw new common_1.BadRequestException("Unknown link");
        return Object.assign({}, result.rows[0]);
    }
    async create(createProjectDto, email) {
        try {
            const { name } = createProjectDto;
            const testQuery = `SELECT * FROM projects where name='${name}'`;
            const isExist = (await this.pg.query(testQuery)).rows.length;
            if (isExist)
                throw new Error("Project already exist");
            const link = uid.v4();
            const query = `INSERT INTO projects(link, name, "useremail") VALUES($1, $2, $3) RETURNING link, name, createdat`;
            const result = (await this.pg.query(query, [link, name, email])).rows[0];
            return Object.assign(Object.assign({}, result), { entity_count: 0 });
        }
        catch (e) {
            throw new common_1.BadRequestException(e.message);
        }
    }
    async update(link, updateProjectDto) {
        const { name } = updateProjectDto;
        const query = `UPDATE projects SET name='${name}' where link='${link}' RETURNING link, name, description, auth, register, uploads`;
        const result = (await this.pg.query(query)).rows[0];
        return Object.assign({}, result);
    }
    async updateFeatures(link, updateFeatures) {
        try {
            const { auth, register, uploads } = updateFeatures;
            const project = await this.findOne(link);
            if (project.auth === auth && project.register === register && project.uploads === uploads)
                return project;
            if (!project)
                throw new Error("Project not found");
            const uploadsEntity = await this.entityService.findOne(-1, link, "uploads");
            if (auth || register) {
                const userEntity = await this.entityService.findOne(-1, link, "users");
                console.log(userEntity);
                if (!userEntity) {
                    const cfg = {
                        name: "users",
                        link,
                    };
                    await this.entityService.create(cfg);
                }
            }
            if (uploads) {
                if (!uploadsEntity) {
                    const cfg = {
                        name: "uploads",
                        link,
                    };
                    await this.entityService.create(cfg);
                }
            }
            const query = `UPDATE projects SET "auth"=${auth}, "register"=${register}, "uploads"=${uploads} WHERE link='${link}' RETURNING *`;
            const result = (await this.pg.query(query)).rows[0];
            return Object.assign({}, result);
        }
        catch (e) {
            throw new common_1.NotFoundException(e.message);
        }
    }
    async remove(link) {
        const query = `DELETE FROM projects WHERE link='${link}'`;
        const result = (await this.pg.query(query)).rowCount;
        if (!result)
            throw new common_1.BadRequestException("Unknown link");
        return Boolean(result);
    }
};
ProjectService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nest_postgres_1.InjectClient)()),
    __metadata("design:paramtypes", [typeof (_a = typeof pg_1.Client !== "undefined" && pg_1.Client) === "function" ? _a : Object, entity_service_1.EntityService])
], ProjectService);
exports.ProjectService = ProjectService;
//# sourceMappingURL=project.service.js.map