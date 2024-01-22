import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserEntity.name) private userModel: Model<UserEntity>,
  ) {}

  async createUser(credentials: CreateUserDto) {
    try {
      const user = new this.userModel(credentials);
      return user.save();
    } catch (error) {
      console.error('Error creating User:', error);
      throw error;
    }
  }

  async getAll() {
    try {
      return await this.userModel.find();
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }

  async getOneById(id: string) {
    try {
      if (!id) {
        throw new NotFoundException('User ID is required');
      }

      const user = await this.userModel.findById(id);

      if (!user) {
        throw new NotFoundException('User with this id has not been found');
      }

      return user;
    } catch (error) {
      console.error('Error getting User by ID:', error);
      throw error;
    }
  }

  async getUserByEmail(email: string): Promise<UserEntity | null> {
    try {
      const user = await this.userModel.findOne({ email }).exec();

      if (!user) {
        console.log(`User with Email ${email} hasn't been found`);
        throw new NotFoundException('User with this Email has not been found');
      }

      console.log('User:', user); // Проверьте, что user содержит поле id

      return user;
    } catch (error) {
      console.error('Error getting User by Email:', error);
      return null;
    }
  }
}