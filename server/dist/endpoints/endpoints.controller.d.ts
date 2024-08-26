import { RestEndpointsService } from './rest-endpoints.service';
export declare class EndpointController {
    private readonly endpointService;
    constructor(endpointService: RestEndpointsService);
    getData(req: any, endpoint: string): Promise<any>;
    addData(req: any, endpoint: string, body: any): Promise<any>;
}
