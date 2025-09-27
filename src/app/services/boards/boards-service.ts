import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IBoard } from '@models/boards.model';
import { apiUrl } from '@services/apiUrsl';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  private http = inject(HttpClient);
  private TOKEN_KEY = 'auth_token';
  private apiUrl = apiUrl;

  getBoards(): Observable<IBoard[]> {
    const token = localStorage.getItem(this.TOKEN_KEY);
    return this.http.get<IBoard[]>(`${this.apiUrl}/api/v1/boards`, {
      headers: { Authorization: `Bearer ${token}` || '' },
    });
  }
}
