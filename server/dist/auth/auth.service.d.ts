import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<{
        email: string;
    }>;
    login(user: {
        email: string;
    }): Promise<{
        email: string;
        access: string;
        refresh: string;
    }>;
    register(dto: CreateUserDto): Promise<{
        email: string;
        access: string;
        refresh: string;
    }>;
    me(refresh: string): Promise<{
        email: any;
        access: string;
    }>;
}
