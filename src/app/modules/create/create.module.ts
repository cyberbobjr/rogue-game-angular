import {NgModule} from '@angular/core';
import {CreatePageComponent} from './create-page/create-page.component';
import {AbilityComponent} from './ui/ability/ability.component';
import {DicesComponent} from './ui/dices/dices.component';
import {RollDicesComponent} from './ui/roll-dices/roll-dices.component';
import {SharedModule} from '../shared/shared.module';
import {CreateRoutingModule} from './create-routing/create-routing.module';

@NgModule({
            declarations: [
              CreatePageComponent,
              AbilityComponent,
              DicesComponent,
              RollDicesComponent
            ],
            imports: [
              SharedModule,
              CreateRoutingModule
            ]
          })
export class CreateModule {
}
