import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { Civility, UserRegister } from '../shared/entities';
import { CivilityService } from '../shared/services/civility.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit, OnDestroy {
  civilities: Civility[] = [];

  dataCivility!: Subscription;
  feedback: string = '';

  public form = new FormGroup({
    address: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    civility: new FormControl('', [Validators.required]),
    firstname: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      // Validators.minLength(12),
      // Validators.pattern(
      //   '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{12,}$'
      // ),
    ]),
  });

  constructor(
    private civilityService: CivilityService,
    private userService: UserService
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
     console.log(this.form.value);
     this.userService.setUser(this.form.value).subscribe({
       next: () => { this.feedback = 'success'; },
       error: () => { this.feedback = 'error'; }
     });
     
    }
  }

  ngOnDestroy() {
    this.dataCivility.unsubscribe();
    this.form.reset();
  }
}
