import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { ApiListResponse, Product } from '../entities';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productUrl: string = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) {}

  getProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productUrl);
  }

  getProductsByUrls(urls: string[]): Observable<Product[]> {
    const requests: Observable<Product>[] = urls.map(url => this.http.get<Product>(url));
    return forkJoin(requests);
  }
}
