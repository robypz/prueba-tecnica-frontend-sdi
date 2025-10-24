import { Component, computed, effect, inject } from '@angular/core';
import { MenuComponent } from "../../shared/components/menu-component/menu-component";
import { SessionService } from '../shared/session-service';
import { SessionCreateComponent } from "../session-create-component/session-create-component";

@Component({
  selector: 'app-calendar-component',
  imports: [MenuComponent, SessionCreateComponent],
  templateUrl: './calendar-component.html',
  styleUrl: './calendar-component.scss'
})
export class CalendarComponent {
  private sessionService = inject(SessionService);
  private _sessions = computed(() => this.sessionService.sessions());

  get sessions() {
    return this._sessions();
  }

  constructor(){
    effect(() => {
      console.log(this.sessions);
    });
  }
}
