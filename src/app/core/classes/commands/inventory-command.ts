import {Command} from './command';
import {GameEngine} from '../../../modules/game/services/game-engine.service';
import {Entity} from '../base/entity';

export class InventoryCommand implements Command {
  constructor() {
  }

  execute(actor: Entity, gameEngine: GameEngine) {
    gameEngine.getModalService()
              .getModal('inventoryModal')
              .open();
  }
}
