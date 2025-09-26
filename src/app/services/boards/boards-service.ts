import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apiUrl } from '@services/apiUrsl';

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  private http = inject(HttpClient);
  private TOKEN_KEY = 'auth_token';
  private apiUrl = apiUrl;

  getBoards() {
    const token = localStorage.getItem(this.TOKEN_KEY);
    return this.http.get(`${this.apiUrl}/api/v1/boards`, {
      headers: { Authorization: `Bearer ${token}` || '' },
    });
  }
}
