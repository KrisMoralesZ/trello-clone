import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardColor } from './card-color';

describe('CardColor', () => {
  let component: CardColor;
  let fixture: ComponentFixture<CardColor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardColor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardColor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
