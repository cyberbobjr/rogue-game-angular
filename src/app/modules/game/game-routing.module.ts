import {MainPageComponent} from './pages/main-page/main-page.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';

const secondaryRoutes: Routes = [
  {path: '', component: MainPageComponent}
];

@NgModule({
            declarations: [],
            imports: [
              CommonModule,
              RouterModule.forChild(secondaryRoutes)
            ],
            exports: [RouterModule]
          })
export class GameRoutingModule {
}
