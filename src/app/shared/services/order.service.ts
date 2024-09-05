import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../entities';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private orderUrl: string = `${environment.apiUrl}/orders`;

  constructor(private http: HttpClient) {}

  getOrderByUri(uri: string): Observable<Order> {
    return this.http.get<Order>(`${environment.url}${uri}`);
  }

  setOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.orderUrl, order);
  }
}
