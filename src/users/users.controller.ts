import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { JwtService } from '@nestjs/jwt';

@Controller('users')
@ApiTags('users')
@ApiBearerAuth()
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  getMe(@Request() req) {
    const token = req.headers.authorization.replace('Bearer ', ''); // Assuming Bearer token
    const decodedToken = this.jwtService.decode(token) as { id: string };
    const userId = decodedToken.id;

    return this.usersService.getOneById(userId);
  }

  @Post()
  create(@Body() credentials: CreateUserDto) {
    return this.usersService.createUser(credentials);
  }

  @Get()
  getAll() {
    return this.usersService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.usersService.getOneById(id);
  }

  @Get('by-email/:email')
  getUserByEmail(@Param('email') email: string) {
    return this.usersService.getUserByEmail(email);
  }
}
