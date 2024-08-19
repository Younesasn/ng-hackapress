import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiListResponse, OneItem, Order, Payment } from '../shared/entities';
import { Subscription, last } from 'rxjs';
import { PaymentService } from '../shared/services/payment.service';
import { CommonModule } from '@angular/common';
import { OrderService } from '../shared/services/order.service';
import { ItemService } from '../shared/services/item.service';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './payment.component.html',
})
export class PaymentComponent implements OnInit, OnDestroy {
  payments!: ApiListResponse<Payment>;
  paymentService = inject(PaymentService);
  dataPayment!: Subscription;
  cart = JSON.parse(localStorage.getItem('cart') || '[]');

  orderService = inject(OrderService);
  itemService = inject(ItemService);
  authService = inject(AuthService);
  router = inject(Router);

  public form = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    paymentMethod: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.fetchPayments();
  }

  fetchPayments() {
    this.dataPayment = this.paymentService
      .getPayment()
      .subscribe((payments) => {
        this.payments = payments;
      });
  }

  totalPriceHT(): number {
    return this.cart.reduce(
      (acc: number, item: OneItem) => acc + item.price,
      0
    );
  }

  totalPrice(): number {
    return (
      this.cart.reduce((acc: number, item: OneItem) => acc + item.price, 0) +
      5.99
    );
  }

  validate() {
    if (this.form.valid) {
      const token = this.authService.getDecodedToken();

      console.log({ cart: this.cart });

      if (this.cart.length > 0) {
        const order: Order = {
          date: new Date().toISOString(),
          totalPrice: this.totalPrice(),
          customer: `/api/users/${token.user_id}`,
          payment: `/api/payments/${this.form.value.paymentMethod}`,
          items: [],
        };

        this.orderService.setOrder(order).subscribe((order: Order) => {
          const items = this.cart.map((item: OneItem) => {
            return {
              command: `/api/orders/${order.id}`,
              product: item.product,
              matter: item.matter,
              status: `/api/statuses/${token.status_id}`,
              service: item.service,
              quantity: item.quantity,
              picture: item.picture,
            };
          });

          items.forEach((item: OneItem) => {
            this.itemService.setItem(item).subscribe((item) => {
              console.log('Item created');
            });
          });
        });
        localStorage.removeItem('cart');
        localStorage.setItem('order', JSON.stringify(true));
        this.router.navigate(['/validate']);
      } else {
        console.log('Cart is empty');
      }
    }
  }

  ngOnDestroy(): void {
    this.dataPayment.unsubscribe();
  }
}
