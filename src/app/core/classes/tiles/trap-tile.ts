import {Tile} from '../base/tile';
import {Sprite} from '../base/sprite';
import {TileType} from '../../enums/tile-type.enum';
import {Iaction} from "../../interfaces/iaction";
import {Entity} from "../base/entity";

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

  onHit(actor: Entity): Iaction | null {
    return null;
  }
}
