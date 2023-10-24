import { MiddlewareConsumer, Module } from '@nestjs/common';
import { RestEndpointsService } from './rest-endpoints.service';
import { RestEndpointsController } from './rest-endpoints.controller';
import { SubdomainMiddleware } from 'src/middlewares/subdomain.middleware';
import { ProjectModule } from 'src/project/project.module';

@Module({
  imports: [ProjectModule],
  controllers: [RestEndpointsController],
  providers: [RestEndpointsService],
})
export class RestEndpointsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SubdomainMiddleware).forRoutes('rest/dev');
  }
}
