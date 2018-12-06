import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainPageComponent} from './pages/main-page/main-page.component';
import {CreatePageComponent} from './pages/create-page/create-page.component';

const routes: Routes = [
  {
    path: 'main',
    component: MainPageComponent
  },
  {
    path: 'create',
    component: CreatePageComponent
  }
];

@NgModule({
            imports: [RouterModule.forRoot(routes)],
            exports: [RouterModule]
          })
export class AppRoutingModule {
}
