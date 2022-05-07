import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MenuPageComponent} from './menu-page/menu-page.component';
import {MainMenuRoutingModule} from './main-menu-routing/main-menu-routing.module';

@NgModule({
    declarations: [MenuPageComponent],
    imports: [
        CommonModule,
        MainMenuRoutingModule
    ]
})
export class MainMenuModule {
}
