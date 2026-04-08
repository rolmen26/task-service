import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TaskPersistenceEntity } from './entity/persistence/task.persistence.entity';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TASK_REPOSITORY } from './contracts/task-repository.contract';
import { SequelizeTaskRepository } from './persistence/repositories/sequelize-task.repository';
import { TaskMapper } from './persistence/mappers/task.mapper';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [SequelizeModule.forFeature([TaskPersistenceEntity]), AuthModule],
  controllers: [TasksController],
  providers: [
    TasksService,
    TaskMapper,
    {
      provide: TASK_REPOSITORY,
      useClass: SequelizeTaskRepository,
    },
  ],
})
export class TasksModule {}
