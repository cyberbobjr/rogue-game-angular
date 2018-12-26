import {Command} from './command';
import {GameEngineService} from '../../../modules/game/services/game-engine.service';
import {Entity} from '../base/entity';

export class InventoryCommand implements Command {
  constructor() {
  }

  execute(actor: Entity, gameEngine: GameEngineService) {
    gameEngine.getModalService()
              .getModal('inventoryModal')
              .open();
  }
}
