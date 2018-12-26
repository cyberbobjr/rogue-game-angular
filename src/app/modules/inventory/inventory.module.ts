import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InventoryRoutingModule} from './inventory-routing.module';
import {NgxSmartModalModule} from 'ngx-smart-modal';
import {InventoryModalComponent} from './pages/inventory/inventory-modal.component';

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
