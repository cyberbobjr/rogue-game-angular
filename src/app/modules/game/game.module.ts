import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {GameRoutingModule} from './game-routing.module';
import {MainPageComponent} from './pages/main-page/main-page.component';
import {MainMapComponent} from './pages/main-map/main-map.component';
import {InfoPageComponent} from './pages/info-page/info-page.component';
import {LogPageComponent} from './pages/log-page/log-page.component';
import {InventoryPageComponent} from './pages/inventory-page/inventory-page.component';
import {NgxSmartModalModule} from 'ngx-smart-modal';

@NgModule({
            declarations: [
              MainPageComponent,
              MainMapComponent,
              InfoPageComponent,
              LogPageComponent,
              InventoryPageComponent
            ],
            imports: [
              CommonModule,
              SharedModule,
              GameRoutingModule,
              NgxSmartModalModule.forChild()
            ]
          })
export class GameModule {
}
