import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { OneItem, Service } from '../shared/entities';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Subscription, forkJoin } from 'rxjs';
import { CartService } from '../shared/services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit, OnDestroy {
  cart!: OneItem[];
  total!: number;
  taxes: number = 5.99;
  service!: Service;
  cartService = inject(CartService);

  ngOnInit(): void {
    if (localStorage.getItem('cart')) {
      this.cart = JSON.parse(localStorage.getItem('cart') || '[]');
      this.total = this.cart.reduce((acc, item) => acc + item.price, 0);
      this.test();
    }
  }

  test() {
    this.cartService.getServiceByUrl('http://localhost:8000/api/services/1').subscribe((service: Service) => {
      this.service = service;
    });
  }

  deleteItem(item: OneItem) {
    this.cart = this.cart.filter((cartItem) => cartItem !== item);
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  ngOnDestroy(): void {
  }
}
