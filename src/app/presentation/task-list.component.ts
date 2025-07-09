import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController, ToastController, AlertController } from '@ionic/angular';
import { Task, TaskStatus } from '../domain/task.model';
import { TaskService } from '../application/task.service';
import { Observable } from 'rxjs';
import { TaskFormComponent } from './task-form.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class TaskListComponent implements OnInit {
  tasks$: Observable<Task[]>;
  loading = false;
  error: string | null = null;

  constructor(
    private taskService: TaskService,
    private modalController: ModalController,
    private toastController: ToastController,
    private alertController: AlertController
  ) {
    this.tasks$ = this.taskService.tasks$;
  }

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.loading = true;
    this.error = null;
    this.taskService.loadTasks().subscribe({
      next: (tasks) => {
        this.taskService.updateTasksList(tasks);
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Erro ao carregar tarefas. Tente novamente.';
        this.loading = false;
        this.showToast(this.error, 'danger');
      }
    });
  }

  async showToast(message: string, color: string = 'primary') {
    const toast = await this.toastController.create({
      message,
      color,
      duration: 2500,
      position: 'bottom',
    });
    toast.present();
  }

  async openCreateTaskModal() {
    const modal = await this.modalController.create({
      component: TaskFormComponent,
      componentProps: { task: null },
      breakpoints: [0, 0.7, 1],
      initialBreakpoint: 0.7,
      backdropDismiss: true
    });
    modal.onDidDismiss().then((result) => {
      if (result.data && result.data.save) {
        this.createTask(result.data.save);
      }
    });
    await modal.present();
  }

  async openEditTaskModal(task: Task) {
    const modal = await this.modalController.create({
      component: TaskFormComponent,
      componentProps: { task: task },
      breakpoints: [0, 0.7, 1],
      initialBreakpoint: 0.7,
      backdropDismiss: true
    });
    modal.onDidDismiss().then((result) => {
      if (result.data && result.data.save) {
        this.updateTask(task.id, result.data.save);
      }
    });
    await modal.present();
  }

  createTask(taskData: any) {
    this.loading = true;
    this.taskService.createTask(taskData).subscribe({
      next: (task) => {
        this.loadTasks();
        this.showToast('Tarefa criada com sucesso!', 'success');
      },
      error: (err) => {
        this.showToast('Erro ao criar tarefa.', 'danger');
        this.loading = false;
      }
    });
  }

  updateTask(id: number, taskData: any) {
    this.loading = true;
    this.taskService.updateTask(id, taskData).subscribe({
      next: (task) => {
        this.loadTasks();
        this.showToast('Tarefa atualizada com sucesso!', 'success');
      },
      error: (err) => {
        this.showToast('Erro ao atualizar tarefa.', 'danger');
        this.loading = false;
      }
    });
  }

  async confirmDeleteTask(task: Task) {
    const alert = await this.alertController.create({
      header: 'Confirmar Exclusão',
      message: `Tem certeza que deseja excluir a tarefa "${task.title}"?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Excluir',
          role: 'destructive',
          handler: () => {
            this.deleteTask(task.id);
          }
        }
      ]
    });
    await alert.present();
  }

  deleteTask(id: number) {
    this.loading = true;
    this.taskService.deleteTask(id).subscribe({
      next: () => {
        this.loadTasks();
        this.showToast('Tarefa excluída com sucesso!', 'success');
      },
      error: (err) => {
        this.showToast('Erro ao excluir tarefa.', 'danger');
        this.loading = false;
      }
    });
  }

  async changeTaskStatus(task: Task) {
    const statusOptions = [
      { label: 'Pendente', value: TaskStatus.PENDING },
      { label: 'Em Progresso', value: TaskStatus.IN_PROGRESS },
      { label: 'Concluída', value: TaskStatus.COMPLETED }
    ];

    const alert = await this.alertController.create({
      header: 'Mudar Status',
      message: 'Selecione o novo status:',
      inputs: statusOptions.map(option => ({
        type: 'radio',
        label: option.label,
        value: option.value,
        checked: task.status === option.value
      })),
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Confirmar',
          handler: (selectedStatus) => {
            if (selectedStatus && selectedStatus !== task.status) {
              this.updateTask(task.id, { status: selectedStatus });
            }
          }
        }
      ]
    });
    await alert.present();
  }

  getStatusLabel(status: TaskStatus): string {
    return this.taskService.getStatusLabel(status);
  }

  getStatusColor(status: TaskStatus): string {
    return this.taskService.getStatusColor(status);
  }
} 