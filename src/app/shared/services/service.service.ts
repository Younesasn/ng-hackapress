import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Service } from '../../entities';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private serviceUrl: string = `${environment.apiURL}/services`;

  constructor(private http: HttpClient) {}

  getService(): Observable<Service[]> {
    return this.http.get<Service[]>(this.serviceUrl);
  }

  getServiceById(id: number): Observable<Service> {
    return this.http.get<Service>(`${this.serviceUrl}/${id}`);
  }

  setService(service: Service): Observable<Service> {
    return this.http.post<Service>(this.serviceUrl, service);
  }

  updateService(service: Service): Observable<Service> {
    return this.http.put<Service>(`${this.serviceUrl}/${service.id}`, service);
  }

  deleteService(id: number): Observable<Service> {
    return this.http.delete<Service>(`${this.serviceUrl}/${id}`);
  }
}
