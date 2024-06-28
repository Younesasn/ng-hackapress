import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  public form: FormGroup = new FormGroup({
    username: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      validators: [Validators.required],
    }),
  });
  
  constructor(private authService: AuthService) {}

  login() {
    if (this.form.valid) {
      this.authService
        .login(this.form.value.username, this.form.value.password)
        .subscribe((res) => {
          localStorage.setItem('token', res.token);
          console.log(res);
        });
    }
  }
}
