import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Task, CreateTaskRequest, UpdateTaskRequest, TaskStatus } from '../domain/task.model';
import { TaskApiService } from '../infrastructure/task-api.service';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  public tasks$ = this.tasksSubject.asObservable();

  constructor(private taskApiService: TaskApiService) {}

  loadTasks(): Observable<Task[]> {
    return this.taskApiService.getTasks();
  }

  createTask(task: CreateTaskRequest): Observable<Task> {
    return this.taskApiService.createTask(task);
  }

  updateTask(id: number, task: UpdateTaskRequest): Observable<Task> {
    return this.taskApiService.updateTask(id, task);
  }

  deleteTask(id: number): Observable<void> {
    return this.taskApiService.deleteTask(id);
  }

  getTask(id: number): Observable<Task> {
    return this.taskApiService.getTask(id);
  }

  updateTasksList(tasks: Task[]): void {
    this.tasksSubject.next(tasks);
  }

  getStatusLabel(status: TaskStatus): string {
    switch (status) {
      case TaskStatus.PENDING:
        return 'Pendente';
      case TaskStatus.IN_PROGRESS:
        return 'Em Progresso';
      case TaskStatus.COMPLETED:
        return 'Concluída';
      default:
        return 'Desconhecido';
    }
  }

  getStatusColor(status: TaskStatus): string {
    switch (status) {
      case TaskStatus.PENDING:
        return 'warning';
      case TaskStatus.IN_PROGRESS:
        return 'primary';
      case TaskStatus.COMPLETED:
        return 'success';
      default:
        return 'medium';
    }
  }
} 