import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { ForbiddenException, Injectable } from "@nestjs/common";
import { UserService } from "src/user/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'theJwt') {
    constructor(private readonly userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SK_ACCESS
        });
    }

    async validate(payload: any) {
        const user = await this.userService.findByEmail(payload.email);
        if(!user) throw new ForbiddenException("У вас нет доступа!");
        return {
            email: user.email,
        };
    }
}