import { HttpClient } from '@angular/common/http';
import { Injectable, Signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl: string = environment.apiURL + '/login_check';
  private isAuth: boolean = false;

  constructor(private http: HttpClient) {}

  private setToken(token: string) {
    localStorage.setItem('token', token);
  }

  logout() {
    localStorage.removeItem('token');
    this.isAuth = false;
  }

  getToken(): boolean {
    return localStorage.getItem('token') ? true : false;
  }

  private login(username: string, password: string): Observable<any> {
    return this.http.post(this.authUrl, { username, password });
  }

  auth(username: string, password: string) {
    this.login(username, password).subscribe((res) => {
      this.isAuth = true;
        this.setToken(res.token);
    });
  }

  isAuthenticated() {
    return this.isAuth;
  }
}
