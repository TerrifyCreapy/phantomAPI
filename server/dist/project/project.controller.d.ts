import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { IProject } from './entities/project.entity';
export declare class ProjectController {
    private readonly projectService;
    constructor(projectService: ProjectService);
    findAll(email: string): Promise<{
        rows: any;
        count: any;
        maxEntities: number;
    }>;
    findOne(link: string): Promise<IProject | null>;
    createProject(dto: CreateProjectDto, email: string): Promise<any>;
    update(link: string, updateDto: CreateProjectDto): Promise<any>;
    updateFeatures(link: string, updateProjectDto: UpdateProjectDto): Promise<any>;
    remove(link: string): Promise<boolean>;
}
