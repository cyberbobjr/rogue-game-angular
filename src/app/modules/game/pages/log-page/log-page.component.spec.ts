import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LogPageComponent} from './log-page.component';
import {EventLog} from '../../../../core/classes/event-log';

describe('LogPageComponent', () => {
  let component: LogPageComponent;
  let fixture: ComponentFixture<LogPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
                                     declarations: [LogPageComponent]
                                   })
           .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
      .toBeTruthy();
  });

  it('should display log info', () => {
    const message = 'DISPLAY LOG TEST';
    EventLog.getInstance().message = message;
    fixture.detectChanges();
    const element: HTMLElement = fixture.debugElement.nativeElement;
    expect(element.innerText)
      .toContain(message);
  });
});
