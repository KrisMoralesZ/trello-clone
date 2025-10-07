import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ListsService } from './lists-service';
import { HttpClient } from '@angular/common/http';

describe('ListsService', () => {
  let service: ListsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpClient],
    });
    service = TestBed.inject(ListsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve lists', () => {
    const boardId = 123;
    const mockLists = [
      { id: '1', name: 'List 1', boardId: boardId },
      { id: '2', name: 'List 2', boardId: boardId },
    ];
    const createListDto = {
      title: 'List 1',
      boardId: boardId,
      position: 1,
    };
    service.createList(createListDto).subscribe((list) => {
      expect(list).toEqual(jasmine.objectContaining(createListDto));
      expect(list.id).toBeDefined();
      expect(list.title).toBe(createListDto.title);
      expect(list.id).toBe(createListDto.boardId);
    });
  });
});
