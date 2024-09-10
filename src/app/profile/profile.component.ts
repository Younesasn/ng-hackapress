import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Item, User } from '../shared/entities';
import { Subscription } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';
import { UserService } from '../shared/services/user.service';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit, OnDestroy {
  userService = inject(UserService);
  authService = inject(AuthService);
  http = inject(HttpClient);

  user!: User;
  dataUser!: Subscription;
  hasOrders: boolean = false;
  user_id = this.authService.getDecodedToken().user_id;
  urlImage = environment.urlImage;

  dataModal!: Item[];
  orderId: number | undefined;

  ngOnInit() {
    this.getDataUser();
  }

  getDataUser() {
    this.dataUser = this.userService
      .getUserById(this.user_id)
      .subscribe((data: User) => {
        this.user = data;
        if (this.user.orders.length > 0) {
          this.hasOrders = true;
        }
      });
  }

  openModal(items: Item[], id: number | undefined) {
    this.orderId = id;
    this.dataModal = items;

    let modal = document.getElementById('modal') as HTMLElement;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    modal.classList.add('opacity-100');
  }

  closeModal() {
    let modal = document.getElementById('modal') as HTMLElement;
    modal.classList.add('hidden');
    modal.classList.add('opacity-0');
    modal.classList.remove('flex');
    modal.classList.remove('opacity-100');
  }

  ngOnDestroy() {
    this.dataUser.unsubscribe();
  }
}
