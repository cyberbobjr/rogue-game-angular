import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {CreatePageComponent} from './create-page.component';
import {RouterTestingModule} from '@angular/router/testing';
import {SharedModule} from '../../shared/shared.module';
import {AbilityComponent} from '../ui/ability/ability.component';
import {DicesComponent} from '../ui/dices/dices.component';
import {RollDicesComponent} from '../ui/roll-dices/roll-dices.component';

describe('CreatePageComponent', () => {
  let component: CreatePageComponent;
  let fixture: ComponentFixture<CreatePageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
                                     imports: [
                                       RouterTestingModule,
                                       SharedModule
                                     ],
                                     declarations: [CreatePageComponent,
                                                    AbilityComponent,
                                                    DicesComponent,
                                                    RollDicesComponent]
                                   })
           .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
      .toBeTruthy();
  });
});
