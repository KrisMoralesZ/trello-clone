import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private TOKEN_KEY = 'auth_token';

  setToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  removeToken() {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  apiUrl = 'https://fake-trello-api.herokuapp.com';

  login(email: string, password: string) {
    return this.http
      .post(
        `${this.apiUrl}/api/v1/auth/login`,
        { email, password },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )
      .pipe(
        tap((response: any) => {
          if (response.access_token) {
            this.setToken(response.access_token);
          }
        })
      );
  }

  signup(name: string, email: string, password: string) {
    return this.http.post(`${this.apiUrl}/api/v1/auth/register`, {
      name,
      email,
      password,
    });
  }

  signUpAndLogin(name: string, email: string, password: string) {
    return this.signup(name, email, password).pipe(
      switchMap(() => this.login(email, password))
    );
  }

  isAvailable(email: string) {
    return this.http.post<{ isAvailable: boolean }>(
      `${this.apiUrl}/api/v1/auth/is-available`,
      { email }
    );
  }

  recovery(email: string) {
    return this.http.post(`${this.apiUrl}/api/v1/auth/recovery`, { email });
  }

  changePassword(token: string, newPassword: string) {
    return this.http.post(`${this.apiUrl}/api/v1/auth/change-password`, {
      token,
      newPassword,
    });
  }
}
