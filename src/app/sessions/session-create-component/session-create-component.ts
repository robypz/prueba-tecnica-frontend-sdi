import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-session-create-component',
  imports: [ReactiveFormsModule],
  templateUrl: './session-create-component.html',
  styleUrl: './session-create-component.scss'
})
export class SessionCreateComponent {
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
      console.log(this.createSessionForm.value);
    }
  }
}
