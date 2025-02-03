import { Routes } from '@angular/router';
import { MyBoardsComponent } from './components/my-boards/my-boards.component';
import { KanbanBoardComponent } from './components/kanban-board/kanban-board.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './components/user/home/home.component';

export const routes: Routes = [
  { path: 'myboards', component: MyBoardsComponent, canActivate: [AuthGuard] },
  { path: 'board/:id', component: KanbanBoardComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'kanban-board', component: KanbanBoardComponent, canActivate: [AuthGuard] }
];