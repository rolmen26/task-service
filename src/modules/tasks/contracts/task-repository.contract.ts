import { Task } from '../entity/task.domain';
import { FindTasksDto } from '../dto/find-tasks.dto';

export const TASK_REPOSITORY = 'TASK_REPOSITORY';

export interface TaskRepositoryContract {
  save(task: Task): Promise<Task>;
  findAll(findTasksDto: FindTasksDto): Promise<Task[]>;
  findById(id: number): Promise<Task | null>;
  delete(id: number): Promise<void>;
}
