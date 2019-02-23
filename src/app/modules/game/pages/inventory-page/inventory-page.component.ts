import {Component, OnInit} from '@angular/core';
import {EntitiesManager} from '../../services/entities-manager.service';
import {Player} from '../../../../core/classes/entities/player';
import {SlotType} from '../../../../core/enums/equiped-type.enum';
import {Utility} from '../../../../core/classes/utility';

@Component({
  selector: 'app-inventory-page',
  templateUrl: './inventory-page.component.html',
  styleUrls: ['./inventory-page.component.css']
})
export class InventoryPageComponent implements OnInit {
  constructor(private _entitiesService: EntitiesManager) {
  }

  ngOnInit() {
  }

  getPlayer(): Player {
    return this._entitiesService.getPlayer();
  }

  getSlotTypeLabel(slot: SlotType) {
    return Utility.getSlotTypeLabel(slot);
  }
}
