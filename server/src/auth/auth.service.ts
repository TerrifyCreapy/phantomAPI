import { ForbiddenException, Injectable } from '@nestjs/common';
import * as bcrypt from "bcrypt";
import { IUser } from "../user/entities/user.entity";
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {

    constructor(private userService: UserService, private jwtService: JwtService) {

    }

    async validateUser(email: string, password: string): Promise<{ email: string }> {
        const user = await this.userService.findByEmail(email);

        if (user) {
            const compare = await bcrypt.compare(password, user.password);
            if (compare) {
                const { password, refresh, ...result } = user;
                return result;
            }
        }

        return null;
    }

    async login(user: { email: string }): Promise<{
        email: string;
        access: string;
        refresh: string;
    }> {
        try {
            const payload = { email: user.email };

            const refreshToken = this.jwtService.sign(payload, { expiresIn: process.env.JWT_EXPIRES });
            const isRefreshed = this.userService.refreshToken(user.email, refreshToken);

            const accessToken = this.jwtService.sign(payload, { expiresIn: process.env.JWT_EXPIRES_IN });

            return {
                email: user.email,
                access: accessToken,
                refresh: refreshToken
            }

        }
        catch (e: any) {
            throw new ForbiddenException("Error with login")
        }

    }

    async register(dto: CreateUserDto): Promise<{
        email: string,
        access: string;
        refresh: string;
    }> {
        try {
            const payload = { email: dto.email };

            const refreshToken = this.jwtService.sign(payload, { expiresIn: process.env.JWT_EXPIRES });

            const user = await this.userService.createUser(dto, refreshToken);

            if (typeof user === "string") throw new ForbiddenException("Error with registration!");

            return {
                email: payload.email,
                access: this.jwtService.sign(payload, { expiresIn: process.env.JWT_EXPIRES_IN }),
                refresh: refreshToken
            }
        }
        catch (e) {
            console.error(e);
            throw new ForbiddenException("Error with register!");
        }
    }

    async me(refresh: string) {
        try {
            const user = await this.userService.findByRefresh(refresh);
            if (!user) return null;
            const accessToken = this.jwtService.sign({ email: user.email }, { expiresIn: process.env.JWT_EXPIRES_IN });
            return {
                email: user.email,
                access: accessToken
            };
        }
        catch (e: any) {
            console.error(e);
            throw new ForbiddenException("Not authorized");
        }
    }

}
