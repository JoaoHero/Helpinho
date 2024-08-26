import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private toastr: ToastrService,
  ) {}

  canActivate(): boolean {
    const token = sessionStorage.getItem('token');
    if (token) {
      // Usuário autenticado, permite acesso
      return true;
    }
    
    // Usuário não autenticado, redireciona para a página de login
    this.toastr.error("Para prosseguir, é necessário estar logado")
    this.router.navigate(['/login']);
    return false;
  }
}