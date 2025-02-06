import { Injectable } from '@angular/core';
import { Router, type CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
        this.router.navigate(['/myboards']);
      return false;
    }
    return true;
  }
}