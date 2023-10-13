import { Controller, Get, Post, Body, UseGuards, Param, Patch, Delete, HttpCode } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserEmail } from 'src/decorators/user-email.decorator';
import { IProject } from './entities/project.entity';

@Controller('project')
@ApiTags('projects')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  
  @Get()
  async findAll(@UserEmail() email: string) {
    return (await this.projectService.findAll(email));
  }

  @Get(':link')
  async findOne(@Param('link') link: string): Promise<IProject | null> {
    return (await this.projectService.findOne(link));
  }

  @Post()
  @HttpCode(201)
  async createProject(@Body() dto: CreateProjectDto, @UserEmail() email: string) {
    return (await this.projectService.create(dto, email));
  }

  @Patch(':link')
  async update(@Param('link') link: string, updateDto: UpdateProjectDto) {
    return(await this.projectService.update(link, updateDto))
  }

  @Delete(':link')
  async remove(@Param('link') link: string) {
    return (await this.projectService.remove(link));
  }
}
