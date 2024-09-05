import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { ApiListResponse, ServiceCategory } from '../entities';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceCategoryService {
  private serviceCategoryUrl: string = `${environment.apiUrl}/service_categories`;

  constructor(private http: HttpClient) {}

  getServiceCategory(): Observable<ApiListResponse<ServiceCategory>> {
    return this.http.get<ApiListResponse<ServiceCategory>>(this.serviceCategoryUrl);
  }
}
