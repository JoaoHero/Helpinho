import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {
  constructor(private router: Router,) {}

  canActivate(): boolean {
    const token = sessionStorage.getItem('token');
    if (token) {
      // Usuário já autenticado, redireciona para a home
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}