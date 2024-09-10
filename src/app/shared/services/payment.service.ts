import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiListResponse, Payment } from '../entities';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private paymentUrl: string = `${environment.apiUrl}/payments`;

  constructor(private http: HttpClient) {}

  getPayment(): Observable<ApiListResponse<Payment>> {
    return this.http.get<ApiListResponse<Payment>>(this.paymentUrl);
  }
}
