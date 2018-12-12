import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: './modules/main-menu/main-menu.module#MainMenuModule'
  },
  {
    path: 'game',
    loadChildren: './modules/game/game.module#GameModule'
  },
  {
    path: 'create',
    loadChildren: './modules/create/create.module#CreateModule'
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
            imports: [RouterModule.forRoot(routes)],
            exports: [RouterModule]
          })
export class AppRoutingModule {
}
