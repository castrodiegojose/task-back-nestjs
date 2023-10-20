import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from '../schemas/tasks.schemas';
import { Model } from 'mongoose';
import { CreatTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async findAll() {
    return await this.taskModel.find();
  }

  async createTask(createTask: CreatTaskDto) {
    const newTask = new this.taskModel(createTask);
    await newTask.save();
    return newTask;
  }

  async findOne(id: string) {
    try {
      return await this.taskModel.findById(id);
    } catch (err) {
      console.log(err.message);
    }
  }

  async deleteTask(id: any) {
    try {
      return await this.taskModel.findOneAndDelete(id);
    } catch (err) {
      console.log(err.message);
    }
  }

  async update(id: any, task: UpdateTaskDto) {
    try {
      return await this.taskModel.findByIdAndUpdate(id, task, { new: true });
    } catch (err) {
      console.log(err.message);
    }
  }
}
