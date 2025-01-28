export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'inProgress' | 'done';
  createdAt: Date;
  dueDate: Date;
  assignee: string;
  tags: string[];
}