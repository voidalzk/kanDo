import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { KanbanBoardComponent } from './components/kanban-board/kanban-board.component';
import { HeaderComponent } from './material/header/header.component';
import { FooterComponent } from './material/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    KanbanBoardComponent,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'kanban-board';
}