import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { CardsService } from './cards-service';
import { HttpClient } from '@angular/common/http';

describe('CardsService', () => {
  let service: CardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpClient],
    });
    service = TestBed.inject(CardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update a card', () => {
    const updatedCard = {
      id: '1',
      title: 'Updated Card',
      description: 'Updated Description',
    };
    service
      .update(updatedCard.id, {
        title: updatedCard.title,
        description: updatedCard.description,
      })
      .subscribe((card) => {
        expect(card).toBeDefined();
        expect(card.title).toBe(updatedCard.title);
      });
  });
});
