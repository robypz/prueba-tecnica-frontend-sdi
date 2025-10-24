import { Injectable, signal, WritableSignal } from '@angular/core';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user = signal<User | null>(null);
  private _token = signal<string | null>(null);

  public get user(): WritableSignal<User | null> {
    return this._user;
  }

    public get token(): WritableSignal<string | null> {
    return this._token;
  }

  constructor(){
    if (localStorage.getItem('user') && localStorage.getItem('token')) {
      this._user.set(JSON.parse(localStorage.getItem('user')!));
      this._token.set(localStorage.getItem('token')!);
    }
    console.log(this._user());
  }

  public login(user: User): void {
    if (user.email.endsWith("sdi.es")) {
      user.role = "admin";
      user.name = "Admin";
      this.user.set(user);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", crypto.randomUUID());
    } else {
      user.role = "user";
      user.name = "User";
      this.user.set(user);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", crypto.randomUUID());
    }
  }

  public logout(): void {
    this.user.set(null);
  }

  public hasRole(role: string): boolean {
    return this._user()?.role === role;
  }

}
