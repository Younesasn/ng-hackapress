import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { OneItem, Service } from '../shared/entities';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../shared/services/cart.service';
import { environment } from '../../environments/environment';
import { AuthService } from '../shared/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map } from 'rxjs';
import { ValidateComponent } from '../validate/validate.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink, ValidateComponent],
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit, OnDestroy {
  cart!: OneItem[];
  total!: number;
  taxes: number = 5.99;
  service!: Service;
  cartService = inject(CartService);
  isLogged = inject(AuthService).isLogged();
  http = inject(HttpClient);
  urlImage: string = environment.urlImage;
  url: string = environment.url;

  ngOnInit(): void {
    if (localStorage.getItem('cart')) {
      this.cart = JSON.parse(localStorage.getItem('cart') || '[]');
      this.total = this.cart.reduce((acc, item) => acc + item.price, 0);
    }
    this.updateCartItem();
  }

  updateCartItem() {
    if (this.cart) {
      const requests = this.cart.map((item) => {
        const matterRequest = this.http.get<any>(environment.url + item.matter);
        const productRequest = this.http.get<any>(
          environment.url + item.product
        );
        const serviceRequest = this.http.get<any>(
          environment.url + item.service
        );

        return forkJoin([matterRequest, productRequest, serviceRequest]).pipe(
          map(([matter, product, service]) => {
            item.matter = matter.name;
            item.product = product.name;
            item.service = service.name;
            return item;
          })
        );
      });

      forkJoin(requests).subscribe((updatedCart: OneItem[]) => {
        this.cart = updatedCart;
      });
    }
  }

  deleteItem(item: OneItem) {
    if (this.cart.length > 1) {
      this.cart = this.cart.filter((cartItem) => cartItem !== item);
      localStorage.setItem('cart', JSON.stringify(this.cart));
      this.total = this.cart.reduce((acc, item) => acc + item.price, 0);
    } else {
      this.cart = [];
      localStorage.removeItem('cart');
    }
  }

  ngOnDestroy(): void {}
}
