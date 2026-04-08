import { TaskStatus } from '../entity/task-status.enum';
import { TaskPriority } from '../entity/task-priority.enum';

export class TaskDto {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: Date;
  ownerId: number;
  createdAt: Date;
  updatedAt: Date;
}
