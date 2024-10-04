import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiListResponse, OneItem, Order, Payment } from '../shared/entities';
import { Subscription } from 'rxjs';
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
    deposit: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    if (!localStorage.getItem('cart')) {
      this.router.navigate(['/cart']);
    }
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
      const user_id = this.authService.getDecodedToken().user_id;

      if (this.cart.length > 0) {
        const order: Order = {
          date: new Date().toISOString(),
          totalPrice: this.totalPrice(),
          customer: `/api/users/${user_id}`,
          payment: `/api/payments/${this.form.value.paymentMethod}`,
          deposit: this.form.value.deposit?.toString(),
          items: [],
        };

        this.orderService.setOrder(order).subscribe((order: Order) => {
          const items: OneItem[] = this.cart.map((item: OneItem) => {
            return {
              command: order['@id'],
              product: item.product['@id'],
              matter: item.matter['@id'],
              service: item.service['@id'],
              quantity: item.quantity,
              picture: item.picture,
            };
          });

          items.forEach((item: OneItem) => {
            this.itemService.setItem(item).subscribe();
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
