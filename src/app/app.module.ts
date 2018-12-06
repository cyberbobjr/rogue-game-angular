import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MainPageComponent} from './pages/main-page/main-page.component';
import {MainMapComponent} from './pages/main-map/main-map.component';
import {InfoPageComponent} from './pages/info-page/info-page.component';
import {CreatePageComponent} from './pages/create-page/create-page.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {ButtonModule} from 'primeng/button';
import {RollDiceComponent} from './pages/ui/roll-dice/roll-dice.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
            declarations: [
              AppComponent,
              MainPageComponent,
              MainMapComponent,
              InfoPageComponent,
              CreatePageComponent,
              RollDiceComponent
            ],
            imports: [
              BrowserModule,
              AppRoutingModule,
              BrowserAnimationsModule,
              HttpClientModule,
              ButtonModule,
              TranslateModule.forRoot({
                                        loader: {
                                          provide: TranslateLoader,
                                          useFactory: HttpLoaderFactory,
                                          deps: [HttpClient]
                                        }
                                      })
            ],
            providers: [],
            bootstrap: [AppComponent]
          })
export class AppModule {
}
