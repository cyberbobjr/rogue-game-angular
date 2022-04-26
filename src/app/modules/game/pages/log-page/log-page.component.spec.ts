import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {LogPageComponent} from './log-page.component';
import {EventLog} from '../../../../core/classes/Utility/event-log';

describe('LogPageComponent', () => {
  let component: LogPageComponent;
  let fixture: ComponentFixture<LogPageComponent>;

  beforeEach(waitForAsync(() => {
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
