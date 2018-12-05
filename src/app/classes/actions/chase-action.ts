import {Iaction} from '../../interfaces/iaction';
import {MapEngine} from '../../services/map-engine.service';
import {Entity} from '../base/entity';
import {ActionResult} from './action-result';
import {EventLog} from '../event-log';
import {Position} from '../base/position';
import {Tile} from '../base/tile';
import {Player} from '../entities/player';

export class ChaseAction implements Iaction {
  private _info = '';

  constructor(private _mapEngine: MapEngine,
              private _actor: Entity) {
  }

  execute(actor: Entity, mapEngine: MapEngine): ActionResult {
    EventLog.getInstance().message = this._actor.name + ' chasing';
    const destPosition: Position = this._getPathToPlayer(actor);
    if (destPosition) {
      this._moveActor(destPosition);
    }
    return ActionResult.SUCCESS;
  }

  getInfo(): string {
    return this._info;
  }

  private _getPathToPlayer(actor: Entity): Position {
    return this._mapEngine.getDirectionToPlayer(actor.position);
  }

  private _moveActor(destPosition: Position) {
    const tile: Tile = <Tile>this._mapEngine.map.content[destPosition.y][destPosition.x];
    const info = this._mapEngine.getTileAt(destPosition);
    if (info instanceof Tile && info.isWalkable()) {
      tile.onWalk(this._actor);
      this._actor.position = destPosition;
    }
    if (info instanceof Player) {
      info.onHit(this._actor);
    }
  }
}
