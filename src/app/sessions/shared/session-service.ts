import { Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { SessionMock } from './session-mock';
import { Session } from './session.model';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private _sessions = signal<Session[]>([]);
  private _session = signal<Session|null>(null);

  public get session() : WritableSignal<Session|null> {
    return this._session;
  }

  public get sessions() : WritableSignal<Session[]> {
    return this._sessions;
  }

  constructor(){
    if(new SessionMock()){
      this._sessions.set(JSON.parse(localStorage.getItem('sessions')!));
    }
  }

  public show(id: string): void {
    this._session.set(this._sessions().find(session => session.id === id)!);
  }

  public create(session: Session): void {
    session.id = crypto.randomUUID();
    this._sessions.update(sessions => [...sessions, session]);
    localStorage.setItem('sessions', JSON.stringify(this._sessions()));
  }

  public destroy(id: string): void {
    this._sessions.update(sessions => sessions.filter(session => session.id !== id));
    localStorage.setItem('sessions', JSON.stringify(this._sessions()));
  }
}
