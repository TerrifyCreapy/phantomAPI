import { IUser } from "./user.entity";

export interface IGetAllUsers {
    rows: IUser[],
    count: number;
}