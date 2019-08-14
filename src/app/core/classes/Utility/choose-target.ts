import {Entity} from '../base/entity';
import {KeyboardCapture} from '../../interfaces/keyboardCapture';
import {TargetKeyboardCapture} from './targetKeyboardCapture';
import {GameEngine} from '../../interfaces/game-engine';

export class ChooseTarget {
  private readonly _targets: Array<Entity>;
  private readonly _currentTargetIndex: number;
  private readonly _targetKeyboardHandler: TargetKeyboardCapture;

  get currentTargetIndex(): number {
    return this._targetKeyboardHandler.getCurrentTargetIndex();
  }

  get keyboardHandler(): KeyboardCapture {
    return this._targetKeyboardHandler;
  }

  constructor(private _gameEngine: GameEngine,
              private _options: { keyAction: string },
              private _callbackFn: (targets: Entity[] | null) => void) {
    this._targets = _gameEngine.getEntitiesVisibles();

    if (this._targets.length > 0) {
      this._currentTargetIndex = 0;
      this._targetKeyboardHandler = new TargetKeyboardCapture(this._targets, _options, this.restoreGameEngineKeyboardHandler.bind(this));
      this._gameEngine.setHandleKeyEvent(this._targetKeyboardHandler);
    } else {
      this._callbackFn(null);
    }
  }

  restoreGameEngineKeyboardHandler(targets: Entity[] | null) {
    this._gameEngine.captureKeyboardEvent();
    this._callbackFn(targets);
  }
}
