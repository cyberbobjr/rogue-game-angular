import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {MainMapComponent} from './main-map.component';
import {SharedModule} from '../../../shared/shared.module';
import {RouterTestingModule} from '@angular/router/testing';
import {NgxSmartModalModule} from 'ngx-smart-modal';

describe('MainMapComponent', () => {
  let component: MainMapComponent;
  let fixture: ComponentFixture<MainMapComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
                                     imports: [SharedModule,
                                               RouterTestingModule,
                                               NgxSmartModalModule.forRoot()],
                                     declarations: [MainMapComponent]
                                   })
           .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
      .toBeTruthy();
  });

});
