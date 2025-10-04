import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '@models/user.model';
import { apiUrl } from '@services/apiUrsl';
import { AuthService } from '@services/auth/auth-service';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private http = inject(HttpClient);
  private autService = inject(AuthService);
  private apiUrl = apiUrl;

  user$ = new BehaviorSubject<User | null>(null);

  getUserData() {
    return this.user$.getValue();
  }

  getProfile() {
    const token = this.autService.getToken();
    return this.http
      .get<User>(`${this.apiUrl}/api/v1/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` || '' },
      })
      .pipe(tap((user) => this.user$.next(user)));
  }

  getUsers() {
    const token = this.autService.getToken();
    return this.http.get<User[]>(`${this.apiUrl}/api/v1/users`, {
      headers: { Authorization: `Bearer ${token}` || '' },
    });
  }
}
