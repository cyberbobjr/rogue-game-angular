import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SharedModule} from './modules/shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {InventoryModule} from './modules/inventory/inventory.module';

@NgModule({
            declarations: [
              AppComponent
            ],
            imports: [
              BrowserAnimationsModule,
              BrowserModule,
              AppRoutingModule,
              SharedModule,
              InventoryModule
            ],
            providers: [],
            bootstrap: [AppComponent]
          })
export class AppModule {
}
