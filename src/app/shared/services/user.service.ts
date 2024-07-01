import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../entities';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userUrl: string = `${environment.apiURL}/users`;

  constructor(private http: HttpClient) {}

  getUser(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.userUrl}/${id}`);
  }

  setUser(user: any): Observable<User> {
    return this.http.post<User>(this.userUrl, user, {
      headers: { 'Access-Control-Allow-Origin': '*' },
    });
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.userUrl}/${user.id}`, user);
  }

  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(`${this.userUrl}/${id}`);
  }
}
