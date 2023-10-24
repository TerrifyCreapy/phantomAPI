import { RestEndpointsService } from './rest-endpoints.service';
export declare class RestEndpointsController {
    private readonly restEndpointsService;
    constructor(restEndpointsService: RestEndpointsService);
    findAll(req: any, endpoint: string): Promise<any>;
    createUser(body: any, req: any): Promise<any>;
    createItem(body: any, endpoint: string, req: any): Promise<any>;
}
