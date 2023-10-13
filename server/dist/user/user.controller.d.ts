import { UserService } from './user.service';
import { IGetAllUsers } from './entities/query.entity';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getAllUsers(params: any): Promise<IGetAllUsers>;
}
