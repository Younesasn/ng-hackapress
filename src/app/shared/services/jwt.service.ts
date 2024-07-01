import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  constructor() {}

  decodeToken(token: string): Token {
    return jwtDecode(token);
  }
}
