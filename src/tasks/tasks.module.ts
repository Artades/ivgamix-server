import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {  TaskEntitySchema } from './entities/task.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ 
      name: 'TaskEntity',
     schema: TaskEntitySchema }]),
  ],
  
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
