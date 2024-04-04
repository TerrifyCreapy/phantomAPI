import { ProjectService } from 'src/project/project.service';
import { Client } from "pg";
export declare class RestEndpointsService {
    private readonly projectService;
    private readonly pg;
    constructor(projectService: ProjectService, pg: Client);
    checkProject(link: string): Promise<import("../project/entities/project.entity").IProject>;
    findEndPoint(link: string, endpoint: string): Promise<any>;
    findAll(link: string, endpoint: string): Promise<any>;
    createItem(link: any, endpoint: any, body: any): Promise<any>;
    findUserByEmail(email: string): Promise<Boolean>;
    createUser(link: string, body: any): Promise<any>;
}
