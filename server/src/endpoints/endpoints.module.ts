import { MiddlewareConsumer, Module, forwardRef } from '@nestjs/common';
import { EntityModule } from 'src/entity/entity.module';
import { RestEndpointsService } from './rest-endpoints.service';
import { EndpointController } from './endpoints.controller';
import { SubdomainMiddleware } from 'src/middlewares/subdomain.middleware';
import { ProjectService } from 'src/project/project.service';
import { ProjectModule } from 'src/project/project.module';
import { EntityService } from 'src/entity/entity.service';

@Module({
  imports: [
    ProjectModule,
    EntityModule
  ],
  controllers: [EndpointController],
  providers: [RestEndpointsService, ProjectService, EntityService],
})
export class EndpointModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SubdomainMiddleware).forRoutes(":endpoint");
  }
}
