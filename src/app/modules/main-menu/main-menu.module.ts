import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {MenuPageComponent} from './menu-page/menu-page.component';
import {MainMenuRoutingModule} from './main-menu-routing/main-menu-routing.module';

@NgModule({
    declarations: [MenuPageComponent],
    imports: [
        CommonModule,
        SharedModule,
        MainMenuRoutingModule
    ]
})
export class MainMenuModule {
}
