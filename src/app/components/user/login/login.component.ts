import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  goToRegister(): void {
    this.router.navigate(['/register']);
  }

  onSubmit(): void {
    if (!this.email || !this.password) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    if (this.authService.login(this.email, this.password)) {
      this.router.navigate(['/myboards']);
    } else {
      this.errorMessage = 'Invalid email or password';
    }
  }
}