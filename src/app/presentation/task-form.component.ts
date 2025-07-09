import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task, TaskStatus, CreateTaskRequest, UpdateTaskRequest } from '../domain/task.model';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule]
})
export class TaskFormComponent implements OnInit {
  @Input() task: Task | null = null;

  form: FormGroup;
  statusOptions = [
    { label: 'Pendente', value: TaskStatus.PENDING },
    { label: 'Em Progresso', value: TaskStatus.IN_PROGRESS },
    { label: 'Concluída', value: TaskStatus.COMPLETED }
  ];

  constructor(private fb: FormBuilder, private modalCtrl: ModalController) {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      status: [TaskStatus.PENDING, Validators.required]
    });
  }

  ngOnInit() {
    if (this.task) {
      this.form.patchValue({
        title: this.task.title,
        description: this.task.description,
        status: this.task.status
      });
    }
  }

  submit() {
    if (this.form.valid) {
      this.modalCtrl.dismiss({ save: this.form.value });
    } else {
      this.form.markAllAsTouched();
    }
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
} 