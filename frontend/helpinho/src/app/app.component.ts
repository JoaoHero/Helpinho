import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { HelpinhosListService } from './services/helpinhosList.service';
import { FooterComponent } from './components/footer/footer.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginService } from './services/login.service';
import { RegisterService } from './services/register.service';
import { HelpinhoService } from './services/helpinho.service';
import { AuthService } from './services/authToken.service';
import { DonateService } from './services/donate.service';
import { CreateHelpinhoService } from './services/createHelpinho.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HttpClientModule,HeaderComponent,FooterComponent,CommonModule],
  providers: [AuthService,HelpinhosListService,LoginService,RegisterService,HelpinhoService,DonateService,CreateHelpinhoService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'helpinho';

  constructor(public router: Router) {}
}
