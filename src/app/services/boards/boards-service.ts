import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IBoard, IBoardDetails } from '@models/boards.model';
import { Card } from '@models/cards.model';
import { Colors } from '@models/colors.model';
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
  private bufferSpace = 65535;

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

  getPosition(cards: Card[], currentIndex: number) {
    if (cards.length === 1) {
      return this.bufferSpace;
    }
    if (cards.length > 1 && currentIndex === 0) {
      const onTopPosition = cards[1].position;
      return (onTopPosition ?? this.bufferSpace) / 2;
    }
    const lastIndex = cards.length - 1;
    if (cards.length > 2 && currentIndex > 0 && currentIndex < lastIndex) {
      const prevPosition = cards[currentIndex - 1].position ?? this.bufferSpace;
      const nextPosition = cards[currentIndex + 1].position ?? this.bufferSpace;
      return (prevPosition + nextPosition) / 2;
    }
    if (cards.length > 1 && currentIndex === lastIndex) {
      const onBottomPosition =
        cards[lastIndex - 1].position ?? this.bufferSpace;
      return onBottomPosition + this.bufferSpace;
    }
    return 0;
  }

  createBoard(title: string, backgroundColor: Colors) {
    const token = this.token;
    return this.http.post<IBoard>(
      `${this.apiUrl}/api/v1/boards`,
      {
        title,
        backgroundColor,
      },
      { headers: { Authorization: `Bearer ${token}` || '' } }
    );
  }
}
