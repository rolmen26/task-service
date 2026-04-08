import {
  IsString,
  IsOptional,
  IsEnum,
  IsDate,
  IsNumber,
} from 'class-validator';
import { TaskStatus } from '../entity/task-status.enum';
import { TaskPriority } from '../entity/task-priority.enum';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;

  @IsEnum(TaskPriority)
  @IsOptional()
  priority?: TaskPriority;

  @IsDate()
  @IsOptional()
  dueDate?: Date;

  @IsNumber()
  @IsOptional()
  ownerId?: number;
}
