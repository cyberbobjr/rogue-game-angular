import {Sprite} from '../classes/base/sprite';
import {SpriteType} from '../enums/sprite-type.enum';

export class SpritesFactory {
  constructor() {
  }

  static createSprite(type: SpriteType): Sprite | null {
    switch (type) {
      case SpriteType.PLAYER:
        return new Sprite('@', '#ffffff');
      case SpriteType.WALL:
        return new Sprite('#', '#f95757', '#282828');
      case SpriteType.FLOOR:
        return new Sprite('.', '#ffffff');
      case SpriteType.CLOSEDOOR:
        return new Sprite('I', '#f95757');
      case SpriteType.OPENDOOR:
        return new Sprite('=', '#f95757');
      case SpriteType.ORC:
        return new Sprite('O', '#4286f4');
      case SpriteType.HITMONSTER:
        return new Sprite('*', '#f95757');
      case SpriteType.GOLD:
        return new Sprite('g', '#f7ff0f');
      default:
        return null;
    }
  }
}
