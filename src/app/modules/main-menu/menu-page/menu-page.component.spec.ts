import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {MenuPageComponent} from './menu-page.component';
import {CommonModule} from '@angular/common';
import {SharedModule} from 'src/app/modules/shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {NgxSmartModalModule} from 'ngx-smart-modal';
import {EntitiesEngine} from 'src/app/services/entities-engine.service';
import {StorageEngine} from 'src/app/services/storage-engine.service';
import {MapEngine} from 'src/app/services/map-engine.service';
import {MapBuilder} from 'src/app/core/factories/map-builder';
import {MainMenuRoutingModule} from 'src/app/modules/main-menu/main-menu-routing/main-menu-routing.module';
import {RouterTestingModule} from '@angular/router/testing';

describe('MenuPageComponent', () => {
  let component: MenuPageComponent;
  let fixture: ComponentFixture<MenuPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
                                     declarations: [MenuPageComponent],
                                     imports: [CommonModule,
                                               SharedModule,
                                               BrowserAnimationsModule,
                                               BrowserModule,
                                               MainMenuRoutingModule,
                                               RouterTestingModule,
                                               NgxSmartModalModule.forRoot()],
                                     providers: [EntitiesEngine,
                                                 StorageEngine,
                                                 MapEngine,
                                                 MapBuilder]
                                   })
           .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
      .toBeTruthy();
  });
});
