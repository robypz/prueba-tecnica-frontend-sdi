import { Component, computed, effect, inject, input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Modal, ModalInterface } from 'flowbite';
import { SessionService } from '../shared/session-service';
import { Session } from '../shared/session.model';

@Component({
  selector: 'app-session-edit-component',
  imports: [ReactiveFormsModule],
  templateUrl: './session-edit-component.html',
  styleUrl: './session-edit-component.scss'
})
export class SessionEditComponent implements OnInit {
  public sessionService = inject(SessionService);
  //private _session = computed(() => this.sessionService.session());
  public _session = input<Session>();
  private modal!: ModalInterface;
  private modalElement!: HTMLElement;
  get session() {
    return this._session() as Session;
  }


  editSessionForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
  });


  constructor() {
    effect(() => {
      if (this._session()) {
        this.editSessionForm.setValue({
          title: this.session.title,
          description: this.session.description,
          category: this.session.category,
          city: this.session.city,
          date: this.session.date,
          status: this.session.status,
        });
        this.show();
      }
    });
  }


  onSubmit() {
    if (this.editSessionForm.valid) {
      this.sessionService.update(this.editSessionForm.value as Session,this.session.id)
      this.hide();
    }
  }

  hide() {
    (document.activeElement as HTMLElement)?.blur();
    this.modal.toggle();
  }

  show() {
    this.modal.show();
  }

  ngOnInit(): void {
    this.modalElement = document.getElementById('session-edit-modal') as HTMLElement;
    this.modal = new Modal(this.modalElement);
  }
}
