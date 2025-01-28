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
      return {
        todo: [],
        inProgress: [],
        done: []
      };
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
}