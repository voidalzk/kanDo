import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BoardService } from '../../services/board.service';
import { Board } from '../../models/board.model';

@Component({
  selector: 'app-my-boards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-boards.component.html'
})
export class MyBoardsComponent implements OnInit {
  boards: Board[] = [];

  constructor(
    private router: Router,
    private boardService: BoardService
  ) {}

  ngOnInit(): void {
    this.loadBoards();
  }

  loadBoards(): void {
    this.boards = this.boardService.getBoards();
  }

  openBoard(boardId: string): void {
    this.router.navigate(['/board', boardId]);
  }

  createNewBoard(): void {
    const newBoard = this.boardService.createNewBoard(
      'Novo Board',
      'Descrição do novo board'
    );
    this.boards = this.boardService.getBoards();
    this.router.navigate(['/board', newBoard.id]);
  }

  deleteBoard(id: string): void {
    if (confirm('Tem certeza que deseja excluir este board?')) {
      this.boardService.deleteBoard(id);
      this.loadBoards();
    }
  }
}
