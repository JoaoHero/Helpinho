import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { User } from '../types/user';
import { Observable } from 'rxjs';
import { RegisterCredentials } from '../types/registerCredentials';

@Injectable({
    providedIn: 'root'
})
export class RegisterService {
    private url = environment.helpinhoRouter;
  
    constructor(private httpClient: HttpClient) {}
  
    // Método para realizar o login
    register(credentials: RegisterCredentials): Observable<User> {
        return this.httpClient.post<User>(`${this.url}/register`, credentials, { withCredentials: true });
    }
}