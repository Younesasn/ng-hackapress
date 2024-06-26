import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Product } from '../entities';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productUrl: string = `${environment.apiURL}/products`;

  constructor(private http: HttpClient) {}

  getProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productUrl);
  }

  getProductsByUrls(urls: string[]): Observable<Product[]> {
    const requests: Observable<Product>[] = urls.map(url => this.http.get<Product>(url));
    return forkJoin(requests);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.productUrl}/${id}`);
  }

  setProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.productUrl, product);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.productUrl}/${product.id}`, product);
  }

  deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(`${this.productUrl}/${id}`);
  }
}
