import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css']
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