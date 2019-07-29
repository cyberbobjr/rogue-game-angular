import {Action} from '../../interfaces/action';
import {Entity} from '../base/entity';
import {ActionResult} from './action-result';
import {GameEngine} from '../../../modules/game/services/game-engine.service';
import {EventLog} from '../event-log';
import {CombatResolver} from '../../rules/combat/combat-resolver';

export class AttackDistanceAction implements Action {
  private _currentTargetIndex: number;
  private _targets: Array<Entity> = [];
  private _bgColorBackup: string;
  private _gameEngine: GameEngine = null;
  private _actor: Entity;

  constructor() {
  }

  execute(actor: Entity, gameEngine: GameEngine): ActionResult {
    this._actor = actor;
    this._gameEngine = gameEngine;
    this._targets = gameEngine.getEntitiesVisibles();
    console.log('Targets :');
    console.log('=========');
    console.log(this._targets);
    if (this._targets.length === 0) {
      EventLog.getInstance().message = 'No target in range !';
      return ActionResult.SUCCESS;
    }
    this._currentTargetIndex = 0;
    this._setTargetBgColor();
    this._gameEngine.handleKeyEvent = this.keyboardHandler.bind(this);
    return ActionResult.WAIT;
  }

  getInfo(): string {
    return '';
  }

  keyboardHandler(key: KeyboardEvent) {
    switch (key.code) {
      case 'Plus':
        this._setNextTarget();
        break;
      case 'Minus':
        this._setPreviousTarget();
        break;
      case 'KeyF':
        this._fire();
        this._restoreGameEngineKeyHandler();
        break;
      default:
        this._restoreGameEngineKeyHandler();
        break;
    }
  }

  private _restoreGameEngineKeyHandler() {
    this._restoreBgColor();
    this._gameEngine.restoreGameKeyHandler();
  }

  private _restoreBgColor() {
    this._targets[this._currentTargetIndex].sprite.bgColor = this._bgColorBackup;
  }

  private _setTargetBgColor() {
    this._bgColorBackup = this._targets[this._currentTargetIndex].sprite.bgColor;
    this._targets[this._currentTargetIndex].sprite.bgColor = 'green';
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

  private _fire() {
    EventLog.getInstance().message = 'Fire !!!';
    this._restoreBgColor();
    const target: Entity = this._targets[this._currentTargetIndex];
    const damage: number = CombatResolver.DistanceAttack(this._actor, target);
    target.onHit(damage);
    this._actor.setNextAction(null);
  }
}
