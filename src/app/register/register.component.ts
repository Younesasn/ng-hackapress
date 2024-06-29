import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CivilityService } from '../shared/services/civility.service';
import { Civility } from '../shared/entities';
import { Subscription } from 'rxjs';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit, OnDestroy {
  civilities: Civility[] = [];

  dataCivility!: Subscription;

  public form = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(12), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{12,}$')]),
    civility: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(private civilityService: CivilityService, private userService: UserService) {}

  ngOnInit() {
    this.fetchCivilities();
  }

  fetchCivilities() {
    this.dataCivility = this.civilityService.getCivility().subscribe((civilities) => {
      this.civilities = civilities;
    });
  }

  register() {
    console.log(this.form.value);
    // if (this.form.valid) {
    //   this.userService.setUser(this.form.value).subscribe((user) => {
    //     console.log(user);
    //   });
    // }
  };

  ngOnDestroy() {
    this.dataCivility.unsubscribe();
    this.form.reset();
  };
}
