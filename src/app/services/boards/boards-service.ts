import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IBoard, IBoardDetails } from '@models/boards.model';
import { apiUrl } from '@services/apiUrsl';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  private http = inject(HttpClient);
  private TOKEN_KEY = 'auth_token';
  private apiUrl = apiUrl;
  private token = localStorage.getItem(this.TOKEN_KEY)
    ? localStorage.getItem(this.TOKEN_KEY)
    : '';

  getBoards(): Observable<IBoard[]> {
    const token = this.token;
    return this.http.get<IBoard[]>(`${this.apiUrl}/api/v1/boards`, {
      headers: { Authorization: `Bearer ${token}` || '' },
    });
  }

  getBoard(id: number): Observable<IBoardDetails> {
    const token = this.token;
    return this.http.get<IBoardDetails>(`${this.apiUrl}/api/v1/boards/${id}`, {
      headers: { Authorization: `Bearer ${token}` || '' },
    });
  }
}
