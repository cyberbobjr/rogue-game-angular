import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MainPageComponent} from './pages/main-page/main-page.component';
import {MainMapComponent} from './pages/main-map/main-map.component';
import {Entity} from './classes/entity';

@NgModule({
            declarations: [
              AppComponent,
              MainPageComponent,
              MainMapComponent
            ],
            imports: [
              BrowserModule,
              AppRoutingModule
            ],
            providers: [
              {provide: 'Player', useClass: Entity}
            ],
            bootstrap: [AppComponent]
          })
export class AppModule {
}
