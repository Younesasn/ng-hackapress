import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Token, TokenDecoded } from '../entities';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url: string = `${environment.apiURL}/login_check`;
  http = inject(HttpClient);
  router = inject(Router);

  login(credentials: {
    username: string;
    password: string;
  }): Observable<Token> {
    return this.http.post<Token>(this.url, credentials);
  }

  saveToken(token: Token) {
    localStorage.setItem('token', token.token);
  }

  isLogged(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;
    try {
      const decoded: TokenDecoded = jwtDecode(token);
      if (
        decoded.username &&
        decoded.roles &&
        decoded.user_id &&
        decoded.exp &&
        decoded.iat
      )
        return true;
    } catch (e: any) {
      console.log(e);
    }
    return false;
  }

  getToken(): string {
    return localStorage.getItem('token') || '';
  }

  getDecodedToken(): TokenDecoded {
    return jwtDecode(this.getToken());
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
