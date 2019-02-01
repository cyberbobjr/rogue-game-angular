import {Tile} from '../base/tile';
import {SpriteType} from '../../enums/sprite-type.enum';
import {SpritesFactory} from '../../factories/sprites-factory';
import {Position} from '../base/position';
import {TileType} from '../../enums/tile-type.enum';
import {JSonCell} from '../../interfaces/json-interfaces';
import {Iaction} from "../../interfaces/iaction";
import {Entity} from "../base/entity";

export class WallTile extends Tile {
  _type = TileType.WALL;
  name = 'wall';

  static fromJSON(json: JSonCell): WallTile {
    return new this(new Position(json.position._x, json.position._y));
  }

  constructor(position?: Position) {
    super();
    this.sprite = SpritesFactory.createSprite(SpriteType.WALL);
    this._opaque = true;
    this.position = position;
  }

  isWalkable(): boolean {
    return false;
  }

  onHit(actor: Entity): Iaction | null {
    return null;
  }
}
