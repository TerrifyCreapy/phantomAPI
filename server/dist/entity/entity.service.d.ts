import { CreateEntityDto } from './dto/create-entity.dto';
import { UpdateEntityDto } from './dto/update-entity.dto';
import { Client } from "pg";
export declare class EntityService {
    private readonly pg;
    constructor(pg: Client);
    findAll(link: string): Promise<{
        rows: any;
        totalCount: any;
    }>;
    findOne(id?: number, link?: string, name?: string): Promise<any>;
    create(createEntityDto: CreateEntityDto): Promise<any>;
    update(id: number, updateEntityDto: UpdateEntityDto): Promise<boolean>;
    remove(id?: number): Promise<boolean>;
    createQueryStr(id?: number, link?: string, name?: string): string;
}
