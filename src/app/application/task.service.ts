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

  getStatusLabel(status: string): string {
    switch (status) {
      case 'pending':
        return 'Pendente';
      case 'in_progress':
        return 'Em Progresso';
      case 'completed':
        return 'Concluída';
      default:
        return 'Desconhecido';
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'in_progress':
        return 'primary';
      case 'completed':
        return 'success';
      default:
        return 'medium';
    }
  }
} 