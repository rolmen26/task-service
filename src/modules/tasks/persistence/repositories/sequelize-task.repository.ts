import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TaskPersistenceEntity } from '../../entity/persistence/task.persistence.entity';
import { TaskRepositoryContract } from '../../contracts/task-repository.contract';
import { Task } from '../../entity/task.domain';
import { TaskMapper } from '../mappers/task.mapper';
import { FindTasksDto } from '../../dto/find-tasks.dto';
import { WhereOptions } from 'sequelize';

@Injectable()
export class SequelizeTaskRepository implements TaskRepositoryContract {
  constructor(
    @InjectModel(TaskPersistenceEntity)
    private readonly taskModel: typeof TaskPersistenceEntity,
    private readonly taskMapper: TaskMapper,
  ) {}

  async save(task: Task): Promise<Task> {
    if (task.id) {
      const existingEntity = await this.taskModel.findByPk(task.id);
      if (!existingEntity) {
        throw new Error('Task not found');
      }
      const updatedEntity = this.taskMapper.toEntity(task, existingEntity);
      const savedEntity = await updatedEntity.save();
      return this.taskMapper.toDomain(savedEntity);
    } else {
      const newEntity = this.taskMapper.toEntity(task);
      const savedEntity = await newEntity.save();
      return this.taskMapper.toDomain(savedEntity);
    }
  }

  async findAll(findTasksDto: FindTasksDto): Promise<Task[]> {
    const where: WhereOptions<TaskPersistenceEntity> = {};

    if (findTasksDto.status) {
      where.status = findTasksDto.status;
    }

    const taskEntities = await this.taskModel.findAll({ where });
    return taskEntities.map((entity) => this.taskMapper.toDomain(entity));
  }

  async findById(id: number): Promise<Task | null> {
    const taskEntity = await this.taskModel.findByPk(id);
    return taskEntity ? this.taskMapper.toDomain(taskEntity) : null;
  }

  async delete(id: number): Promise<void> {
    await this.taskModel.destroy({ where: { id } });
  }
}
