import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { OneItem, Service } from '../shared/entities';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../shared/services/cart.service';
import { environment } from '../../environments/environment.development';

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
  urlImage: string = environment.urlImage;

  ngOnInit(): void {
    if (localStorage.getItem('cart')) {
      this.cart = JSON.parse(localStorage.getItem('cart') || '[]');
      this.total = this.cart.reduce((acc, item) => acc + item.price, 0);
    }
  }

  deleteItem(item: OneItem) {
    this.cart = this.cart.filter((cartItem) => cartItem !== item);
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  ngOnDestroy(): void {
  }
}
