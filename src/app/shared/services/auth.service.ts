import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl: string = environment.apiURL + '/login_check';
  private isAuth = false;

  constructor(private http: HttpClient) {}

  private setToken(token: string) {
    localStorage.setItem('token', token);
  }

  logout() {
    localStorage.removeItem('token');
    this.isAuth = false;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  private login(username: string, password: string): Observable<any> {
    return this.http.post(this.authUrl, { username, password });
  }

  auth(username: string, password: string) {
    this.login(username, password).subscribe((res) => {
      this.setToken(res.token);
      this.isAuth = true;
      console.log(this.getToken());
    });
  }

  isAuthenticated() {
    return this.isAuth;
  }
}
