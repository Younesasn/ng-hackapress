import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { ApiListResponse, Service } from '../entities';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private serviceUrl: string = `${environment.apiUrl}/services`;

  constructor(private http: HttpClient) {}

  getService(): Observable<ApiListResponse<Service>> {
    return this.http.get<ApiListResponse<Service>>(this.serviceUrl);
  }

  getServiceByUrls(urls: string[]): Observable<Service[]> {
    const requests: Observable<Service>[] = urls.map(url => this.http.get<Service>(url));
    return forkJoin(requests);
  }
}
