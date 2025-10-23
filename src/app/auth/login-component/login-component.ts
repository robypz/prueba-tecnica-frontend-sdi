import { Component, computed, effect, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../shared/auth-service';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-login-component',
  imports: [ReactiveFormsModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.scss'
})
export class LoginComponent {
  private authService = inject(AuthService);
  private _user = computed(() => this.authService.user());


  public get user() : User {
    return this._user() as User;
  }

  constructor(){
    effect(() => {
      console.log(this.user);
    })
  }



  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  onSubmit(){
    this.authService.login(this.loginForm.value as User);
  }
}
