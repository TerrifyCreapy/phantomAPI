import { Controller, Get, Post, Body, UseGuards, Param, Patch, Delete, HttpCode, Req } from '@nestjs/common';
import { RestEndpointsService } from './rest-endpoints.service';

@Controller('endpoints')
export class EndpointController {
    constructor(private readonly endpointService: RestEndpointsService) { }

    @Get(':endpoint')
    async getData(@Req() req, @Param('endpoint') endpoint: string) {
        return (await this.endpointService.findEndPoint(req.headers.subdomain, endpoint));
    }
}
