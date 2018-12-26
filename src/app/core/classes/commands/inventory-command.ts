import {Command} from './command';
import {GameEngineService} from '../../../modules/game/services/game-engine.service';
import {Entity} from '../base/entity';
import {NgxSmartModalService} from 'ngx-smart-modal';

export class InventoryCommand implements Command {
  constructor(private _modalService: NgxSmartModalService) {
  }

  execute(actor: Entity, gameEngine: GameEngineService) {
    this._modalService.getModal('inventoryModal')
        .open();
  }
}
