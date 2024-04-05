import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, forwardRef } from '@nestjs/common';
import { CreateEntityDto } from './dto/create-entity.dto';
import { UpdateEntityDto } from './dto/update-entity.dto';
import { InjectClient } from 'nest-postgres';
import { Client } from "pg";

import { Errors } from 'src/constants/Errors.constants';

@Injectable()
export class EntityService {

  constructor(@InjectClient() private readonly pg: Client,) { }

  async findAll(link: string) {
    try {

      const project = (await this.pg.query('SELECT * FROM projects WHERE link=' + `'${link}'`)).rows.length;
      if (!project) throw new Error(Errors.notFoundException);
      const query = `select id, name, json_array_length(value) as item_count from entities where projectlink='${link}';`;
      const queryCount = `SELECT count(*) FROM entities where "projectlink"='${link}'`;
      const result = (await this.pg.query(query)).rows;
      const totalCount = (await this.pg.query(queryCount)).rows[0].count;


      return {
        rows: result,
        totalCount
      }
    }
    catch (e: any) {
      if (e.message === Errors.notFoundException) {
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


      if (!result.length) return null;
      return result[0];

    }
    catch (e: any) {
      throw new InternalServerErrorException();
    }
  }

  async create(createEntityDto: CreateEntityDto) {
    try {
      const { name, link } = createEntityDto;


      const project = (await this.pg.query(`SELECT * FROM projects where "link"='${link}'`)).rows;
      if (!project.length) throw new Error(Errors.notFoundException);

      const isExist = (await this.pg.query(`SELECT * FROM entities where "projectlink"='${link}' and "name"='${name}'`)).rows.length;
      if (isExist) throw new Error(Errors.badRequestException);

      const maxEntities = (await this.pg.query(`SELECT id FROM entities where "projectlink"='${link}'`)).rows.length;
      if (maxEntities > 19) throw new Error(Errors.badRequestException);


      const query = `INSERT INTO entities(name, value, "projectlink") values($1, $2, $3) RETURNING *`;
      const result = (await this.pg.query(query, [name, '[]', link])).rows[0];

      return { ...result };

    }
    catch (e: any) {
      if (e.message === Errors.notFoundException) {
        throw new NotFoundException("Project not found");
      }
      if (e.message === Errors.badRequestException) {
        throw new BadRequestException("Entity already exists or entities more than 20");
      }
      throw new InternalServerErrorException();
    }
  }

  async update(id: number = -1, updateEntityDto: UpdateEntityDto) {
    try {
      if (!id && (!updateEntityDto.link || !updateEntityDto.name)) throw new Error(Errors.badRequestException);
      if (!Array.isArray(updateEntityDto.value)) throw new Error("NOTARRAY");
      let query = ``;
      if (id) query = `UPDATE entities SET value='${updateEntityDto.value}' where id=${id}`;
      else if (updateEntityDto.link && updateEntityDto.name) query = `UPDATE entities SET value='${updateEntityDto.value}' where projectlink=${updateEntityDto.link} and name=${updateEntityDto.name}`;
      const result = await this.pg.query(query);
      return true;
    }
    catch (e: any) {
      if (e.message === Errors.badRequestException) {
        throw new BadRequestException("Entity can not be updated without id or link and name");
      }
      if (e.message === Errors.notFoundException) {
        throw new NotFoundException("Project not found");
      }
      if (e.message === "NOTARRAY") {
        throw new BadRequestException("Data must be json array!");
      }
      throw new InternalServerErrorException();
    }
  }

  async remove(id: number = -1) {
    try {
      const query = `DELETE FROM entities WHERE id=${id}`;
      const result = (await this.pg.query(query)).rowCount;
      if (!result) throw new Error(Errors.notFoundException);

      return Boolean(result);
    }
    catch (e: any) {
      if (e.message === Errors.notFoundException) {
        throw new NotFoundException("Entity not found");
      }
      throw new InternalServerErrorException();
    }
  }

  async removeByProject(link: string) {
    try {
      if (!link) throw new Error(Errors.badRequestException);
      const query = `DELETE FROM entities WHERE projectlink='${link}'`;
      const response = await this.pg.query(query);
      return true;
    }
    catch (e: any) {
      if (e.massage = Errors.badRequestException) {
        throw new BadRequestException(e.message);
      }
      throw new InternalServerErrorException();
    }
  }


  createQueryStr(id: number = -1, link: string = "", name: string = "") {

    if (id === -1 && (!link.length && !name.length)) throw new BadRequestException();
    const idStr = id > -1 ? `id=${id} ` : "";
    const projStr = link.length && name.length ? `"projectlink"='${link}' and "name"='${name}'` : "";

    return idStr.length ? idStr : projStr;
  }
}
