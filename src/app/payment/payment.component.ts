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

  orderService = inject(OrderService);

  itemService = inject(ItemService);

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

  validate() {
    if (this.form.valid) {
      // console.log({ form: this.form.value });
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      console.log({ cart: cart });

      if (cart.length > 0) {
        const order: Order = {
          date: new Date().toISOString(),
          totalPrice: cart.reduce(
            (acc: number, item: OneItem) => acc + item.price + 5.99,
            0
          ),
          // user courant à récup
          customer: '/api/users/4',
          payment: `/api/payments/${this.form.value.paymentMethod}` || '',
          items: [],
        };

        const test = this.orderService
          .setOrder(order)
          .subscribe((order: Order) => {
            console.log({ order: order.id });
            console.log('Order created');

            const items = cart.map((item: OneItem) => {
              return {
                command: `/api/orders/${order.id}`,
                product: item.product,
                matter: item.matter,
                // status par défaut à recup
                status: '/api/statuses/4',
                service: item.service,
              };
            });

            items.forEach((item: OneItem) => {
              this.itemService.setItem(item).subscribe((item) => {
                console.log({ item: item });
                console.log('Item created');
                localStorage.removeItem('cart');
              });
            });
          });
      } else {
        console.log('Cart is empty');
      }
    }
  }

  ngOnDestroy(): void {
    this.dataPayment.unsubscribe();
  }
}
