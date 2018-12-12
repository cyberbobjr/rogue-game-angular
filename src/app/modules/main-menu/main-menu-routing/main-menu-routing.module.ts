import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {MenuPageComponent} from '../menu-page/menu-page.component';

const secondaryRoutes: Routes = [
  {path: '', component: MenuPageComponent}
];

@NgModule({
            declarations: [],
            imports: [
              CommonModule,
              RouterModule.forChild(secondaryRoutes)
            ],
            exports: [RouterModule]
          })
export class MainMenuRoutingModule {
}
