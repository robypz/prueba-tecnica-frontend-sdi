import { Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { SessionMock } from './session-mock';
import { Session } from './session.model';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private _sessions = signal<Session[]>([]);


  public get sessions() : WritableSignal<Session[]> {
    return this._sessions;
  }

  constructor(){
    if(new SessionMock()){
      this._sessions.set(JSON.parse(localStorage.getItem('sessions')!));
    }
  }
}
