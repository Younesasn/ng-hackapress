import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact.component.html'
})
export class ContactComponent {
  public form: FormGroup = new FormGroup({
    firstname: new FormControl('', {validators: Validators.required }),
    lastname: new FormControl('', {validators: Validators.required }),
    email: new FormControl('', {validators: Validators.required }),
    object: new FormControl('', {validators: Validators.required }),
    message: new FormControl('', {validators: Validators.required }),
  });
}
