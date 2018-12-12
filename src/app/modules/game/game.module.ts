import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {GameRoutingModule} from './game-routing.module';
import {MainPageComponent} from './pages/main-page/main-page.component';
import {MainMapComponent} from './pages/main-map/main-map.component';
import {InfoPageComponent} from './pages/info-page/info-page.component';

@NgModule({
            declarations: [
              MainPageComponent,
              MainMapComponent,
              InfoPageComponent
            ],
            imports: [
              CommonModule,
              SharedModule,
              GameRoutingModule
            ]
          })
export class GameModule {
}
