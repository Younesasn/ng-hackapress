import { initFlowbite } from 'flowbite';
import { RouterOutlet } from '@angular/router';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { UserService } from './shared/services/user.service';
import { AuthService } from './shared/services/auth.service';
import { User } from './shared/entities';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
  user?: User; 
  dataUser!: Subscription;
  userService = inject(UserService);
  authService = inject(AuthService);

  ngOnInit(): void {
    initFlowbite();
    this.getCurrentUser();
    this.burgerMenu();
  }

  getCurrentUser() {
    if (this.authService.isLogged()) {
      let decodedToken = this.authService.getDecodedToken();
      this.dataUser = this.userService
        .getUserById(decodedToken.user_id)
        .subscribe((user: User) => {
          this.user = user;
        });
    }
  }

  burgerMenu() {
    document.addEventListener('DOMContentLoaded', function () {
      // open
      const burger = document.querySelectorAll('.navbar-burger');
      const menu = document.querySelectorAll('.navbar-menu');

      if (burger.length && menu.length) {
        for (var i = 0; i < burger.length; i++) {
          burger[i].addEventListener('click', function () {
            for (var j = 0; j < menu.length; j++) {
              menu[j].classList.toggle('hidden');
            }
          });
        }
      }

      // close
      const close = document.querySelectorAll('.navbar-close');
      const backdrop = document.querySelectorAll('.navbar-backdrop');

      if (close.length) {
        for (var i = 0; i < close.length; i++) {
          close[i].addEventListener('click', function () {
            for (var j = 0; j < menu.length; j++) {
              menu[j].classList.toggle('hidden');
            }
          });
        }
      }

      if (backdrop.length) {
        for (var i = 0; i < backdrop.length; i++) {
          backdrop[i].addEventListener('click', function () {
            for (var j = 0; j < menu.length; j++) {
              menu[j].classList.toggle('hidden');
            }
          });
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.dataUser.unsubscribe();
  }
}
