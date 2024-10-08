import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { ApiListResponse, Civility } from '../shared/entities';
import { CivilityService } from '../shared/services/civility.service';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit, OnDestroy {
  civilities!: ApiListResponse<Civility>;

  dataCivility!: Subscription;

  public form = new FormGroup({
    address: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    civility: new FormControl('', [Validators.required]),
    firstname: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(12),
      Validators.pattern(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{12,}$'
      ),
    ]),
  });

  constructor(
    private civilityService: CivilityService,
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.fetchCivilities();
  }

  fetchCivilities() {
    this.dataCivility = this.civilityService
      .getCivility()
      .subscribe((civilities) => {
        this.civilities = civilities;
      });
  }

  register() {
    if (this.form.valid) {
      this.userService.setUser(this.form.value).subscribe({
        next: () => {
          if (this.form.value.password && this.form.value.username) {
            const { username, password } = this.form.value;
            this.authService.login({ username, password }).subscribe(
              (token) => {
                this.authService.saveToken(token);
                this.router.navigate(['/profile']);
              },
              (error) => {
                console.log(error);
                this.router.navigate(['/login']);
              }
            );
          }
        },
      });
    }
  }

  ngOnDestroy() {
    this.dataCivility.unsubscribe();
    this.form.reset();
  }
}
