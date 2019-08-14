import {AbstractCommand, Command} from '../../interfaces/command';
import {Entity} from '../base/entity';

export class InventoryCommand extends AbstractCommand implements Command {
  execute(actor: Entity) {
    this._gameEngine
        .getModalService()
        .getModal('inventoryModal')
        .open();
  }
}
