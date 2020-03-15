import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { Task, Tasktatus } from "./task.model";
import { CreateTaskDto } from "./dto/create-task-dto";
import { GetTasksFilterDto } from "./dto/get-task-filter.dto";

@Controller("tasks")
export class TaskController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
      if(Object.keys(filterDto).length) {
        return this.tasksService.getTaskWithFilters(filterDto);
      } else {
        return this.tasksService.getAllTasks();
      }
  }

  @Get("/:id")
  getTaskById(@Param("id") id: string) {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  cretaeTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }

  @Delete("/:id")
  deleteTask(@Param("id") id: string): void {
    this.tasksService.deleteTask(id);
  }
  @Patch("/:id/status")
  updateTaskStatus(@Param("id") id: string, @Body("status") stauts: Tasktatus) {
      return this.tasksService.updateTaskStatus(id,stauts);
  }
}
