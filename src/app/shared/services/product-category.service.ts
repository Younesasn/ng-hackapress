import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiListResponse, ProductCategory } from '../entities';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {
  private productCategoryUrl: string = `${environment.apiUrl}/product_categories`;

  constructor(private http: HttpClient) {}

  getProductCategory(): Observable<ApiListResponse<ProductCategory>> {
    return this.http.get<ApiListResponse<ProductCategory>>(this.productCategoryUrl);
  }
}
