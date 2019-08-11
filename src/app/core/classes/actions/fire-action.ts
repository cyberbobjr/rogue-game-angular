import {Action} from '../../interfaces/action';
import {Entity} from '../base/entity';
import {ActionResult} from './action-result';
import {GameEngine} from '../../../modules/game/services/game-engine.service';
import {EventLog} from '../Utility/event-log';
import {AttackDistanceAction} from './attack-distance-action';
import {ChooseTarget} from '../Utility/choose-target';

export class FireAction implements Action {
  private _targets: Array<Entity> = [];
  private _gameEngine: GameEngine = null;
  private _actor: Entity;
  private _info = 'Fire action';
  private _chooseTarget: ChooseTarget;

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
    this._chooseTarget = new ChooseTarget(gameEngine, {keyAction: 'KeyF'}, this._fire.bind(this));
    return ActionResult.WAIT;
  }

  getInfo(): string {
    return this._info;
  }

  private _fire(targets: Entity[]): void {
    console.log('Selected target : ' + targets[0]);
    if (targets) {
      this._actor.setNextAction(new AttackDistanceAction(targets[0]));
    }
  }
}
