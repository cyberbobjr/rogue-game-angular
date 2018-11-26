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
        return new Sprite('#', '#f95757');
      case SpriteType.FLOOR:
        return new Sprite('.', '#f7ff0f');
      case SpriteType.CLOSEDOOR:
        return new Sprite('I', '#f95757');
      case SpriteType.OPENDOOR:
        return new Sprite('=', '#f95757');
      default:
        return null;
    }
  }
}
