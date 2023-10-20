import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

console.log(process.env.URI_MONGO);

@Module({
  imports: [MongooseModule.forRoot(process.env.URI_MONGO), TasksModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
