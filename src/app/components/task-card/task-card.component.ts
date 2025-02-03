import { Component, Input, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-card.component.html'
})
export class TaskCardComponent {
  @Input() task!: Task;
  @Output() delete = new EventEmitter<Task>();
  @Output() edit = new EventEmitter<Task>();

  isMenuOpen: boolean = false;

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isMenuOpen = false;
    }
  }

  getPriorityClass(): string {
    const baseClasses = 'px-3 py-1 text-xs font-medium rounded-full';
    switch (this.task.priority) {
      case 'low':
        return `${baseClasses} bg-green-50 text-green-700 border border-green-200`;
      case 'medium':
        return `${baseClasses} bg-yellow-50 text-yellow-700 border border-yellow-200`;
      case 'high':
        return `${baseClasses} bg-red-50 text-red-700 border border-red-200`;
      default:
        return `${baseClasses} bg-gray-50 text-gray-700 border border-gray-200`;
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

  toggleMenu(event: Event): void {
    event.stopPropagation();
    this.isMenuOpen = !this.isMenuOpen;
  }

  confirmDelete(): void {
    if (confirm('Você tem certeza que deseja excluir esta tarefa?')) {
      this.delete.emit(this.task);
    }
  }
}