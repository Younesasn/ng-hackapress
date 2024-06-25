import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductCategory } from '../entities';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {
  private productCategoryUrl: string = `${environment.apiURL}/product_categories`;

  constructor(private http: HttpClient) {}

  getProductCategory(): Observable<ProductCategory[]> {
    return this.http.get<ProductCategory[]>(this.productCategoryUrl);
  }

  getProductCategoryById(id: number): Observable<ProductCategory> {
    return this.http.get<ProductCategory>(`${this.productCategoryUrl}/${id}`);
  }

  setProductCategory(productCategory: ProductCategory): Observable<ProductCategory> {
    return this.http.post<ProductCategory>(this.productCategoryUrl, productCategory);
  }

  updateProductCategory(productCategory: ProductCategory): Observable<ProductCategory> {
    return this.http.put<ProductCategory>(`${this.productCategoryUrl}/${productCategory.id}`, productCategory);
  }

  deleteProductCategory(id: number): Observable<ProductCategory> {
    return this.http.delete<ProductCategory>(`${this.productCategoryUrl}/${id}`);
  }
}
