import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Task } from '../../models/task.model';
import { TaskCardComponent } from '../task-card/task-card.component';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-kanban-board',
  standalone: true,
  imports: [CommonModule, DragDropModule, TaskCardComponent, FormsModule],
  templateUrl: './kanban-board.component.html'
})
export class KanbanBoardComponent implements OnInit {
  todo: Task[] = [];
  inProgress: Task[] = [];
  done: Task[] = [];
  isModalOpen: boolean = false;
  newTask: Partial<Task> = {
    title: '',
    description: '',
    priority: 'low',
    assignee: '',
    dueDate: new Date(),
    tags: []
  };
  tag: string = ''; // For binding the tag input

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks();
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      // Update the status of the moved task
      const movedTask = event.container.data[event.currentIndex];
      switch (event.container.id) {
        case 'todoList':
          movedTask.status = 'todo';
          break;
        case 'inProgressList':
          movedTask.status = 'inProgress';
          break;
        case 'doneList':
          movedTask.status = 'done';
          break;
        default:
          break;
      }
    }
    this.saveTasks();
  }

  saveTasks() {
    const tasks = {
      todo: this.todo,
      inProgress: this.inProgress,
      done: this.done
    };
    this.taskService.saveTasks(tasks);
  }

  loadTasks() {
    const tasks = this.taskService.getTasks();
    this.todo = tasks.todo;
    this.inProgress = tasks.inProgress;
    this.done = tasks.done;
  }

  deleteTask(task: Task) {
    this.todo = this.todo.filter(t => t.id !== task.id);
    this.inProgress = this.inProgress.filter(t => t.id !== task.id);
    this.done = this.done.filter(t => t.id !== task.id);
    this.saveTasks();
  }

  openModal() {
    this.isModalOpen = true;
    this.newTask = {
      title: '',
      description: '',
      priority: 'low',
      assignee: '',
      dueDate: new Date(),
      tags: []
    };
    this.tag = '';
  }

  closeModal() {
    this.isModalOpen = false;
  }

  saveTask() {
    if (!this.newTask.title?.trim() || !this.newTask.assignee?.trim() || !this.newTask.dueDate) {
      // Optionally, add user feedback for validation
      return;
    }

    const task: Task = {
      id: this.generateUniqueId(),
      title: this.newTask.title.trim(),
      description: this.newTask.description?.trim() || '',
      priority: this.newTask.priority as 'low' | 'medium' | 'high',
      status: 'todo',
      createdAt: new Date(),
      dueDate: new Date(this.newTask.dueDate),
      assignee: this.newTask.assignee.trim(),
      tags: this.newTask.tags || []
    };

    this.todo.push(task);
    this.saveTasks();
    this.closeModal();
  }

  addTag() {
    const newTag = this.tag.trim();
    if (newTag && !this.newTask.tags?.includes(newTag)) {
      this.newTask.tags?.push(newTag);
    }
    this.tag = '';
  }

  removeTag(tagToRemove: string) {
    if (this.newTask.tags) {
      this.newTask.tags = this.newTask.tags.filter(tag => tag !== tagToRemove);
    }
  }

  private generateUniqueId(): string {
    return Date.now().toString();
  }
}