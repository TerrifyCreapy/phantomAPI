import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { RestEndpointsService } from './rest-endpoints.service';
import { CreateRestEndpointDto } from './dto/create-rest-endpoint.dto';
import { UpdateRestEndpointDto } from './dto/update-rest-endpoint.dto';

@Controller('rest/dev')
export class RestEndpointsController {
  constructor(private readonly restEndpointsService: RestEndpointsService) {}

  @Get(':endpoint')
  async findAll(@Request() req, @Param('endpoint') endpoint: string) {
    const {subdomain} = req.headers;
    
    const result = await this.restEndpointsService.findAll(subdomain, endpoint);
    return result;
  }

  @Post('users')
  async createUser(@Body() body: any, @Request() req) {
    const {subdomain} = req.headers;
    console.log(subdomain);
    const result = await this.restEndpointsService.createUser(subdomain, body);
    return result;
  }

  @Post(':endpoint')
  async createItem(@Body() body: any, @Param('endpoint') endpoint: string, @Request() req) {
    const {subdomain} = req.headers;
    const result = await this.restEndpointsService.createItem(subdomain, endpoint, body);
    return result;
  }
}
