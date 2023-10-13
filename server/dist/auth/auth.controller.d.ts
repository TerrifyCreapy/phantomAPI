import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
export declare class AuthController {
    private readonly authService;
    private userService;
    constructor(authService: AuthService, userService: UserService);
    login(req: any): Promise<{
        access: string;
        refresh: string;
    }>;
    register(dto: CreateUserDto): Promise<{
        access: string;
        refresh: string;
    }>;
}
