import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Task } from '../../models/task.model';
import { TaskCardComponent } from '../task-card/task-card.component';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-kanban-board',
  standalone: true,
  imports: [CommonModule, DragDropModule, TaskCardComponent],
  templateUrl: './kanban-board.component.html' // Changed from inline template
})
export class KanbanBoardComponent implements OnInit {
  todo: Task[] = [];
  inProgress: Task[] = [];
  done: Task[] = [];

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
    const hasStoredTasks = tasks.todo.length || tasks.inProgress.length || tasks.done.length;

    if (hasStoredTasks) {
      this.todo = tasks.todo;
      this.inProgress = tasks.inProgress;
      this.done = tasks.done;
    } else {
      this.todo = [
        {
          id: '1',
          title: 'Implement authentication',
          description: 'Add user login and registration functionality',
          priority: 'high',
          status: 'todo',
          createdAt: new Date(),
          dueDate: new Date(2024, 3, 15),
          assignee: 'John Doe',
          tags: ['frontend', 'UX']
        },
        {
          id: '3',
          title: 'Setup database',
          description: 'Create database schema and tables',
          priority: 'medium',
          status: 'todo',
          createdAt: new Date(),
          dueDate: new Date(2024, 3, 25),
          assignee: 'Alice Johnson',
          tags: ['backend']
        }
      ];

      this.inProgress = [
        {
          id: '2',
          title: 'Design dashboard',
          description: 'Create mockups for the user dashboard',
          priority: 'medium',
          status: 'inProgress',
          createdAt: new Date(),
          dueDate: new Date(2024, 4, 10),
          assignee: 'Alice Johnson',
          tags: ['design']
        },
        {
          id: '5',
          title: 'Implement user profile',
          description: 'Add user profile page with user details',
          priority: 'high',
          status: 'inProgress',
          createdAt: new Date(),
          dueDate: new Date(2024, 4, 15),
          assignee: 'John Doe',
          tags: ['frontend']
        }
      ];

      this.done = [
        {
          id: '4',
          title: 'Project setup',
          description: 'Initialize Angular project with required dependencies',
          priority: 'low',
          status: 'done',
          createdAt: new Date(),
          dueDate: new Date(2024, 2, 20),
          assignee: 'Jane Smith',
          tags: ['setup']
        }
      ];

      this.saveTasks();
    }
  }
}