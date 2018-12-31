import {MainPageComponent} from './pages/main-page/main-page.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
import {GameOverComponent} from './pages/game-over/game-over.component';

const gameRoutes: Routes = [
  {path: '**', component: MainPageComponent},
  {path: 'game-over', component: GameOverComponent}
];

@NgModule({
            declarations: [],
            imports: [
              CommonModule,
              RouterModule.forChild(gameRoutes)
            ],
            exports: [RouterModule]
          })
export class GameRoutingModule {
}
