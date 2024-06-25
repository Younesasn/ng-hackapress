import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Payment } from '../entities';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private paymentUrl: string = `${environment.apiURL}/payments`;

  constructor(private http: HttpClient) {}

  getPayment(): Observable<Payment[]> {
    return this.http.get<Payment[]>(this.paymentUrl);
  }

  getPaymentById(id: number): Observable<Payment> {
    return this.http.get<Payment>(`${this.paymentUrl}/${id}`);
  }

  setPayment(payment: Payment): Observable<Payment> {
    return this.http.post<Payment>(this.paymentUrl, payment);
  }

  updatePayment(payment: Payment): Observable<Payment> {
    return this.http.put<Payment>(`${this.paymentUrl}/${payment.id}`, payment);
  }

  deletePayment(id: number): Observable<Payment> {
    return this.http.delete<Payment>(`${this.paymentUrl}/${id}`);
  }
}
