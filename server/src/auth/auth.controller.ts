import { Controller, UseGuards, Post, Body, Req, ForbiddenException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { UserService } from 'src/user/user.service';
import { LocalAuthGuard } from './guards/local.guard';
import { LocalStrategy } from './strategies/local.strategy';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private userService: UserService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({type: CreateUserDto})
  async login(@Req() req) {
    return await this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() dto: CreateUserDto) {
    try {
      return await this.authService.register(dto);
    }
    catch(e: any) {
      console.error(e);
      throw new ForbiddenException("Error with registration");
    }
    
  }
}
