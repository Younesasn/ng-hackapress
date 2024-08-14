import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  authService = inject(AuthService);
  router = inject(Router);

  form: FormGroup = new FormGroup({
    username: new FormControl('', {
      validators: [Validators.required],
    }),
    password: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  ngOnInit() {}

  onSubmit() {
    if (this.form.valid) {
      const { username, password } = this.form.value;
      this.authService.login({ username, password }).subscribe(
        (token) => {
          this.authService.saveToken(token);
          this.router.navigate(['/profile']);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
