import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { User } from '../types/user';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class LoginService {
    private url = environment.helpinhoRouter;
  
    constructor(private httpClient: HttpClient) {}
  
    // Método para realizar o login
    login(credentials: { email: string; password: string }): Observable<User> {
        return this.httpClient.post<User>(`${this.url}/login`, credentials, { withCredentials: true });
    }
}