import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  get currentUserName(): string {
    const user = this.authService.getCurrentUser();
    return user ? user.name : '';
  }

  goToBoards(): void {
    this.router.navigate(['/myboards']);
  }

  login(): void {
    this.router.navigate(['/login']);
  }

  logout(): void {
    this.authService.logout();
  }
}