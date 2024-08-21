import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { OrderService } from '../shared/services/order.service';
import { OneItem, Order, User } from '../shared/entities';
import { Subscription, forkJoin, map } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';
import { UserService } from '../shared/services/user.service';
import { CommonModule } from '@angular/common';
import { ItemService } from '../shared/services/item.service';
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
  orderService = inject(OrderService);
  authService = inject(AuthService);
  itemService = inject(ItemService);
  http = inject(HttpClient);

  user!: User;
  dataUser!: Subscription;
  orders: Order[] = [];
  hasOrders: boolean = false;
  token = this.authService.getDecodedToken();
  urlImage = environment.urlImage;

  dataModal: OneItem[] = [];
  orderId: number | undefined;

  ngOnInit() {
    this.getDataUser();
    console.log({hasOrders: this.hasOrders});
  }

  getDataUser() {
    this.dataUser = this.userService
      .getUserById(this.token.user_id)
      .subscribe((data: User) => {
        this.user = data;
        data.orders.forEach((order) => {
          this.orderService.getOrderByUri(order).subscribe((data: Order) => {
            this.orders.push(data);
            this.hasOrders = true;
          });
        });
      });
  }

  openModal(items: string[], id: number | undefined) {
    const currentItems = this.dataModal.map((item) => item);
    const newItems = items;

    if (JSON.stringify(currentItems) !== JSON.stringify(newItems)) {
      this.dataModal = [];
      this.orderId = undefined;
      items.forEach((item: string) => {
        this.itemService.getItemByUri(item).subscribe((data: OneItem) => {
          this.dataModal.push(data);
          this.orderId = id;

          const requests = this.dataModal.map((item) => {
            const matterRequest = this.http.get<any>(
              environment.url + item.matter
            );
            const productRequest = this.http.get<any>(
              environment.url + item.product
            );
            const serviceRequest = this.http.get<any>(
              environment.url + item.service
            );
            const statusRequest = this.http.get<any>(
              environment.url + item.status
            );

            return forkJoin([
              matterRequest,
              productRequest,
              serviceRequest,
              statusRequest,
            ]).pipe(
              map(([matter, product, service, status]) => {
                item.matter = matter.name;
                item.product = product.name;
                item.service = service.name;
                item.status = status.name;
                return item;
              })
            );
          });

          forkJoin(requests).subscribe((updatedCart: OneItem[]) => {
            this.dataModal = updatedCart;
            this.orderId = id;
          });
        });
      });
    }

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
