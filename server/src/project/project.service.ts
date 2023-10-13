import { BadRequestException, Injectable } from '@nestjs/common';
import { Client } from "pg";
import { InjectClient } from 'nest-postgres';
import * as uid from "uuid";


import { IProject } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectService {

  constructor(@InjectClient() private readonly pg: Client){}

  async findAll(email: string) {
    const query = `SELECT * FROM projects where "userEmail"='${email}'`;
    const result = await this.pg.query(query);
    return {
      rows: result.rows,
      count: result.rows.length,
    };
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

  async update(link: string, updateProjectDto: UpdateProjectDto) {
    const {name, description, auth, register, uploads} = updateProjectDto;
    const query = `UPDATE projects SET name='${name}', description='${description}', auth='${auth}', register='${register}', uploads='${uploads}' where link='${link}' RETURNING link, name, description, auth, register, uploads`;
    const result = (await this.pg.query(query)).rows[0];

    return {...result};
  }

  async remove(link: string) {
    const query = `DELETE FROM projects WHERE link='${link}'`;
    const result = (await this.pg.query(query)).rowCount;

    if(!result) throw new BadRequestException("Unknown link");

    return Boolean(result);
  }
}
