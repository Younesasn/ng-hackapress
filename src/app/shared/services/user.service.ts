import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, UserRegister } from '../entities';

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

  setUser(user: any) {
    let newUser: UserRegister = {
      username: user.username,
      password: user.password,
      firstname: user.firstname,
      lastname: user.lastname,
      civility: `/api/civilities/${user.civility}`,
      address: user.address,
    }
    return this.http.post<any>(this.userUrl, newUser);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.userUrl}/${user.id}`, user);
  }

  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(`${this.userUrl}/${id}`);
  }
}
