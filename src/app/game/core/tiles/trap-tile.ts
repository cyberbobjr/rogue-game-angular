import {Tile} from '../base/tile';
import {Sprite} from '../base/sprite';
import {TileType} from '../../enums/tile-type.enum';
import {Action} from '../../interfaces/action';
import {Entity} from '../base/entity';

export class TrapTile extends Tile {
  constructor() {
    super();
    this.sprite = new Sprite('.');
    this._opaque = false;
    this._type = TileType.TRAP;
    this.name = 'TrapTile';
  }

  isWalkable(): boolean {
    return true;
  }

  onHit(actor: Entity): Action | null {
    return null;
  }
}
