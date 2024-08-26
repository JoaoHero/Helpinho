import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthResponse } from '../types/AuthResponse';
import { User } from '../types/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = environment.helpinhoRouter;
  
  private tokenKey = 'token';
  private authStatusSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient) {
    this.checkToken(); // Verifica o token ao inicializar o serviço
  }

  // Método para obter o token da sessionStorage
  getToken(): string | null {
    return sessionStorage.getItem(this.tokenKey);
  }

  // Método para validar o token
  private checkToken(): void {
    const token = this.getToken();

    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      });

      this.http.post<AuthResponse>(`${this.url}/verifyToken`, {}, { headers }).subscribe(
        response => {
          // Se a requisição for bem-sucedida, atualiza o estado com o usuário
          this.authStatusSubject.next(response.user);
        },
        error => {
          // Se ocorrer um erro, loga o erro e atualiza o estado para null
          console.error('Token validation error:', error);
          // Garantindo que a seção do token esteja vazia quando o token ficar inválido
          sessionStorage.clear()
          this.authStatusSubject.next(null);
        }
      );
    } else {
      // Se não houver token, atualiza o estado para null
      this.authStatusSubject.next(null);
    }
  }

  // Observable para o status de autenticação
  getAuthStatus(): Observable<User | null> {
    return this.authStatusSubject.asObservable();
  }

  // Método para atualizar o token
  updateToken(token: string): void {
    sessionStorage.setItem(this.tokenKey, token);
    this.checkToken(); // Revalida o token após a atualização
  }

  // Método para fazer logout
  logout(): void {
    sessionStorage.removeItem(this.tokenKey);
    this.authStatusSubject.next(null);

    window.location.href = '/';
  }
}