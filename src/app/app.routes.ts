import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login-component/login-component';
import { CalendarComponent } from './sessions/calendar-component/calendar-component';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login',component: LoginComponent},
  {path: 'sessions/calendar',component: CalendarComponent, canActivate: [authGuard]},

];
