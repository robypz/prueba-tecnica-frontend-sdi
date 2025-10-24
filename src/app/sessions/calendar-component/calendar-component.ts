import { Component, computed, effect, inject, DOCUMENT, ViewChild, TemplateRef, viewChild } from '@angular/core';
import { MenuComponent } from "../../shared/components/menu-component/menu-component";
import { SessionService } from '../shared/session-service';
import { SessionCreateComponent } from "../session-create-component/session-create-component";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  CalendarDateFormatter
} from 'angular-calendar'
import {
  isSameDay,
  isSameMonth,
} from 'date-fns';
import { adapterFactory, } from 'angular-calendar/date-adapters/date-fns';
import { Session } from '../shared/session.model';
import { CustomDateFormatter } from './custom-date-formatter.privider';
import { JsonPipe } from '@angular/common';

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
    CalendarDatePipe,
    JsonPipe
  ],
  providers: [
    provideCalendar({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }, {
      dateFormatter: {
        provide: CalendarDateFormatter,
        useClass: CustomDateFormatter,
      },
    },),
  ],
  templateUrl: './calendar-component.html',
  styleUrl: './calendar-component.scss'
})
export class CalendarComponent {
   @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any> | undefined;
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
  locale: string = 'es';
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
        actions: [
          {
            label: '<i class="fas fa-fw fa-trash-alt"></i>',
            onClick: ({ event }: { event: CalendarEvent }): void => {
              this.events = this.events.filter((iEvent) => iEvent !== event);
              console.log('Event deleted', event);
            },
          },
        ],
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

  private modal = inject(NgbModal);
  modalData: {
    action: string;
    event: CalendarEvent;
  } | undefined;
  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }
}
