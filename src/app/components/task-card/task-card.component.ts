import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div class="flex justify-between items-start mb-2">
        <h3 class="text-lg font-medium text-gray-900">{{ task.title }}</h3>
        <button 
          class="text-red-500 hover:text-red-700 focus:outline-none"
          (click)="onDelete()"
        >
          <span class="material-icons">delete</span>
        </button>
        <span [class]="getPriorityClass()">
          {{ task.priority }}
        </span>
      </div>
      <p class="text-sm text-gray-600 mb-3">{{ task.description }}</p>
      <div class="flex flex-wrap gap-2 mb-3">
        <span 
          *ngFor="let tag of task.tags"
          class="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800"
        >
          {{ tag }}
        </span>
      </div>
      <div class="flex justify-between items-center text-sm text-gray-500">
        <span>{{ task.assignee }}</span>
        <span>Due: {{ task.dueDate | date:'mediumDate' }}</span>
      </div>
    </div>
  `
})
export class TaskCardComponent {
  @Input() task!: Task;
  @Output() delete = new EventEmitter<Task>();

  getPriorityClass(): string {
    const baseClasses = 'px-2 py-1 text-xs font-medium rounded-full ';
    switch (this.task.priority) {
      case 'high':
        return baseClasses + 'bg-red-100 text-red-800';
      case 'medium':
        return baseClasses + 'bg-yellow-100 text-yellow-800';
      case 'low':
        return baseClasses + 'bg-green-100 text-green-800';
      default:
        return baseClasses + 'bg-gray-100 text-gray-800';
    }
  }

  onDelete(): void {
    this.delete.emit(this.task);
  }
}