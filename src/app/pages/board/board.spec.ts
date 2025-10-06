import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Board } from './board';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';

const fakeActivatedRoute = {
  boardId: 1,
  snapshot: {
    paramMap: { get: (key: string) => '1' },
  },
} as unknown as ActivatedRoute;

describe('Board', () => {
  let component: Board;
  let fixture: ComponentFixture<Board>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, Board],
      providers: [
        HttpClient,
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        {
          provide: 'BoardsService',
          useValue: {
            id: 1,
            title: 'Test Board',
            backgroundColor: 'sky',
            members: [],
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Board);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have null board on init', () => {
    expect(component.board).toBeNull();
  });

  it('should have null cardData on init', () => {
    expect(component.cardData).toBeNull();
  });

  it('should fetch board details on init', () => {
    const boardId = 1;
    spyOn<any>(component, 'getBoard').and.callThrough();
    component.ngOnInit();
    expect(component.getBoard).toHaveBeenCalledWith(boardId);
  });
});
