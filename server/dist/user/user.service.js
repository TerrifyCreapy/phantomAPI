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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const nest_postgres_1 = require("nest-postgres");
const pg_1 = require("pg");
const bcrypt = require("bcrypt");
let UserService = class UserService {
    constructor(pg) {
        this.pg = pg;
    }
    async findByEmail(email) {
        const queryString = `SELECT * FROM users where email='${email}'`;
        const query = (await this.pg.query(queryString)).rows;
        return query.length ? query[0] : null;
    }
    async findAll(page = 1, limit = 0) {
        if (page < 1)
            page = 1;
        if (limit < 0)
            limit = 0;
        const queryString = `SELECT * FROM users order by email OFFSET ${(page - 1) * limit}${limit > 0 ? `LIMIT ${limit}` : ''}`;
        const queryCount = "SELECT count(*) from users";
        const totalCount = (await this.pg.query(queryCount)).rows[0].count;
        const users = await this.pg.query(queryString);
        return { rows: users.rows, count: totalCount };
    }
    async createUser(user) {
        let { email, password } = user;
        const exists = this.findByEmail(email);
        if (exists)
            return "User already exists";
        const saultCount = 10;
        password = await bcrypt.hash(password, saultCount);
        const token = "awdfawdf";
        const queryString = "INSERT INTO users(email, password, refresh) values($1, $2, $3) RETURNING *";
        const userDB = (await this.pg.query(queryString, [email, password, token])).rows[0];
        return userDB;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nest_postgres_1.InjectClient)()),
    __metadata("design:paramtypes", [typeof (_a = typeof pg_1.Client !== "undefined" && pg_1.Client) === "function" ? _a : Object])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map