import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ProjectService } from 'src/project/project.service';
import { InjectClient } from 'nest-postgres';
import { Client } from "pg";
import { Errors } from 'src/constants/Errors.constants';

@Injectable()
export class RestEndpointsService {

  constructor(private readonly projectService: ProjectService, @InjectClient() private readonly pg: Client) { }

  async checkProject(link: string) {
    return (await this.projectService.findOne(link));
  }

  async findEndPoint(link: string, endpoint: string): Promise<any> {
    try {
      await this.checkProject(link);

      const query = `SELECT json_array_elements(value) as items from entities where name='${endpoint}' and projectlink='${link}'`;

      const result = (await this.pg.query(query)).rows.map(e => ({ ...e.items }));
      if (!result.length) throw new Error(Errors.notFoundException);
      return result;
    }
    catch (e: any) {
      console.log(e.message);
      throw new BadRequestException(e.message);
    }

  }

  async findAll(link: string, endpoint: string) {
    try {
      (await this.checkProject(link));

      const result = await this.findEndPoint(link, endpoint);

      return result;

    }
    catch (e: any) {
      if (e.message === Errors.notFoundException) {
        throw new NotFoundException("Not found endpoint");
      }
      throw new InternalServerErrorException();
    }

  }

  async createItem(link, endpoint, body) {
    try {
      (await this.checkProject(link));

      const nextIndex = (await this.pg.query(`SELECT index FROM entities where projectlink='${link}' and name='${endpoint}'`)).rows[0].index;

      body.id = nextIndex;


      const query = `UPDATE entities SET value=array_append(value, '${JSON.stringify(body)}'::jsonb), index = index + 1 where projectlink='${link}' and name='${endpoint}' RETURNING *`;
      const isCompleted = Boolean((await this.pg.query(query)).rows.length);

      return body;
    }
    catch (e) {

    }
  }

  async findUserByEmail(email: string): Promise<Boolean> {
    try {

      const query = `SELECT items FROM (SELECT unnest(value) as items FROM entities where name='users') as json WHERE (items->>'email')='${email}'`;
      const isExist = Boolean((await this.pg.query(query)).rows.length);


      return isExist;
    }
    catch (e: any) {
      throw new InternalServerErrorException();
    }
  }

  async createUser(link: string, body: any) {
    const errors: Array<string> = [];
    try {
      if (!(typeof body === "object")) {
        errors.push("Body is not json type");
        throw new Error(Errors.badRequestException)
      };

      if (!body.email) {
        errors.push("Object does not have required property 'email'")
      }

      if (!body.password) {
        errors.push("Object does not have required property 'password'");
      }

      const isExistEmail = await this.findUserByEmail(body.email);


      if (isExistEmail) {
        errors.push("User already exist");
      }
      if (errors.length) throw new Error(Errors.badRequestException);

      const result = await this.createItem(link, 'users', body);

      return result;


    }
    catch (e: any) {
      if (e.message === Errors.badRequestException) {
        throw new BadRequestException(errors);
      }
      throw new InternalServerErrorException();
    }
  }

}
