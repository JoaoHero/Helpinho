import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CreatedHelpinho } from '../types/createdHelpinho';
import { Observable } from 'rxjs';
import { AuthService } from './authToken.service';

@Injectable({
    providedIn: 'root'
})
export class CreateHelpinhoService {
    private url = environment.helpinhoRouter;
  
    constructor(
        private httpClient: HttpClient,
        private authService: AuthService
    ) {}
  
    // Método para realizar o login
    createHelpinho(createdHelpinho: CreatedHelpinho): Observable<any> {
        const token = this.authService.getToken()
        return this.httpClient.post<any>(`${this.url}/createHelpinho`, createdHelpinho, {
            headers: new HttpHeaders({
                Authorization: `Bearer ${token}`
            })
        });
    }
}