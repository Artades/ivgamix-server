import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { config } from 'dotenv';

config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: { id: string }) {
    try {
      if (!payload.id) {
        throw new NotFoundException('User ID is required');
      }

      const user = await this.userService.getOneById(payload.id);

      if (!user) {
        throw new UnauthorizedException('You do not have access');
      }

      return {
        id: user.id,
      };
    } catch (error) {
      console.error('Error validating user:', error);
      throw error;
    }
  }
}
