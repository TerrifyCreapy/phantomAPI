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
  constructor(private readonly authService: AuthService, private userService: UserService) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({ type: CreateUserDto })
  async login(@Req() req) {
    console.log(123);
    return await this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() dto: CreateUserDto) {
    console.log(dto);
    try {
      return await this.authService.register(dto);
    }
    catch (e: any) {
      console.error(e);
      throw new ForbiddenException("Error with registration");
    }

  }

  @Post('me')
  async me(@Body() body: { refresh: string }) {
    try {
      const { refresh } = body;
      console.log(refresh);
      if (!refresh) return null;
      const user = await this.authService.me(refresh);
      console.log(user);
      return user;
    }
    catch (e: any) {
      console.log(e);
      throw new ForbiddenException("Not authorized");
    }
  }
}
