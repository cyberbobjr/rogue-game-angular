import {Component, Input, OnInit} from '@angular/core';
import {Player} from '@core/core/entities/player';
import {SlotType} from '@core/enums/equiped-type.enum';
import {Utility} from '@core/core/Utility/utility';

@Component({
    selector: 'app-inventory-page',
    templateUrl: './inventory-page.component.html',
    styleUrls: ['./inventory-page.component.scss']
})
export class InventoryPageComponent implements OnInit {
    @Input() player: Player;

    constructor() {
    }

    ngOnInit() {
    }

    getSlotTypeLabel(slot: SlotType) {
        return Utility.getSlotTypeLabel(slot);
    }
}
