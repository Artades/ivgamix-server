import { ForbiddenException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UserEntity } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<UserEntity> {
    const user = await this.usersService.getUserByEmail(email);

    if (user && user.password === password) {
      const { _id, password, ...result } = user;
      console.log('_ID:', _id);
      console.log('Result', result);
      return result as UserEntity;
    }

    return null;
  }

  async register(credentials: CreateUserDto) {
    try {
      const isEmailAlreadyRegistered = await this.usersService.getUserByEmail(
        credentials.email,
      );
      if (isEmailAlreadyRegistered) {
        throw new ForbiddenException('This email has already been registered.');
      }

      const userData = await this.usersService.createUser(credentials);
      console.log(userData);

      return {
        token: this.jwtService.sign({ id: userData.id }),
      };
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Error registering User');
    }
  }

  async login(user: UserEntity) {
    const userDoc = user['_doc'];
    const token = this.jwtService.sign({ id: userDoc._id });

    return {
      token,
    };
  }
}
