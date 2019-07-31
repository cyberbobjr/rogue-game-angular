import {GameEngine} from '../../../modules/game/services/game-engine.service';
import {Entity} from '../base/entity';

export class ChooseTarget {
  private _currentTargetIndex: number;
  private readonly _targets: Array<Entity>;
  private _bgColorBackup: string;

  get currentTargetIndex(): number {
    return this._currentTargetIndex;
  }

  constructor(private _gameEngine: GameEngine, private _options: { keyAction: string }, private _callbackFn: (targets: Entity[] | null) => void) {
    this._targets = _gameEngine.getEntitiesVisibles();
    if (this._targets.length > 0) {
      this._currentTargetIndex = 0;
      this._gameEngine.handleKeyEvent = this.keyboardHandler.bind(this);
    } else {
      this._callbackFn(null);
    }
  }

  keyboardHandler(key: KeyboardEvent) {
    switch (key.code) {
      case 'Plus':
        this._setNextTarget();
        break;
      case 'Minus':
        this._setPreviousTarget();
        break;
      case this._options.keyAction:
        this._fireTarget();
        this._restoreGameEngineKeyHandler();
        break;
      default:
        this._cancelAction();
        this._restoreGameEngineKeyHandler();
        break;
    }
  }

  private _restoreGameEngineKeyHandler() {
    this._restoreBgColor();
    this._gameEngine.restoreGameKeyHandler();
  }

  private _restoreBgColor() {
    if (this._targets.length > 0) {
      this._targets[this._currentTargetIndex].sprite.bgColor = this._bgColorBackup;
    }
  }

  private _setTargetBgColor() {
    if (this._targets.length > 0) {
      this._bgColorBackup = this._targets[this._currentTargetIndex].sprite.bgColor;
      this._targets[this._currentTargetIndex].sprite.bgColor = 'green';
    }
  }

  private _setNextTarget() {
    this._restoreBgColor();
    this._currentTargetIndex++;
    if (this._currentTargetIndex > this._targets.length - 1) {
      this._currentTargetIndex = 0;
    }
    this._setTargetBgColor();
  }

  private _setPreviousTarget() {
    this._restoreBgColor();
    this._currentTargetIndex--;
    if (this._currentTargetIndex < 0) {
      this._currentTargetIndex = this._targets.length - 1;
    }
    this._setTargetBgColor();
  }

  private _fireTarget() {
    this._callbackFn([this._targets[this._currentTargetIndex]]);
  }

  private _cancelAction() {
    this._callbackFn(null);
  }
}
