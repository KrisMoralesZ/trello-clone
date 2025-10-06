import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { NewBoardForm } from './new-board-form';

describe('NewBoardForm', () => {
  let component: NewBoardForm;
  let fixture: ComponentFixture<NewBoardForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewBoardForm, HttpClientTestingModule],
      providers: [HttpClient],
    }).compileComponents();

    fixture = TestBed.createComponent(NewBoardForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default title as empty string', () => {
    expect(component.form.get('title')?.value).toBe('');
  });

  it('should have default backgroundColor as sky', () => {
    expect(component.form.get('backgroundColor')?.value).toBe('sky');
  });

  it('should mark title as invalid if empty', () => {
    const titleControl = component.form.get('title');
    titleControl?.setValue('');
    expect(titleControl?.invalid).toBeFalse();
  });

  it('should mark title as valid if not empty', () => {
    const titleControl = component.form.get('title');
    titleControl?.setValue('New Board');
    expect(titleControl?.valid).toBeTrue();
  });
});
