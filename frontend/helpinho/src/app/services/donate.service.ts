import { AuthService } from './authToken.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Donate } from '../types/donate';
import { DonationForm } from '../types/donationForm';

@Injectable({
    providedIn: 'root'
})
export class DonateService {
    private url = environment.helpinhoRouter;
  
    constructor(
        private httpClient: HttpClient,
        private authService: AuthService
    ) {}

    donate(helpinhoId: string, donateForm: DonationForm): Observable<Donate> {
        const token = this.authService.getToken()

        return this.httpClient.post<Donate>(`${this.url}/donate/${helpinhoId}`, donateForm , {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }
}