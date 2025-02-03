import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  constructor(private router: Router) {}

  goToHome(): void {
    
  }

  goToBoards(): void {
    this.router.navigate(['/myboards']);
  }
}