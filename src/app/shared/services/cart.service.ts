import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { Matter, Product, ProductCategory, Service } from '../entities';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) {}

  getServiceByUrl(url: string): Observable<Service> {
    return this.http.get<Service>(url);
  }

  getCategoryByUrl(url: string): Observable<ProductCategory> {
    return this.http.get<ProductCategory>(url);
  }

  getProductByUrl(url: string): Observable<Product> {
    return this.http.get<Product>(url);
  }

  getMatterByUrl(url: string): Observable<Matter> {
    return this.http.get<Matter>(url);
  }
}
