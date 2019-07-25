import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RollDicesComponent} from './roll-dices.component';
import {SharedModule} from '../../../shared/shared.module';

describe('RollDicesComponent', () => {
  let component: RollDicesComponent;
  let fixture: ComponentFixture<RollDicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
                                     imports: [SharedModule],
                                     declarations: [RollDicesComponent]
                                   })
           .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RollDicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
      .toBeTruthy();
  });
});
