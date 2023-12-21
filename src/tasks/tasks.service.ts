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
    return await this.taskModel.create({
      name: task.name,
      description: task.description,
      dateOfCreation: task.dateOfCreation,
      deadline: task.deadline,
      color: task.color,
      status: task.status,
    });
  }

  async getAll() {
    return await this.taskModel.find();
  }

  async getOne(id: string) {
    return await this.taskModel.findById({ _id: id });
  }

  async deleteOne(id: string) {
    return await this.taskModel.findByIdAndDelete({ _id: id });
  }
  // async deleteSome(ids: string[]):Promise<DeleteResult> {
  //   return await this.taskModel.deleteMany({ _id: { $in: ids } });
  // }

  async updateStatus(id: string, status: string) {
    const task = await this.getOne(id); // Используйте await здесь
    if (!task) throw new NotFoundException("This task hasn't been found");

    task.status = status;
    return await task.save();
  }


}
