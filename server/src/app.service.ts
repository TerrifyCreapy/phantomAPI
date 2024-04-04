import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): number {
    return +process.env.MADE || 0;
  }
}
