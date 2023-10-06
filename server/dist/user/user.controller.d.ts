import { UserService } from './user.service';
import { IGetAllUsers } from './entities/query.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Response } from 'express';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getAllUsers(params: any): Promise<IGetAllUsers>;
    regUser(user: CreateUserDto, response: Response): Promise<Response<any, Record<string, any>> | import("./entities/user.entity").IUser>;
}
