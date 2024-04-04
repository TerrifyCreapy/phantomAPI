import { EntityService } from './entity.service';
import { CreateEntityDto } from './dto/create-entity.dto';
import { UpdateEntityDto } from './dto/update-entity.dto';
export declare class EntityController {
    private readonly entityService;
    constructor(entityService: EntityService);
    findAll(link: string): Promise<{
        rows: any;
        totalCount: any;
    }>;
    findOne(id: string): Promise<any>;
    create(createEntityDto: CreateEntityDto): Promise<any>;
    update(id: number, updateEntityDto: UpdateEntityDto): Promise<boolean>;
    remove(id: string): Promise<boolean>;
}
