import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TASK_REPOSITORY } from './contracts/task-repository.contract';
import type { TaskRepositoryContract } from './contracts/task-repository.contract';
import { TaskDto } from './dto/task.dto';
import { FindTasksDto } from './dto/find-tasks.dto';
import { Task } from './entity/task.domain';
import { TaskStatus } from './entity/task-status.enum';
import { TaskPriority } from './entity/task-priority.enum';

@Injectable()
export class TasksService {
  constructor(
    @Inject(TASK_REPOSITORY)
    private readonly taskRepository: TaskRepositoryContract,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<TaskDto> {
    const task = new Task(
      null,
      createTaskDto.title,
      createTaskDto.description ?? null,
      createTaskDto.status || TaskStatus.PENDING,
      createTaskDto.priority || TaskPriority.MEDIUM,
      createTaskDto.dueDate ?? null,
      createTaskDto.ownerId,
    );

    const savedTask = await this.taskRepository.save(task);
    return this.toDto(savedTask);
  }

  async findAll(findTasksDto: FindTasksDto): Promise<TaskDto[]> {
    const tasks = await this.taskRepository.findAll(findTasksDto);
    return tasks.map((task) => this.toDto(task));
  }

  async findOne(id: number): Promise<TaskDto> {
    const task = await this.taskRepository.findById(id);
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return this.toDto(task);
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<TaskDto> {
    const task = await this.taskRepository.findById(id);

    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    Object.assign(task, updateTaskDto);

    const updatedTask = await this.taskRepository.save(task);
    return this.toDto(updatedTask);
  }

  async remove(id: number): Promise<void> {
    await this.taskRepository.delete(id);
  }

  private toDto(task: Task): TaskDto {
    return <TaskDto>{
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate,
      ownerId: task.ownerId,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    };
  }
}
