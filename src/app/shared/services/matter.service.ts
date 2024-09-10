import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiListResponse, Matter } from '../entities';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatterService {
  private matterUrl: string = `${environment.apiUrl}/matters`;

  constructor(private http: HttpClient) {}

  getMatter(): Observable<ApiListResponse<Matter>> {
    return this.http.get<ApiListResponse<Matter>>(this.matterUrl);
  }
}
