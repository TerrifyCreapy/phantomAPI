import { Client } from 'pg';
import { IUser } from './entities/user.entity';
import { IGetAllUsers } from './entities/query.entity';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UserService {
    private readonly pg;
    constructor(pg: Client);
    findByEmail(email: string): Promise<IUser | null>;
    findAll(page?: number, limit?: number): Promise<IGetAllUsers>;
    findByRefresh(refresh: string): Promise<any>;
    createUser(user: CreateUserDto, refresh: string): Promise<{
        email: string;
    } | string>;
    refreshToken(email: string, refresh: string): Promise<boolean>;
}
