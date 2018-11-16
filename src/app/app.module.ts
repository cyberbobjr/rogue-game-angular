import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MainPageComponent} from './pages/main-page/main-page.component';
import {MainMapComponent} from './pages/main-map/main-map.component';
import {InfoPageComponent} from './pages/info-page/info-page.component';

@NgModule({
            declarations: [
              AppComponent,
              MainPageComponent,
              MainMapComponent,
              InfoPageComponent
            ],
            imports: [
              BrowserModule,
              AppRoutingModule
            ],
            providers: [
            ],
            bootstrap: [AppComponent]
          })
export class AppModule {
}
