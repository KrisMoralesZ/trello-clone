import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBoardForm } from './new-board-form';

describe('NewBoardForm', () => {
  let component: NewBoardForm;
  let fixture: ComponentFixture<NewBoardForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewBoardForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewBoardForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
