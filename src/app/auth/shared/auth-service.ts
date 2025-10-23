import { Injectable, signal, WritableSignal } from '@angular/core';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user = signal<User | null>(null);


  public get user(): WritableSignal<User | null> {
    return this._user;
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

}
