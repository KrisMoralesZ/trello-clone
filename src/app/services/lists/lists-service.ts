import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CreateListDto, List } from '@models/lists.model';
import { apiUrl } from '@services/apiUrsl';

@Injectable({
  providedIn: 'root',
})
export class ListsService {
  private http = inject(HttpClient);
  private apiUrl = apiUrl;
  private TOKEN_KEY = 'auth_token';
  private token = localStorage.getItem(this.TOKEN_KEY)
    ? localStorage.getItem(this.TOKEN_KEY)
    : '';

  createList(listId: CreateListDto) {
    return this.http.post<List>(`${this.apiUrl}/api/v1/lists`, listId, {
      headers: { Authorization: `Bearer ${this.token}` || '' },
    });
  }
}
