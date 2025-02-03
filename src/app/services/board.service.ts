import { Injectable } from '@angular/core';
import { Board } from '../models/board.model';

const DEFAULT_BOARD_DATA = {
  id: '1',
  title: 'Meu Primeiro Board',
  description: 'Board padrão do sistema',
  tasks: {
    todo: [
      {
        id: "1738095633334",
        title: "Estilização e Dark Mode Completos",
        description: "Criar o dark mode e estilizar o website para que aparente modernidade",
        priority: "medium",
        status: "todo",
        createdAt: "2025-01-28T20:20:33.334Z",
        dueDate: "2025-02-04T00:00:00.000Z",
        assignee: "Eu",
        tags: ["front-end", "design"]
      },
      {
        id: "1738095721624",
        title: "Pagina de Boards",
        description: "Pagina Principal com os seus Boards e a opção de criar mais boards",
        priority: "medium",
        status: "todo",
        createdAt: "2025-01-28T20:22:01.624Z",
        dueDate: "2025-02-05T00:00:00.000Z",
        assignee: "Eu",
        tags: ["front-end", "design"]
      },
      {
        id: "1738105867175",
        title: "Implementar Login e Autentificação",
        description: "Tela Inicial, com opções de login e registro, guards para login, e assoçiação de boards e tasks por ID, LocalStorage por enquanto.",
        priority: "high",
        status: "todo",
        createdAt: "2025-01-28T23:11:07.175Z",
        dueDate: "2025-02-05T00:00:00.000Z",
        assignee: "Eu",
        tags: ["front-end"]
      }
    ],
    inProgress: [
      {
        id: "2",
        title: "Design dashboard",
        description: "Create mockups for the user dashboard",
        priority: "medium",
        status: "inProgress",
        createdAt: "2025-01-28T19:15:43.428Z",
        dueDate: "2024-05-10T03:00:00.000Z",
        assignee: "Alice Johnson",
        tags: ["design"]
      }
    ],
    done: [
      {
        id: "4",
        title: "Project setup",
        description: "Initialize Angular project with required dependencies",
        priority: "low",
        status: "done",
        createdAt: "2025-01-28T19:15:43.428Z",
        dueDate: "2024-03-20T03:00:00.000Z",
        assignee: "Jane Smith",
        tags: ["setup"]
      }
    ]
  }
};

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private readonly STORAGE_KEY = 'kanban_boards';
  private readonly OLD_STORAGE_KEY = 'tasks'; // Chave antiga do localStorage

  constructor() {
    this.migrateOldTasks();
    this.initializeStorage();
  }

  private migrateOldTasks(): void {
    const oldTasks = localStorage.getItem(this.OLD_STORAGE_KEY);
    if (oldTasks) {
      const tasks = JSON.parse(oldTasks);
      const defaultBoard: Board = {
        id: '1',
        title: 'Meu Primeiro Board',
        description: 'Board padrão do sistema',
        tasks: tasks // Migra as tasks antigas
      };
      
      this.saveBoard(defaultBoard);
      // Remove as tasks antigas do localStorage
      localStorage.removeItem(this.OLD_STORAGE_KEY);
    }
  }

  private initializeStorage(): void {
    const existingBoards = localStorage.getItem(this.STORAGE_KEY);
    
    if (!existingBoards) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify([DEFAULT_BOARD_DATA]));
    }
  }

  getBoards(): Board[] {
    const boards = localStorage.getItem(this.STORAGE_KEY);
    return boards ? JSON.parse(boards) : [];
  }

  getBoardById(id: string): Board | undefined {
    const boards = this.getBoards();
    return boards.find(board => board.id === id);
  }

  saveBoard(board: Board): void {
    const boards = this.getBoards();
    const existingBoardIndex = boards.findIndex(b => b.id === board.id);
    
    if (existingBoardIndex >= 0) {
      boards[existingBoardIndex] = board;
    } else {
      boards.push(board);
    }
    
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(boards));
  }

  createNewBoard(title: string, description: string): Board {
    const newBoard: Board = {
      id: Date.now().toString(),
      title,
      description,
      tasks: {
        todo: [],
        inProgress: [],
        done: []
      }
    };
    
    this.saveBoard(newBoard);
    return newBoard;
  }

  deleteBoard(id: string): void {
    let boards = this.getBoards();
    boards = boards.filter(board => board.id !== id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(boards));
  }
}