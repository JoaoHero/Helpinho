import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Helpinho } from '../types/helpinho';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HelpinhosListService {
    private url = environment.helpinhoRouter;
  
    constructor(private httpClient: HttpClient) {}
  
    // Método para buscar os dados
    getHelpinhos(): Observable<Helpinho> {
      return this.httpClient.get<Helpinho>(`${this.url}/helpinhos`);
    }
  }