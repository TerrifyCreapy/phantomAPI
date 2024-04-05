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
    private readonly entityService: EntityService) { }

  async findAll(email: string) {
    try {
      const query = `select p.link, p.name, p.createdat, count(e.id) as entity_count from projects as p left join entities as e on p.link = e.projectlink where p.useremail='${email}' group by p.link order by p.createdat desc;`;
      const result = await this.pg.query(query);
      return {
        rows: result.rows,
        count: result.rows.length,
        maxEntities: 20,
      };
    }
    catch (e: any) {
      throw new BadRequestException("Error");
    }

  }

  async findOne(link: string): Promise<IProject> {
    try {
      console.log(link);

      const query = `SELECT * FROM projects where "link"='${link}'`;
      const result = await this.pg.query(query);
      if (!result.rows.length) throw new Error("NOTFOUND");
      const entites = await this.entityService.findAll(link);
      return { ...result.rows[0], entities: entites };
    }
    catch (e) {
      if (e.message === "NOTFOUND") throw new NotFoundException("The project not found!");
    }

  }

  async create(createProjectDto: CreateProjectDto, email: string) {
    try {
      const { name } = createProjectDto;

      const testQuery = `SELECT * FROM projects where name='${name}'`;
      const isExist = (await this.pg.query(testQuery)).rows.length;
      if (isExist) throw new Error("Project already exist");

      const link = uid.v4();

      const query = `INSERT INTO projects(link, name, "useremail") VALUES($1, $2, $3) RETURNING link, name, createdat`;

      const result = (await this.pg.query(query, [link, name, email])).rows[0];

      return { ...result, entity_count: 0 };
    }
    catch (e: any) {
      throw new BadRequestException(e.message);
    }


  }

  async update(link: string, updateProjectDto: CreateProjectDto) {
    const { name } = updateProjectDto;
    const query = `UPDATE projects SET name='${name}' where link='${link}' RETURNING link, name, description, auth, register, uploads`;
    const result = (await this.pg.query(query)).rows[0];

    return { ...result };
  }

  async updateFeatures(link: string, updateFeatures: UpdateProjectDto) {
    try {
      const { auth, register, uploads } = updateFeatures;
      const project = await this.findOne(link);
      if (project.auth === auth && project.register === register && project.uploads === uploads) return project;

      if (!project) throw new Error("Project not found");

      const uploadsEntity = await this.entityService.findOne(-1, link, "uploads");
      if (auth || register) {

        const userEntity = await this.entityService.findOne(-1, link, "users");
        console.log(userEntity);
        if (!userEntity) {
          const cfg: CreateEntityDto = {
            name: "users",
            link,
          }

          await this.entityService.create(cfg);

        }
      }
      if (uploads) {
        if (!uploadsEntity) {
          const cfg: CreateEntityDto = {
            name: "uploads",
            link,
          }
          await this.entityService.create(cfg);
        }
      }

      const query = `UPDATE projects SET "auth"=${auth}, "register"=${register}, "uploads"=${uploads} WHERE link='${link}' RETURNING *`;
      const result = (await this.pg.query(query)).rows[0];
      return { ...result };
    }
    catch (e: any) {
      throw new NotFoundException(e.message);
    }

  }

  async remove(link: string) {
    const removeEntity = await this.entityService.removeByProject(link);
    const query = `DELETE FROM projects WHERE link='${link}'`;
    const result = (await this.pg.query(query)).rowCount;

    if (!result) throw new BadRequestException("Unknown link");

    return Boolean(result);
  }
}
