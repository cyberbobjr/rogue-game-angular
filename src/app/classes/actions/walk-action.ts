import {Iaction} from '../../interfaces/iaction';
import {Direction} from '../../enums/direction.enum';
import {Tile} from '../base/tile';
import {Entity} from '../base/entity';
import {MapEngine} from '../../services/map-engine.service';
import {ActionResult} from './action-result';
import {EventLog} from '../event-log';
import {Position} from '../position';

export class WalkAction implements Iaction {
  private _info = '';

  constructor(private _direction: Direction,
              private _mapEngine: MapEngine) {
  }

  execute(actor: Entity): ActionResult {
    const destPosition: Position = actor.position.computeDestination(this._direction);
    const tile: Tile = <Tile>this._mapEngine.getTileAt(destPosition);
    if (tile instanceof Tile && tile.isWalkable()) {
      EventLog.getInstance().message = 'You walk';
      actor.position = destPosition;
      tile.onWalk(actor);
      actor.setNextAction(null);
      return ActionResult.SUCCESS;
    } else {
      const result = ActionResult.FAILURE;
      EventLog.getInstance().message = 'You hit ' + tile.name;
      result.alternative = tile.onHit(actor);
      return result;
    }
  }

  getInfo(): string {
    return this._info;
  }
}
