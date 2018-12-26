import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
import {InventoryModalComponent} from './pages/inventory/inventory-modal.component';

const inventoryRoutes: Routes = [
  {path: '', component: InventoryModalComponent}
];

@NgModule({
            declarations: [],
            imports: [
              CommonModule,
              RouterModule.forChild(inventoryRoutes)
            ],
            exports: [RouterModule]
          })
export class InventoryRoutingModule {
}
