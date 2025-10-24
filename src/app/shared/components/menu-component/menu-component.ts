import { Component, inject } from '@angular/core';
import { AuthService } from '../../../auth/shared/auth-service';
import { User } from '../../../auth/shared/user.model';

@Component({
  selector: 'app-menu-component',
  imports: [],
  templateUrl: './menu-component.html',
  styleUrl: './menu-component.scss'
})
export class MenuComponent {
  private authService = inject(AuthService);
  get user() {
    return this.authService.user() as User;
  }

  public logout() {
    this.authService.logout();
  }
}
