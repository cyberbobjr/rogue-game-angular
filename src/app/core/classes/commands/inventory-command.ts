import {Command} from './command';
import {GameEngineService} from '../../../modules/game/services/game-engine.service';
import {Entity} from '../base/entity';
import {NgxSmartModalService} from 'ngx-smart-modal';

export class InventoryCommand implements Command {
  private _handleKeyBackup: any;

  constructor(private _modalService: NgxSmartModalService) {

  }

  execute(actor: Entity, gameEngine: GameEngineService) {
    this._handleKeyBackup = gameEngine.handleKeyEvent;
    gameEngine.handleKeyEvent = this.keyboardHandler.bind(this);
    this._modalService.getModal('inventoryModal')
        .open();
    this._modalService.getModal('inventoryModal')
        .onAnyCloseEvent
        .subscribe(() => {
          this._restoreKeyboardHandler(gameEngine);
        });
  }

  keyboardHandler(key: KeyboardEvent) {

  }

  private _restoreKeyboardHandler(gameEngine: GameEngineService) {
    if (this._handleKeyBackup) {
      gameEngine.handleKeyEvent = this._handleKeyBackup;
    }
  }
}
