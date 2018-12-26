import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InventoryRoutingModule} from './inventory-routing.module';
import {InventoryModalComponent} from './pages/inventory/inventory-modal.component';

@NgModule({
            declarations: [
              InventoryModalComponent
            ],
            imports: [
              CommonModule,
              InventoryRoutingModule
            ],
            exports: [InventoryModalComponent]
          })
export class InventoryModule {
}
