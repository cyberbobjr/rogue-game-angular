import {Iaction} from '../../interfaces/iaction';
import {Direction} from '../../enums/direction.enum';
import {Tile} from '../base/tile';
import {Entity} from '../base/entity';
import {MapEngine} from '../../services/map-engine.service';
import {ActionResult} from './action-result';

export class WalkAction implements Iaction {
  private _info = '';
  private _alternate: Iaction = null;

  get alternate(): Iaction {
    return this._alternate;
  }

  set alternate(value: Iaction) {
    this._alternate = value;
  }

  constructor(private _direction: Direction,
              private _mapEngine: MapEngine) {
  }

  execute(actor: Entity): ActionResult {
    const destPosition = actor.position.computeDestination(this._direction);
    const tile: Tile = <Tile>this._mapEngine.map.content[destPosition.y][destPosition.x];

    if (tile.isWalkable()) {
      actor.position = destPosition;
      actor.setNextAction(null);
      tile.onWalk(actor);
      this._info = 'Move';
      return ActionResult.SUCCESS;
    } else {
      this._info = 'You can\'t walk !';
      const hitAction = tile.onHit(actor);
      const result = ActionResult.FAILURE;
      if (hitAction) {
        result.alternative = hitAction;
      }
      return result;
    }
  }

  getInfo(): string {
    return this._info;
  }


}
