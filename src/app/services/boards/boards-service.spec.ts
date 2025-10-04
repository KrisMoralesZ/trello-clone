import { AuthService } from '@services/auth/auth-service';
import { TestBed } from '@angular/core/testing';

import { BoardsService } from './boards-service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { IBoard } from '@models/boards.model';

describe('BoardsService', () => {
  let service: BoardsService;
  let httpMock: HttpTestingController;
  const apiUrl = 'https://fake-trello-api.herokuapp.com';
  const mockToken = 'Bearer ';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService, BoardsService, HttpClient],
    });
    service = TestBed.inject(BoardsService);
    httpMock = TestBed.inject(HttpTestingController);
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call GET /api/v1/boards with Authorization header when token is present', () => {
    const mockBoards: IBoard[] = [
      { id: 1, title: 'Board 1', backgroundColor: 'green', members: [] },
    ];
    localStorage.setItem('access_token', mockToken);

    service.getBoards().subscribe((boards) => {
      expect(boards).toEqual(mockBoards);
    });

    const req = httpMock.expectOne(`${apiUrl}/api/v1/boards`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe(`${mockToken}`);

    req.flush(mockBoards);
  });

  it('should call GET /api/v1/boards with empty Authorization header when token is missing', () => {
    const mockBoards: IBoard[] = [];

    service.getBoards().subscribe((boards) => {
      expect(boards).toEqual(mockBoards);
    });

    const req = httpMock.expectOne(`${apiUrl}/api/v1/boards`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe(mockToken);

    req.flush(mockBoards);
  });
});
