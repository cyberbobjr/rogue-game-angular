import {Iaction} from '../../interfaces/iaction';
import {MapEngine} from '../../../modules/game/services/map-engine.service';
import {Entity} from '../base/entity';
import {ActionResult} from './action-result';
import {EventLog} from '../event-log';
import {Position} from '../base/position';
import {Tile} from '../base/tile';
import {Player} from '../entities/player';
import {AttackAction} from './attack-action';

export class ChaseAction implements Iaction {
  private _info = '';

  constructor(private _mapEngine: MapEngine,
              private _actor: Entity) {
  }

  execute(actor: Entity): ActionResult {
    EventLog.getInstance().message = `${this._actor.name} chasing`;
    const destPosition: Position = this._getPathToPlayer(actor);
    if (destPosition) {
      return this._moveActor(destPosition);
    }
    return ActionResult.SUCCESS;
  }

  getInfo(): string {
    return this._info;
  }

  private _getPathToPlayer(actor: Entity): Position {
    return this._mapEngine.getDirectionToPlayer(actor.position);
  }

  private _moveActor(destPosition: Position): ActionResult {
    const info = this._mapEngine.getTileAt(destPosition);
    if (info instanceof Tile && info.isWalkable()) {
      info.onWalk(this._actor);
      this._actor.position = destPosition;
      return ActionResult.SUCCESS;
    }
    if (info instanceof Player) {
      const result = ActionResult.FAILURE;
      result.alternative = new AttackAction(info, this._mapEngine);
      return result;
    }
  }
}
