import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TaskListComponent } from './presentation/task-list.component';

@Component({
  selector: 'app-root',
  template: `
    <ion-app>
      <app-task-list></app-task-list>
    </ion-app>
  `,
  standalone: true,
  imports: [CommonModule, IonicModule, TaskListComponent]
})
export class AppComponent {} 