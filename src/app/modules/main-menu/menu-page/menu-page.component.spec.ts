import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {MenuPageComponent} from './menu-page.component';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {NgxSmartModalModule} from 'ngx-smart-modal';
import {RouterTestingModule} from '@angular/router/testing';
import {MapEngine} from '@core/core/engines/map-engine';
import {MainMenuRoutingModule} from '../main-menu-routing/main-menu-routing.module';
import {EntitiesEngine} from '@core/core/engines/entities-engine';
import {MapBuilder} from '@core/factories/map-builder';
import {StorageEngine} from '@services/storage-engine.service';
import {SharedModule} from '../../shared/shared.module';

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
