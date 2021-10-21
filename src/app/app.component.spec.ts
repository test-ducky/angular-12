import { TestBed } from '@angular/core/testing';
import { Utils } from '../utils';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';

describe('AppComponent', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [AppModule],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should show 'Hello World'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const nativeEl = fixture.debugElement.nativeElement;
    expect(nativeEl.querySelector('div').textContent).toContain('Hello World');
  });

  it(`should show the current name of the month`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const nativeEl = fixture.debugElement.nativeElement;
    expect(nativeEl.querySelector('div').textContent).toContain('January');
  });

  it(`should calculate the full name of the month from the system date`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    const mockDate = new Date();
    mockDate.setMonth(11);
    spyOn(Utils, 'getDate').and.returnValue(mockDate);
    expect(app.getCurrentMonth()).toEqual('December');
  });
});
