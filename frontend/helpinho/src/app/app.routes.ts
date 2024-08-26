import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LoggedInGuard } from './LoggedInGuard.guard';
import { HelpinhoComponent } from './components/helpinho/helpinho.component';
import { CreateHelpinhoComponent } from './components/create-helpinho/create-helpinho.component';
import { DonateComponent } from './components/donate/donate.component';
import { AuthGuard } from './auth.guard';
import { HelpinhoListComponent } from './components/helpinho-list/helpinho-list.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'login',
        component: LoginComponent, canActivate: [LoggedInGuard]
    },
    {
        path: 'register',
        component: RegisterComponent, canActivate: [LoggedInGuard]
    },
    {
        path: 'search',
        component: HelpinhoListComponent
    },
    {
        path: 'helpinho/:id',
        component: HelpinhoComponent
    },
    {
        path: 'donate/:id',
        component: DonateComponent, canActivate: [AuthGuard]
    },
    {
        path: 'createHelpinho',
        component: CreateHelpinhoComponent, canActivate: [AuthGuard]
    }
];