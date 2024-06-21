import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Status } from '../../entities';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  private statusUrl: string = `${environment.apiURL}/statuses`;

  constructor(private http: HttpClient) {}

  getStatus(): Observable<Status[]> {
    return this.http.get<Status[]>(this.statusUrl);
  }

  getStatusById(id: number): Observable<Status> {
    return this.http.get<Status>(`${this.statusUrl}/${id}`);
  }

  setStatus(status: Status): Observable<Status> {
    return this.http.post<Status>(this.statusUrl, status);
  }

  updateStatus(status: Status): Observable<Status> {
    return this.http.put<Status>(`${this.statusUrl}/${status.id}`, status);
  }

  deleteStatus(id: number): Observable<Status> {
    return this.http.delete<Status>(`${this.statusUrl}/${id}`);
  }
}
