import { Get, Body, Controller, Post, Query, Res, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';
import { IGetAllUsers } from './entities/query.entity';
import { ApiBody, ApiQuery } from '@nestjs/swagger';
import { PaginationDto } from './dto/Pagination.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { Response } from 'express';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiQuery({type: PaginationDto})
  async getAllUsers(@Query() params): Promise<IGetAllUsers> {
    const {limit, page} = params;
    return await this.userService.findAll(page, limit);
  }

}
