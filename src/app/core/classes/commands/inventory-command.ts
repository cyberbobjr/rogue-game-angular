import {AbstractCommand, Command} from '../../interfaces/command';

export class InventoryCommand extends AbstractCommand implements Command {
  execute() {
    this._gameEngine
        .getModalService()
        .getModal('inventoryModal')
        .open();
  }
}
