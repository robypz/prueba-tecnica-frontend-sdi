import { Component, computed, effect, inject, DOCUMENT } from '@angular/core';
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
  CalendarDatePipe,
  CalendarDateFormatter,
  CalendarEventAction
} from 'angular-calendar'
import {
  isSameDay,
  isSameMonth,
} from 'date-fns';;
import { adapterFactory, } from 'angular-calendar/date-adapters/date-fns';
import { Session } from '../shared/session.model';
import { AuthService } from '../../auth/shared/auth-service';

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
  private authService = inject(AuthService);


  get sessions() {
    return this._sessions();
  }

  constructor() {
    effect(() => {
      this.events = this.sessions.map(
        (session: Session) => {
          return {
            start: new Date(session.date),
            title: session.title,
            color: {
              primary: '#1e90ff',
              secondary: '#D1E8FF',
            },
            actions: this.authService.hasRole('admin') ? this.actions : [],
          };
        }
      )
    });
  }

  //calendar
  readonly CalendarView = CalendarView;
  viewDate = new Date();
  view: CalendarView = CalendarView.Month;
  actions: CalendarEventAction[] = [
    {
      label: '<span class="text-white bg-red-500 rounded-full p-1 text-xs">Eliminar</span>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];
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
        actions: this.authService.hasRole('admin') ? this.actions : [],
      };
    }
  )
  activeDayIsOpen: boolean = true;

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  handleEvent(action: string, event: CalendarEvent): void {
    console.log(action);
  }
}
