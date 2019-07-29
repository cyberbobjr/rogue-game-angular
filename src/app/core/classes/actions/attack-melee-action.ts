import {Iaction} from '../../interfaces/iaction';
import {Entity} from '../base/entity';
import {ActionResult} from './action-result';
import {EventLog} from '../event-log';
import {CombatResolver} from '../../rules/combat/combat-resolver';
import {GameEngine} from '../../../modules/game/services/game-engine.service';

export class AttackMeleeAction implements Iaction {
  private _info = '';
  private _subject: Entity;

  set subject(value: Entity) {
    this._subject = value;
  }

  constructor(private _target: Entity) {
  }

  execute(gameEngine: GameEngine): ActionResult {
    EventLog.getInstance().message = `${this._subject.name} attack`;
    const damage: number = CombatResolver.HandToHandAttack(this._subject, this._target);
    this._target.onHit(damage);
    return ActionResult.SUCCESS;
  }

  getInfo(): string {
    return this._info;
  }
}
