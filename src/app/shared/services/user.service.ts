import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, UserRegister } from '../entities';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userUrl: string = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

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

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.userUrl}/${id}`);
  }
}
