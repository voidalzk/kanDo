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
  @Output() edit = new EventEmitter<Task>();

  isMenuOpen: boolean = false;

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

  // Função para obter o texto de prioridade em português
  getPriorityText(): string {
    switch (this.task.priority) {
      case 'high':
        return 'Alta';
      case 'medium':
        return 'Média';
      case 'low':
        return 'Baixa';
      default:
        return 'Indefinida';
    }
  }

  onDelete(): void {
    this.delete.emit(this.task);
  }

  onEdit(): void {
    this.edit.emit(this.task);
    this.isMenuOpen = false;
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  confirmDelete(): void {
    if (confirm('Você tem certeza que deseja excluir esta tarefa?')) {
      this.delete.emit(this.task);
    }
  }
}