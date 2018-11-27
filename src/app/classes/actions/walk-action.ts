import {Iaction} from '../../interfaces/iaction';
import {IEntity} from '../../interfaces/ientity';
import {Direction} from '../../enums/direction.enum';
import {GameMap} from '../gameMap';
import {Tile} from '../base/tile';
import {Entity} from '../base/entity';

export class WalkAction implements Iaction {
  private _info = '';

  constructor(private _direction: Direction,
              private _map: GameMap<IEntity>) {
  }

  execute(actor: Entity): boolean {
    const destPosition = actor.position.computeDestination(this._direction);
    const tile: Tile = <Tile>this._map.content[destPosition.y][destPosition.x];
    if (tile.isWalkable()) {
      actor.position = destPosition;
      actor.setNextAction(null);
      tile.onWalk(actor);
      this._info = 'Move';
      return true;
    }
    this._info = 'You can\'t walk !';
    actor.setNextAction(null);
    return false;
  }

  getInfo(): string {
    return this._info;
  }
}
