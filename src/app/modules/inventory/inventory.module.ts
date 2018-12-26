import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InventoryRoutingModule} from './inventory-routing.module';
import {InventoryModalComponent} from './pages/inventory/inventory-modal.component';
import {NgxSmartModalModule} from 'ngx-smart-modal';

@NgModule({
            declarations: [
              InventoryModalComponent
            ],
            imports: [
              CommonModule,
              InventoryRoutingModule,
              NgxSmartModalModule.forChild()
            ],
            exports: [InventoryModalComponent]
          })
export class InventoryModule {
}
