import { TaskStatus } from './task-status.enum';
import { TaskPriority } from './task-priority.enum';

export class Task {
  constructor(
    public id: number | null,
    public title: string,
    public description: string | null,
    public status: TaskStatus,
    public priority: TaskPriority,
    public dueDate: Date | null,
    public ownerId: number,
    public createdAt?: Date,
    public updatedAt?: Date,
  ) {}
}
