import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../entities';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private orderUrl: string = `${environment.apiURL}/orders`;

  constructor(private http: HttpClient) {}

  getOrder(): Observable<Order[]> {
    return this.http.get<Order[]>(this.orderUrl);
  }

  getOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.orderUrl}/${id}`);
  }

  setOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.orderUrl, order);
  }

  deleteOrder(id: number): Observable<Order> {
    return this.http.delete<Order>(`${this.orderUrl}/${id}`);
  }
}
