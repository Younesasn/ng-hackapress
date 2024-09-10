import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ApiListResponse, Civility } from '../entities';

@Injectable({
  providedIn: 'root'
})
export class CivilityService {
  private civilityUrl: string = `${environment.apiUrl}/civilities`;

  constructor(private http: HttpClient) { }

  getCivility(): Observable<ApiListResponse<Civility>> {
    return this.http.get<ApiListResponse<Civility>>(this.civilityUrl);
  }
}
