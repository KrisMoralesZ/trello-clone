import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Card, UpdateCardDto } from '@models/cards.model';
import { apiUrl } from '@services/apiUrsl';

@Injectable({
  providedIn: 'root',
})
export class CardsService {
  private http = inject(HttpClient);
  private apiUrl = apiUrl;
  private TOKEN_KEY = 'auth_token';
  private token = localStorage.getItem(this.TOKEN_KEY)
    ? localStorage.getItem(this.TOKEN_KEY)
    : '';

  update(id: Card['id'], changes: UpdateCardDto) {
    const token = this.token;
    return this.http.put<Card>(`${this.apiUrl}/api/v1/cards/${id}`, changes, {
      headers: { Authorization: `Bearer ${token}` || '' },
    });
  }
}
