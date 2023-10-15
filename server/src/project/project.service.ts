import { BadRequestException, Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { Client } from "pg";
import { InjectClient } from 'nest-postgres';
import * as uid from "uuid";


import { IProject } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { EntityService } from 'src/entity/entity.service';
import { CreateEntityDto } from 'src/entity/dto/create-entity.dto';

@Injectable()
export class ProjectService {

  constructor(@InjectClient() private readonly pg: Client,
              private readonly entityService: EntityService){}

  async findAll(email: string) {
    try {
      const query = `SELECT * FROM projects where "useremail"='${email}'`;
      const result = await this.pg.query(query);
      return {
        rows: result.rows,
        count: result.rows.length,
      };
    }
    catch(e: any) {
      throw new BadRequestException("Error");
    }
    
  }

  async findOne(link: string): Promise<IProject> {
    const query = `SELECT * FROM projects where "link"='${link}'`;
    const result = await this.pg.query(query);
    if(!result.rows.length) throw new BadRequestException("Unknown link");
    return {...result.rows[0]};
  }

  async create(createProjectDto: CreateProjectDto, email: string) {
    const {name, description} = createProjectDto;

    const link = uid.v4();

    const query = `INSERT INTO projects(link, name, description, "useremail") VALUES($1, $2, $3, $4) RETURNING link, name, description, auth, register, uploads`;
    
    const result = (await this.pg.query(query, [link, name, description, email])).rows[0];

    return {...result};

  }

  async update(link: string, updateProjectDto: CreateProjectDto) {
    const {name, description} = updateProjectDto;
    const query = `UPDATE projects SET name='${name}', description='${description}' where link='${link}' RETURNING link, name, description, auth, register, uploads`;
    const result = (await this.pg.query(query)).rows[0];

    return {...result};
  }

  async updateFeatures(link: string, updateFeatures: UpdateProjectDto) {
    try {
      const {auth, register, uploads} = updateFeatures;
      const project = await this.findOne(link);
      if(project.auth === auth && project.register === register && project.uploads === uploads) return project;
      
      if(!project) throw new Error("Project not found");
      
      const uploadsEntity = await this.entityService.findOne(-1, link, "uploads");
      if(auth || register) {

        const userEntity = await this.entityService.findOne(-1, link, "users");
        console.log(userEntity);
        if(!userEntity) {
          const cfg: CreateEntityDto = {
            name: "users",
            link,
          }

          await this.entityService.create(cfg);
          
        }
      }
      if(uploads) {
        if(!uploadsEntity) {
          const cfg: CreateEntityDto = {
            name: "uploads",
            link,
          }
          await this.entityService.create(cfg);
        }
      }

      const query = `UPDATE projects SET "auth"=${auth}, "register"=${register}, "uploads"=${uploads} WHERE link='${link}' RETURNING *`;
      const result = (await this.pg.query(query)).rows[0];
      return {...result};
    }
    catch(e: any) {
      throw new NotFoundException(e.message);
    }
    
  }

  async remove(link: string) {
    const query = `DELETE FROM projects WHERE link='${link}'`;
    const result = (await this.pg.query(query)).rowCount;

    if(!result) throw new BadRequestException("Unknown link");

    return Boolean(result);
  }
}
