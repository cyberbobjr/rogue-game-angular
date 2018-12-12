import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MainPageComponent} from './modules/game/pages/main-page/main-page.component';
import {MainMapComponent} from './modules/game/pages/main-map/main-map.component';
import {InfoPageComponent} from './modules/game/pages/info-page/info-page.component';
import {CreateModule} from './modules/create/create.module';
import {SharedModule} from './modules/shared/shared.module';
import {CreateRoutingModule} from './modules/create/create-routing/create-routing.module';

@NgModule({
            declarations: [
              AppComponent,
              MainPageComponent,
              MainMapComponent,
              InfoPageComponent
            ],
            imports: [
              CreateModule,
              BrowserModule,
              AppRoutingModule,
              CreateRoutingModule,
              SharedModule
            ],
            providers: [],
            bootstrap: [AppComponent]
          })
export class AppModule {
}
