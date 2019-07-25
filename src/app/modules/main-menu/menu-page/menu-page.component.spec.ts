import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MenuPageComponent} from './menu-page.component';
import {CommonModule} from '@angular/common';
import {SharedModule} from 'src/app/modules/shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {NgxSmartModalModule} from 'ngx-smart-modal';
import {EntitiesEngine} from 'src/app/modules/game/services/entities-engine.service';
import {StorageService} from 'src/app/modules/game/services/storage.service';
import {MapEngine} from 'src/app/modules/game/services/map-engine.service';
import {MapBuilder} from 'src/app/core/factories/map-builder';
import {MainMenuRoutingModule} from 'src/app/modules/main-menu/main-menu-routing/main-menu-routing.module';
import {RouterTestingModule} from '@angular/router/testing';

describe('MenuPageComponent', () => {
  let component: MenuPageComponent;
  let fixture: ComponentFixture<MenuPageComponent>;

  beforeEach(async(() => {
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
                                                 StorageService,
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
