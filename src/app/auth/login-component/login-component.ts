import { Component, computed, effect, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth-service';
import { User } from '../shared/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-component',
  imports: [ReactiveFormsModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.scss'
})
export class LoginComponent {
  private authService = inject(AuthService);
  private _user = computed(() => this.authService.user());
  private router = inject(Router);


  public get user(): User {
    return this._user() as User;
  }

  constructor() {
    effect(() => {
      if (this.user) {
        this.router.navigate(['sessions/calendar']);
      }
    })
  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  onSubmit() {
    this.authService.login(this.loginForm.value as User);
  }
}
