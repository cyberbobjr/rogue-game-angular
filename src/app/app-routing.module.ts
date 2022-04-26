import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/main-menu/main-menu.module').then(m => m.MainMenuModule)
  },
  {
    path: 'game',
    loadChildren: () => import('./modules/game/game.module').then(m => m.GameModule)
  },
  {
    path: 'create',
    loadChildren: () => import('./modules/create/create.module').then(m => m.CreateModule)
  },
  {
    path: 'inventory',
    loadChildren: () => import('./modules/inventory/inventory.module').then(m => m.InventoryModule)
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
            imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
            exports: [RouterModule]
          })
export class AppRoutingModule {
}
