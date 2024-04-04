import { Client } from "pg";
import { IProject } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { EntityService } from 'src/entity/entity.service';
export declare class ProjectService {
    private readonly pg;
    private readonly entityService;
    constructor(pg: Client, entityService: EntityService);
    findAll(email: string): Promise<{
        rows: any;
        count: any;
        maxEntities: number;
    }>;
    findOne(link: string): Promise<IProject>;
    create(createProjectDto: CreateProjectDto, email: string): Promise<any>;
    update(link: string, updateProjectDto: CreateProjectDto): Promise<any>;
    updateFeatures(link: string, updateFeatures: UpdateProjectDto): Promise<any>;
    remove(link: string): Promise<boolean>;
}
