import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/authToken.service';
import { User } from '../../types/user';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  user: User | null = null;
  isAuthenticated: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getAuthStatus().subscribe(user => {
      if (user != undefined) {
        this.isAuthenticated = true;
        this.user = user
      }
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
