import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InventoryRoutingModule} from './inventory-routing.module';
import {NgxSmartModalModule} from 'ngx-smart-modal';
import {InventoryModalComponent} from './pages/inventory/inventory-modal.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
            declarations: [
              InventoryModalComponent
            ],
            imports: [
              CommonModule,
              InventoryRoutingModule,
              SharedModule,
              NgxSmartModalModule.forChild()
            ],
            exports: [InventoryModalComponent]
          })
export class InventoryModule {
}
