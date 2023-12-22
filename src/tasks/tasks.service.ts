import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskEntity } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(TaskEntity.name) private taskModel: Model<TaskEntity>,
  ) {}

  async createTask(task: CreateTaskDto) {
    
    try {
      return await this.taskModel.create({
        name: task.name,
        description: task.description,
        dateOfCreation: task.dateOfCreation,
        deadline: task.deadline,
        color: task.color,
        status: task.status,
      });
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  }

  async getAll() {
    try {
      return await this.taskModel.find();
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  }

  async getOne(id: string) {
    try {
      const task = await this.taskModel.findById({ _id: id });
      if (!task) {
        throw new NotFoundException('Task not found');
      }
      return task;
    } catch (error) {
      console.error('Error getting task by ID:', error);
      throw error;
    }
  }

  async deleteOne(id: string) {
    try {
      const task = await this.taskModel.findByIdAndDelete({ _id: id });
      if (!task) {
        throw new NotFoundException('Task not found');
      }
      return task;
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  }

  async updateStatus(id: string, status: string) {
    try {
      const task = await this.getOne(id);
      // Validate if the provided status is valid (add your validation logic here)
      task.status = status;
      return await task.save();
    } catch (error) {
      console.error('Error updating status:', error);
      throw error;
    }
  }
}
