import { Injectable } from '@angular/core';
import { Board } from '../models/board.model';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private readonly STORAGE_KEY = 'kanban_boards';
  private readonly OLD_STORAGE_KEY = 'tasks'; // Chave antiga do localStorage

  constructor() {
    this.migrateOldTasks();
    this.initializeDefaultBoard();
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

  private initializeDefaultBoard(): void {
    const boards = this.getBoards();
    if (boards.length === 0) {
      const defaultBoard: Board = {
        id: '1',
        title: 'Meu Primeiro Board',
        description: 'Board padrão do sistema',
        tasks: {
          todo: [],
          inProgress: [],
          done: []
        }
      };
      this.saveBoard(defaultBoard);
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