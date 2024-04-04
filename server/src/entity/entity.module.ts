import { MiddlewareConsumer, Module } from '@nestjs/common';
import { EntityService } from './entity.service';
import { EntityController } from './entity.controller';

@Module({
  imports: [],
  controllers: [EntityController],
  providers: [EntityService],
  exports: [EntityService]
})
export class EntityModule {}
