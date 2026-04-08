import { Injectable } from '@nestjs/common';
import { Task } from '../../entity/task.domain';
import { TaskPersistenceEntity } from '../../entity/persistence/task.persistence.entity';

@Injectable()
export class TaskMapper {
  toDomain(entity: TaskPersistenceEntity): Task {
    return new Task(
      entity.id,
      entity.title,
      entity.description,
      entity.status,
      entity.priority,
      entity.dueDate,
      entity.ownerId,
      entity.createdAt,
      entity.updatedAt,
    );
  }

  toEntity(
    domain: Task,
    entityToUpdate?: TaskPersistenceEntity,
  ): TaskPersistenceEntity {
    const entity = entityToUpdate || new TaskPersistenceEntity();
    entity.title = domain.title;
    entity.description = domain.description as string;
    entity.status = domain.status;
    entity.priority = domain.priority;
    entity.dueDate = domain.dueDate;
    entity.ownerId = domain.ownerId;
    return entity;
  }
}
