import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CreatePageComponent} from '../create-page/create-page.component';
import {Routes, RouterModule} from '@angular/router';

const secondaryRoutes: Routes = [
  {path: '', component: CreatePageComponent}
];

@NgModule({
            declarations: [],
            imports: [
              CommonModule,
              RouterModule.forChild(secondaryRoutes)
            ],
            exports: [RouterModule]
          })
export class CreateRoutingModule {
}
