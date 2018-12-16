import {Tile} from '../base/tile';
import {SpritesFactory} from '../../factories/sprites-factory';
import {SpriteType} from '../../enums/sprite-type.enum';
import {Position} from '../base/position';
import {TileType} from '../../enums/tile-type.enum';
import {Entity} from '../base/entity';
import {GameObject} from '../base/game-object';

export class FloorTile extends Tile {
  protected _type = TileType.FLOOR;
  protected _name = 'FloorTile';

  get type(): TileType {
    return this._type;
  }

  get name(): string {
    return this._name;
  }

  constructor(position: Position) {
    super();
    this._sprite = SpritesFactory.createSprite(SpriteType.FLOOR);
    this._opaque = false;
    this.position = position;
  }

  isWalkable(): boolean {
    return true;
  }

  onTake(actor: Entity) {
    this._contents.forEach((gameObject: GameObject, index: number) => {
      gameObject.onTake(actor);
      this._contents.splice(index, 1);
    });
  }
}
