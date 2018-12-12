import {NgModule} from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {MainPageComponent} from './modules/game/pages/main-page/main-page.component';

const routes: Routes = [
  {
    path: 'main',
    component: MainPageComponent
  },
  {
    path: '',
    pathMatch: 'full',
    loadChildren: './modules/main-menu/main-menu.module#MainMenuModule'
  },
  {
    path: '**',
    redirectTo: 'index'
  }
];

@NgModule({
            imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
            exports: [RouterModule]
          })
export class AppRoutingModule {
}
