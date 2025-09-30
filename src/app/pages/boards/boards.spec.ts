import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Boards } from './boards';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '@services/auth/auth-service';
import { BoardsService } from '@services/boards/boards-service';
import { IBoard } from '@models/boards.model';
import { of, throwError } from 'rxjs';

class MockBoardsService {
  getBoards = jasmine.createSpy('getBoards');
}

describe('Boards', () => {
  let component: Boards;
  let fixture: ComponentFixture<Boards>;
  let boardsService: MockBoardsService;

  const mockBoards: IBoard[] = [
    { id: 1, title: 'Board 1', backgroundColor: 'sky', members: [] },
    { id: 2, title: 'Board 2', backgroundColor: 'green', members: [] },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        BoardsService,
        { provide: BoardsService, useClass: MockBoardsService },
        HttpClient,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Boards);
    component = fixture.componentInstance;
    boardsService = TestBed.inject(
      BoardsService
    ) as unknown as MockBoardsService;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getBoards on ngOnInit', () => {
    spyOn(component, 'getBoards');
    component.ngOnInit();
    expect(component.getBoards).toHaveBeenCalled();
  });

  it('should load boards and update dataSource when service returns data', () => {
    boardsService.getBoards.and.returnValue(of(mockBoards));
    spyOn(component.dataSource, 'setData');

    component.getBoards();

    expect(component.boards).toEqual(mockBoards);
    expect(component.dataSource.setData).toHaveBeenCalledWith(mockBoards);
  });

  it('should log an error when service fails', () => {
    const consoleSpy = spyOn(console, 'error');
    boardsService.getBoards.and.returnValue(
      throwError(() => new Error('fail'))
    );

    component.getBoards();

    expect(consoleSpy).toHaveBeenCalledWith(
      'Error fetching boards:',
      jasmine.any(Error)
    );
  });

  it('should call dataSource.filterData with trimmed lowercased value', () => {
    spyOn(component.dataSource, 'filterData');
    const inputEvent = {
      target: { value: '  My Filter  ' },
    } as unknown as Event;

    component.applyFilter(inputEvent);

    expect(component.dataSource.filterData).toHaveBeenCalledWith('my filter');
  });
});
