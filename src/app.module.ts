import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { databaseProviders } from './mongo/database.providers';
import { MongooseModule } from '@nestjs/mongoose';

import { config } from 'dotenv';

config()



@Module({
  imports: [TasksModule, MongooseModule.forRoot(process.env.DB_PASSWORD)],
  controllers: [AppController],
  providers: [AppService, ...databaseProviders],
  exports: [...databaseProviders]
})
export class AppModule {}
