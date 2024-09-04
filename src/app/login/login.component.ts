import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { filter } from 'rxjs';
import { NavigationService } from '../shared/services/navigation.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  authService = inject(AuthService);
  router = inject(Router);
  error: boolean = false;
  navigationService = inject(NavigationService);

  form: FormGroup = new FormGroup({
    username: new FormControl('', {
      validators: [Validators.required],
    }),
    password: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  ngOnInit() {
    console.log(this.navigationService.getCurrentUrl());
  }

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
          this.form.reset();
          this.error = true;
          this.router.navigate(['/login']);
        }
      );
    }
  }
}
