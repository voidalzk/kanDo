import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private storageKey = 'kanbanTasks';

  getTasks(): { todo: Task[]; inProgress: Task[]; done: Task[] } {
    const tasks = localStorage.getItem(this.storageKey);
    if (tasks) {
      const parsed = JSON.parse(tasks);
      return {
        todo: this.convertTasks(parsed.todo),
        inProgress: this.convertTasks(parsed.inProgress),
        done: this.convertTasks(parsed.done)
      };
    } else {
      const defaultTasks = this.getDefaultTasks();
      this.saveTasks(defaultTasks);
      return defaultTasks;
    }
  }

  saveTasks(tasks: { todo: Task[]; inProgress: Task[]; done: Task[] }): void {
    localStorage.setItem(this.storageKey, JSON.stringify(tasks));
  }

  private convertTasks(tasks: any[]): Task[] {
    return tasks.map(task => ({
      ...task,
      createdAt: new Date(task.createdAt),
      dueDate: new Date(task.dueDate)
    }));
  }

  private getDefaultTasks(): { todo: Task[]; inProgress: Task[]; done: Task[] } {
    return {
      todo: [
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
      ],
      inProgress: [
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
      ],
      done: [
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
      ]
    };
  }
}