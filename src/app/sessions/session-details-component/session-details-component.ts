import { Component, computed, effect, inject, input, OnInit } from '@angular/core';
import { Session } from '../shared/session.model';
import { SessionService } from '../shared/session-service';
import { Modal, ModalInterface } from 'flowbite';

@Component({
  selector: 'app-session-details-component',
  imports: [],
  templateUrl: './session-details-component.html',
  styleUrl: './session-details-component.scss'
})
export class SessionDetailsComponent implements OnInit {
  public id = input<string>('')
  private sessionService = inject(SessionService);
  private _session = computed(() => this.sessionService.session());
  private modal!: ModalInterface;
  private modalElement!: HTMLElement;

  get session() {
    return this._session() as Session;
  }


  constructor() {
    effect(() => {
      if (this.id() !== '') {
        this.sessionService.show(this.id());

      }
      if (this.session) {
        this.modal.show();
      }

    });
  }

  hide() {
    (document.activeElement as HTMLElement)?.blur();
    this.modal.toggle();
  }

  show() {
    this.modal.show();
  }

  ngOnInit(): void {
    this.modalElement = document.getElementById('session-details-modal') as HTMLElement;
    this.modal = new Modal(this.modalElement);
  }
}
