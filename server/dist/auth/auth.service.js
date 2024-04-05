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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const user_service_1 = require("../user/user.service");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async validateUser(email, password) {
        const user = await this.userService.findByEmail(email);
        if (user) {
            const compare = await bcrypt.compare(password, user.password);
            if (compare) {
                const { password, refresh } = user, result = __rest(user, ["password", "refresh"]);
                return result;
            }
        }
        return null;
    }
    async login(user) {
        try {
            const payload = { email: user.email };
            const refreshToken = this.jwtService.sign(payload, { expiresIn: process.env.JWT_EXPIRES });
            const isRefreshed = this.userService.refreshToken(user.email, refreshToken);
            const accessToken = this.jwtService.sign(payload, { expiresIn: process.env.JWT_EXPIRES_IN });
            return {
                email: user.email,
                access: accessToken,
                refresh: refreshToken
            };
        }
        catch (e) {
            throw new common_1.ForbiddenException("Error with login");
        }
    }
    async register(dto) {
        try {
            const payload = { email: dto.email };
            const refreshToken = this.jwtService.sign(payload, { expiresIn: process.env.JWT_EXPIRES });
            const user = await this.userService.createUser(dto, refreshToken);
            if (typeof user === "string")
                throw new common_1.ForbiddenException("Error with registration!");
            return {
                email: payload.email,
                access: this.jwtService.sign(payload, { expiresIn: process.env.JWT_EXPIRES_IN }),
                refresh: refreshToken
            };
        }
        catch (e) {
            console.error(e);
            throw new common_1.ForbiddenException("Error with register!");
        }
    }
    async me(refresh) {
        try {
            const user = await this.userService.findByRefresh(refresh);
            if (!user)
                return null;
            const accessToken = this.jwtService.sign({ email: user.email }, { expiresIn: process.env.JWT_EXPIRES_IN });
            return {
                email: user.email,
                access: accessToken
            };
        }
        catch (e) {
            console.error(e);
            throw new common_1.ForbiddenException("Not authorized");
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService, jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map