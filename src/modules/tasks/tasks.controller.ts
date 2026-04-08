import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskDto } from './dto/task.dto';
import { FindTasksDto } from './dto/find-tasks.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto): Promise<TaskDto> {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  findAll(@Query() findTasksDto: FindTasksDto): Promise<TaskDto[]> {
    return this.tasksService.findAll(findTasksDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<TaskDto> {
    return this.tasksService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<TaskDto> {
    return this.tasksService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.tasksService.remove(+id);
  }
}
