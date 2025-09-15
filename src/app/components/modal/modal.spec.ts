import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { By } from '@angular/platform-browser';
import { Modal } from './modal';

describe('Modal', () => {
  let component: Modal;
  let fixture: ComponentFixture<Modal>;
  let dialogRefSpy: jasmine.SpyObj<DialogRef<{ response: boolean }>>;

  const mockItem = {
    id: '1',
    title: 'Test Task',
    description: 'Some description',
  };

  beforeEach(async () => {
    dialogRefSpy = jasmine.createSpyObj('DialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [Modal],
      providers: [
        { provide: DialogRef, useValue: dialogRefSpy },
        { provide: DIALOG_DATA, useValue: { item: mockItem } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Modal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create modal', () => {
    expect(component).toBeTruthy();
  });
  it('should display modal title from data', () => {
    const title = fixture.debugElement.query(By.css('h3')).nativeElement;
    expect(title.textContent).toContain(mockItem.title);
  });

  it('should call closeModal() when close button is clicked', () => {
    const closeBtn = fixture.debugElement.query(
      By.css('button[type="button"]')
    );
    closeBtn.triggerEventHandler('click', null);

    expect(dialogRefSpy.close).toHaveBeenCalledWith({ response: false });
  });

  it('should render action buttons (Members, Labels, Checklist, Dates)', () => {
    const buttons = fixture.debugElement.queryAll(By.css('app-button'));
    const buttonTexts = buttons.map((btn) =>
      btn.nativeElement.textContent.trim()
    );

    expect(buttonTexts).toContain('Members');
    expect(buttonTexts).toContain('Labels');
    expect(buttonTexts).toContain('Checklist');
    expect(buttonTexts).toContain('Dates');
  });

  it('should call closeModal with true when invoked directly', () => {
    component.closeModal(true);
    expect(dialogRefSpy.close).toHaveBeenCalledWith({ response: true });
  });
});
