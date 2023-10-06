import { Controller, Get, HttpCode } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  @HttpCode(294)
  getHello(): number {
    return this.appService.getHello();
  }
}
