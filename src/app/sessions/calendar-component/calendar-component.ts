import { Component, computed, effect, inject } from '@angular/core';
import { MenuComponent } from "../../shared/components/menu-component/menu-component";
import { SessionService } from '../shared/session-service';
import { SessionCreateComponent } from "../session-create-component/session-create-component";
import {
  DateAdapter,
  provideCalendar,
  CalendarPreviousViewDirective,
  CalendarTodayDirective,
  CalendarNextViewDirective,
  CalendarMonthViewComponent,
  CalendarWeekViewComponent,
  CalendarDayViewComponent, CalendarEvent,
  CalendarView,
  CalendarDatePipe
} from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { Session } from '../shared/session.model';

@Component({
  selector: 'app-calendar-component',
  imports: [MenuComponent,
    SessionCreateComponent,
    CalendarPreviousViewDirective,
    CalendarTodayDirective,
    CalendarNextViewDirective,
    CalendarMonthViewComponent,
    CalendarWeekViewComponent,
    CalendarDayViewComponent,
    CalendarDatePipe
  ],
  providers: [
    provideCalendar({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  templateUrl: './calendar-component.html',
  styleUrl: './calendar-component.scss'
})
export class CalendarComponent {
  private sessionService = inject(SessionService);
  private _sessions = computed(() => this.sessionService.sessions());

  get sessions() {
    return this._sessions();
  }

  constructor() {
    effect(() => {
      console.log(this.sessions);
    });
  }

  readonly CalendarView = CalendarView;
  viewDate = new Date();

  view: CalendarView = CalendarView.Month;
  //map sessions on a array of calendarevents
  events: CalendarEvent[] = this.sessions.map(
    (session: Session) => {
      return {
        start: new Date(session.date),
        title: session.title,
        color: {
          primary: '#1e90ff',
          secondary: '#D1E8FF',
        },
      };
    }
  )

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {

  }
}
