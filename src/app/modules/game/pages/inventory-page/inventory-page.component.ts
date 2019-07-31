import {Component, OnInit} from '@angular/core';
import {EntitiesEngine} from '../../services/entities-engine.service';
import {Player} from '../../../../core/classes/entities/player';
import {SlotType} from '../../../../core/enums/equiped-type.enum';
import {Utility} from '../../../../core/classes/Utility/utility';

@Component({
  selector: 'app-inventory-page',
  templateUrl: './inventory-page.component.html',
  styleUrls: ['./inventory-page.component.css']
})
export class InventoryPageComponent implements OnInit {
  constructor(private _entitiesService: EntitiesEngine) {
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
