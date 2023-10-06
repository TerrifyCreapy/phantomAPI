import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): number {
    return Math.random() * 50;
  }
}
