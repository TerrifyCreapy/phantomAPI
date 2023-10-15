import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { EntityService } from './entity.service';
import { CreateEntityDto } from './dto/create-entity.dto';
import { UpdateEntityDto } from './dto/update-entity.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UserEmail } from 'src/decorators/user-email.decorator';

@Controller('entity')
@ApiTags('entities')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class EntityController {
  constructor(private readonly entityService: EntityService) {}

  @Get(':link')
  findAll(@Param('link') link: string) {
    return this.entityService.findAll(link);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log("Next");
    return this.entityService.findOne(+id);
  }

  @Post()
  create(@Body() createEntityDto: CreateEntityDto) {
    return this.entityService.create(createEntityDto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateEntityDto: UpdateEntityDto) {
    return this.entityService.update(+id, updateEntityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.entityService.remove(+id);
  }
}
