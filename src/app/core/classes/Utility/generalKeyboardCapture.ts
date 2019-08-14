import {KeyboardCapture} from '../../interfaces/keyboardCapture';
import {Entity} from '../base/entity';
import {CommandsService} from '../../../modules/game/services/commands.service';
import {GameEngine} from '../../interfaces/game-engine';

export class GeneralKeyboardCapture implements KeyboardCapture {
  constructor(private _gameEngine: GameEngine,
              private _commandEngine: CommandsService) {
  }

  handleActionKeyEvent(key: KeyboardEvent): void {
    const player: Entity = this._gameEngine.getPlayer() as Entity;
    switch (key.key) {
      case 'ArrowUp':
        this._commandEngine.ArrowUp.execute(player);
        break;
      case 'ArrowLeft':
        this._commandEngine.ArrowLeft.execute(player);
        break;
      case 'ArrowDown':
        this._commandEngine.ArrowDown.execute(player);
        break;
      case 'ArrowRight':
        this._commandEngine.ArrowRight.execute(player);
        break;
      case 'q':
        this._commandEngine.Keyq.execute(player);
        break;
      case 'z':
        this._commandEngine.Keyz.execute(player);
        break;
      case 'a':
        this._commandEngine.Keya.execute(player);
        break;
      case 'e':
        this._commandEngine.Keye.execute(player);
        break;
      case 'w':
        this._commandEngine.Keyw.execute(player);
        break;
      case 'c':
        this._commandEngine.Keyc.execute(player);
        break;
      case 'C':
        this._commandEngine.KeyC.execute(player);
        break;
      case 'x':
        this._commandEngine.Keyx.execute(player);
        break;
      case 'd':
        this._commandEngine.Keyd.execute(player);
        break;
      case 'o':
        this._commandEngine.Keyo.execute(player);
        break;
      case 's':
        this._commandEngine.Keys.execute(player);
        break;
      case 't':
        this._commandEngine.Keyt.execute(player);
        break;
      case 'f':
        this._commandEngine.Keyf.execute(player);
        break;
      case 'i':
        this._commandEngine.Keyi.execute(player);
        break;
      case ' ':
        this._commandEngine.KeySpace.execute(player);
        break;
      case '<':
        this._commandEngine.KeyDown.execute(player);
        break;
      case '>':
        this._commandEngine.KeyUp.execute(player);
        break;
    }
    this._gameEngine.executeEntitiesActions();
  }
}
