import {TestBed, async} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {SharedModule} from './modules/shared/shared.module';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
                                     imports: [
                                       RouterTestingModule,
                                       SharedModule
                                     ],
                                     declarations: [
                                       AppComponent
                                     ],
                                   })
           .compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app)
      .toBeTruthy();
  });

  it(`should have as title 'TsRogue'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title)
      .toEqual('TsRogue');
  });
});
