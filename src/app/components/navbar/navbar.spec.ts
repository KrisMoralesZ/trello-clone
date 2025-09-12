import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Navbar } from './navbar';

describe('Navbar', () => {
  let component: Navbar;
  let fixture: ComponentFixture<Navbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Navbar],
    }).compileComponents();

    fixture = TestBed.createComponent(Navbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render logo with routerLink /', () => {
    const logo = fixture.debugElement.query(By.css('a[routerLink="/"] img'));
    expect(logo).toBeTruthy();
    expect(logo.nativeElement.getAttribute('alt')).toBe('logo');
  });

  it('should render navigation links', () => {
    const links = fixture.debugElement.queryAll(By.css('ul li a'));
    const linkTexts = links.map((el) => el.nativeElement.textContent.trim());

    expect(linkTexts).toContain('Workspaces');
    expect(linkTexts).toContain('Recent');
  });

  it('should render Create button', () => {
    const button = fixture.debugElement.query(By.css('app-button'));
    expect(button).toBeTruthy();
    expect(button.nativeElement.textContent).toContain('Create');
  });

  it('should render user photo', () => {
    const userImg = fixture.debugElement.query(By.css('button img'));
    expect(userImg).toBeTruthy();
    expect(userImg.nativeElement.getAttribute('alt')).toBe('user photo');
  });
});
