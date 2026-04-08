import { IsEnum, IsOptional } from 'class-validator';
import { TaskStatus } from '../entity/task-status.enum';

export class FindTasksDto {
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;
}
