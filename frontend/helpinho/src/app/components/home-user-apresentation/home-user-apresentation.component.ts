import { Component, OnInit } from '@angular/core';
import { User } from '../../types/user';
import { AuthService } from '../../services/authToken.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-user-apresentation',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home-user-apresentation.component.html',
  styleUrl: './home-user-apresentation.component.css'
})
export class HomeUserApresentationComponent implements OnInit {
  user: User | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getAuthStatus().subscribe(user => {
      if (user != undefined) { 
        this.user = user
      }
    });
  }
}
