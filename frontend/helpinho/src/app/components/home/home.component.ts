import { Component, OnInit } from '@angular/core';
import { HomeApresentationComponent } from '../home-apresentation/home-apresentation.component';
import { FlowComponent } from '../flow/flow.component';
import { SearchInput } from '../search-input/searchInput.component';
import { HelpinhoListComponent } from '../helpinho-list/helpinho-list.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HomeUserApresentationComponent } from '../home-user-apresentation/home-user-apresentation.component';
import { AuthService } from '../../services/authToken.service';
import { User } from '../../types/user';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,HttpClientModule,HomeApresentationComponent,HomeUserApresentationComponent,FlowComponent,SearchInput,HelpinhoListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  user: User | null = null;
  isAuthenticated: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getAuthStatus().subscribe(user => {
      if (user != undefined) {
        this.user = user;
        this.isAuthenticated = true;
      }
    });
  }
}
