// auth.controller.ts
import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';

import { UserEntity } from 'src/users/entities/user.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LocalAuthGuard } from './guards/local.guard';


 @Controller('auth')
 @ApiTags('auth')
 export class AuthController {
   constructor(private readonly authService: AuthService) {}

   @UseGuards(LocalAuthGuard)
   @Post('/login')
   @ApiBody({ type: CreateUserDto })
   async login(@Request() req) {
     return this.authService.login(req.user as UserEntity);
   }
   @Post('/register')
   register(@Body() credentials: CreateUserDto) {
     return this.authService.register(credentials);
   }
 }
