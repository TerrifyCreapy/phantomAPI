import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, forwardRef } from '@nestjs/common';
import { CreateEntityDto } from './dto/create-entity.dto';
import { UpdateEntityDto } from './dto/update-entity.dto';
import { InjectClient } from 'nest-postgres';
import { Client } from "pg";

import { Errors } from 'src/constants/Errors.constants';

@Injectable()
export class EntityService {

  constructor(@InjectClient() private readonly pg: Client,) {}

  async findAll(link: string) {
    try {

      const project = (await this.pg.query('SELECT * FROM projects WHERE link='+`'${link}'`)).rows.length;
      if(!project) throw new Error(Errors.notFoundException);
      const query = `SELECT id, name FROM entities where "projectlink"='${link}'`;
      const queryCount = `SELECT count(*) FROM entities where "projectlink"='${link}'`;
      const result = (await this.pg.query(query)).rows;
      const totalCount = (await this.pg.query(queryCount)).rows[0].count;
      

      return {
        rows: result,
        totalCount
      }
    }
    catch(e: any) {
      if(e.message === Errors.notFoundException) {
        throw new NotFoundException("Project not found");
      }
      throw new InternalServerErrorException();
    }
    
  }

  async findOne(id: number = -1, link: string = "", name: string = "") {
    try {
      
      const resultStr = this.createQueryStr(id, link, name);
     

      const query = `SELECT * from entities where ${resultStr}`;
      
      const result = (await this.pg.query(query)).rows;
      

      if(!result.length) return null;
      return result[0];

    }
    catch(e: any) {
      throw new InternalServerErrorException();
    }
  }

  async create(createEntityDto: CreateEntityDto) {
    try {
      const {name, link} = createEntityDto;
      

      const project = (await this.pg.query(`SELECT * FROM projects where "link"='${link}'`)).rows;

      if(!project.length) throw new Error(Errors.notFoundException);

      const isExist = (await this.pg.query(`SELECT * FROM entities where "projectlink"='${link}' and "name"='${name}'`)).rows.length;
      
      if(isExist) throw new Error(Errors.badRequestException);

  
      const query = `INSERT INTO entities(name, value, "projectlink", index) values($1, $2, $3, 1) RETURNING *`;
      const result = (await this.pg.query(query, [name, '{}', link])).rows[0];
      console.log(result);
      return {...result};

    }
    catch(e: any) {
      if(e.message === Errors.notFoundException) {
        throw new NotFoundException("Project not found");
      }
      if(e.message === Errors.badRequestException) {
        throw new BadRequestException("Entity already exists");
      }
      throw new InternalServerErrorException();
    }
  }

  async update(id: number = -1, updateEntityDto: UpdateEntityDto) {
    try {
        
    }
    catch(e: any) {
      if(e.message === Errors.badRequestException) {
        throw new BadRequestException("Entity can not be updated without id or link and name");
      }
      if(e.message === Errors.notFoundException) {
        throw new NotFoundException("Project not found");
      }
      throw new InternalServerErrorException();
    }
  }

  async remove(id: number = -1) {
     try {
      const query = `DELETE FROM entities WHERE id=${id}`;
      const result = (await this.pg.query(query)).rowCount;
      if(!result) throw new Error(Errors.notFoundException);

      return Boolean(result);
     }
     catch(e: any) {
      if(e.message === Errors.notFoundException) {
        throw new NotFoundException("Entity not found");
      }
      throw new InternalServerErrorException();
     }
      

  }


  createQueryStr(id: number = -1, link: string = "", name: string = "") {
    
    if(id === -1 && (!link.length && !name.length)) throw new BadRequestException();
    const idStr = id > -1? `id=${id} `:"";
    const projStr = link.length && name.length?`"projectlink"='${link}' and "name"='${name}'`: "";
    
    return idStr.length? idStr: projStr;
  }
}
