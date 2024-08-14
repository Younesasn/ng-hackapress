import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { ApiListResponse, Civility } from '../entities';

@Injectable({
  providedIn: 'root'
})
export class CivilityService {
  private civilityUrl: string = `${environment.apiURL}/civilities`;

  constructor(private http: HttpClient) { }

  getCivility(): Observable<ApiListResponse<Civility>> {
    return this.http.get<ApiListResponse<Civility>>(this.civilityUrl);
  }

  getCivilityById(id: number): Observable<Civility> {
    return this.http.get<Civility>(`${this.civilityUrl}/${id}`);
  }

  setCivility(civility: Civility): Observable<Civility> {
    return this.http.post<Civility>(this.civilityUrl, civility);
  }

  updateCivility(civility: Civility): Observable<Civility> {
    return this.http.put<Civility>(`${this.civilityUrl}/${civility.id}`, civility);
  }

  deleteCivility(id: number): Observable<Civility> {
    return this.http.delete<Civility>(`${this.civilityUrl}/${id}`);
  }
}
