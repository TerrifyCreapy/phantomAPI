import { Client } from "pg";
import { IProject } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
export declare class ProjectService {
    private readonly pg;
    constructor(pg: Client);
    findAll(email: string): Promise<{
        rows: any;
        count: any;
    }>;
    findOne(link: string): Promise<IProject>;
    create(createProjectDto: CreateProjectDto, email: string): Promise<any>;
    update(link: string, updateProjectDto: UpdateProjectDto): Promise<any>;
    remove(link: string): Promise<boolean>;
}
