import { Routes } from '@angular/router';
import { MyBoardsComponent } from './components/my-boards/my-boards.component';
import { KanbanBoardComponent } from './components/kanban-board/kanban-board.component';

export const routes: Routes = [
{  path: 'myboards', component: MyBoardsComponent},
{  path: 'board/:id', component: KanbanBoardComponent},
{  path: '', redirectTo: '/myboards', pathMatch: 'full'},
{  path: 'kanban-board', component: KanbanBoardComponent}
];