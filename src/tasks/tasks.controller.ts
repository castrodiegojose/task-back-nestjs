import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Delete,
  Param,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreatTaskDto } from 'src/dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  findAll() {
    try {
      return this.tasksService.findAll();
    } catch (err) {
      throw Error(err.message);
    }
  }

  @Get(':id')
  async finOne(@Param('id') taskId: string) {
    const task = await this.tasksService.findOne(taskId);
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  @Post()
  async create(@Body() body: CreatTaskDto) {
    try {
      return await this.tasksService.createTask(body);
    } catch (err) {
      if (err.code === 11000) {
        throw new ConflictException('Task already exists');
      }
      throw Error(err.message);
    }
  }

  @Delete(':id')
  async deleteTask(@Param('id') taskId: string) {
    const task = await this.tasksService.deleteTask(taskId);
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  @Put(':id')
  async update(@Param('id') taskId: string, @Body() updateBody: UpdateTaskDto) {
    const task = await this.tasksService.update(taskId, updateBody);
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }
}
