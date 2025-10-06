import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DIALOG_DATA, DialogModule, DialogRef } from '@angular/cdk/dialog';
import { By } from '@angular/platform-browser';
import { Modal } from './modal';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '@services/auth/auth-service';
import { CommonModule } from '@angular/common';

describe('Modal', () => {
  let component: Modal;
  let fixture: ComponentFixture<Modal>;
  let dialogRefSpy: jasmine.SpyObj<DialogRef<{ response: boolean }>>;

  const mockItem = { title: 'Test Task', description: 'This is a test task' };

  beforeEach(async () => {
    dialogRefSpy = jasmine.createSpyObj('DialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, CommonModule, Modal, DialogModule],
      providers: [
        AuthService,
        HttpClient,
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
    const titleEl = fixture.debugElement.query(By.css('.modal-title'));
    expect(titleEl.nativeElement.textContent).toContain('Test Task');
  });

  it('should call closeModal() when close button is clicked', () => {
    const closeBtn = fixture.debugElement.query(
      By.css('button[type="button"]')
    );
    closeBtn.triggerEventHandler('click', null);

    expect(dialogRefSpy.close).toHaveBeenCalledWith({ response: false });
  });

  // it('should render action buttons (Members, Labels, Checklist, Dates)', () => {
  //   const actionButtons = fixture.debugElement.queryAll(
  //     By.css('.action-button')
  //   );
  //   expect(actionButtons.length).toBe(4);
  //   expect(actionButtons[0].nativeElement.textContent).toContain('Members');
  //   expect(actionButtons[1].nativeElement.textContent).toContain('Labels');
  //   expect(actionButtons[2].nativeElement.textContent).toContain('Checklist');
  //   expect(actionButtons[3].nativeElement.textContent).toContain('Dates');
  // });

  it('should call closeModal with true when invoked directly', () => {
    component.closeModal(true);
    expect(dialogRefSpy.close).toHaveBeenCalledWith({ response: true });
  });
});
