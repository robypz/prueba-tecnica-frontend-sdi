import { Component, inject, DOCUMENT, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SessionService } from '../shared/session-service';
import { Session } from '../shared/session.model';
import { Modal, ModalInterface } from 'flowbite';

@Component({
  selector: 'app-session-create-component',
  imports: [ReactiveFormsModule],
  templateUrl: './session-create-component.html',
  styleUrl: './session-create-component.scss'
})
export class SessionCreateComponent implements OnInit {

  public sessionService = inject(SessionService);
  private modal!: ModalInterface;
  private modalElement!: HTMLElement;
  constructor() {

  }

  createSessionForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
  });



  onSubmit() {
    if (this.createSessionForm.valid) {
      this.sessionService.create(this.createSessionForm.value as Session)
      this.hide();
      this.createSessionForm.reset();
    }
  }

  hide(){
    (document.activeElement as HTMLElement)?.blur();
    this.modal.toggle();
  }

  show(){
    this.modal.show();
  }


  ngOnInit(): void {
    this.modalElement = document.getElementById('create-session-modal') as HTMLElement;
    this.modal = new Modal(this.modalElement);
  }
}
