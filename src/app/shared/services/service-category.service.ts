import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { ServiceCategory } from '../../entities';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceCategoryService {
  private serviceCategoryUrl: string = `${environment.apiURL}/service_categories`;

  constructor(private http: HttpClient) {}

  getServiceCategory(): Observable<ServiceCategory[]> {
    return this.http.get<ServiceCategory[]>(this.serviceCategoryUrl);
  }

  getServiceCategoryById(id: number): Observable<ServiceCategory> {
    return this.http.get<ServiceCategory>(`${this.serviceCategoryUrl}/${id}`);
  }

  setServiceCategory(serviceCategory: ServiceCategory): Observable<ServiceCategory> {
    return this.http.post<ServiceCategory>(this.serviceCategoryUrl, serviceCategory);
  }

  updateServiceCategory(serviceCategory: ServiceCategory): Observable<ServiceCategory> {
    return this.http.put<ServiceCategory>(`${this.serviceCategoryUrl}/${serviceCategory.id}`, serviceCategory);
  }

  deleteServiceCategory(id: number): Observable<ServiceCategory> {
    return this.http.delete<ServiceCategory>(`${this.serviceCategoryUrl}/${id}`);
  }
}
