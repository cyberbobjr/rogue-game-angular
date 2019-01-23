import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MainPageComponent} from './main-page.component';
import {SharedModule} from '../../../shared/shared.module';
import {NgxSmartModalModule} from 'ngx-smart-modal';
import {InventoryModule} from '../../../inventory/inventory.module';
import {RouterTestingModule} from '@angular/router/testing';
import {MainMapComponent} from '../main-map/main-map.component';
import {InfoPageComponent} from '../info-page/info-page.component';
import {InventoryPageComponent} from '../inventory-page/inventory-page.component';
import {LogPageComponent} from '../log-page/log-page.component';

describe('MainPageComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
                                     imports: [SharedModule,
                                               NgxSmartModalModule.forRoot(),
                                               InventoryModule,
                                               RouterTestingModule],
                                     declarations: [MainPageComponent,
                                                    MainMapComponent,
                                                    InfoPageComponent,
                                                    InventoryPageComponent,
                                                    LogPageComponent]
                                   })
           .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
      .toBeTruthy();
  });
});
