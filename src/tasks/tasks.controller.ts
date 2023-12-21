import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateStatusDto } from './dto/update-status.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.createTask(createTaskDto);
  }

  @Get()
  findAll() {
    return this.tasksService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.tasksService.getOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
  //   return this.tasksService.update(+id, updateTaskDto);
  // }

  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.tasksService.deleteOne(id);
  }

  // @Delete(':ids')
  // deleteSome(@Param('ids') ids:string[]) {
  //   return this.tasksService.deleteSome(ids)
  // }

  // В TasksController
  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateStatusDto,
  ) {
    return this.tasksService.updateStatus(id, updateStatusDto.status);
  }
}
