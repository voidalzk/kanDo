import { Task } from './task.model';

export interface Board {
    id: string;
    title: string;
    description: string;
    tasks: {
      todo: Task[];
      inProgress: Task[];
      done: Task[];
    };
  }