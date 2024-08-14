import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { ApiListResponse, Matter } from '../entities';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatterService {
  private matterUrl: string = `${environment.apiURL}/matters`;

  constructor(private http: HttpClient) {}

  getMatter(): Observable<ApiListResponse<Matter>> {
    return this.http.get<ApiListResponse<Matter>>(this.matterUrl);
  }

  getMatterById(id: number): Observable<Matter> {
    return this.http.get<Matter>(`${this.matterUrl}/${id}`);
  }

  setMatter(matter: Matter): Observable<Matter> {
    return this.http.post<Matter>(this.matterUrl, matter);
  }

  updateMatter(matter: Matter): Observable<Matter> {
    return this.http.put<Matter>(`${this.matterUrl}/${matter.id}`, matter);
  }

  deleteMatter(id: number): Observable<Matter> {
    return this.http.delete<Matter>(`${this.matterUrl}/${id}`);
  }
}
