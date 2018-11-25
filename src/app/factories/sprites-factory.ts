import {Sprite} from '../classes/base/sprite';
import {SpriteType} from '../enums/sprite-type.enum';

export class SpritesFactory {
  constructor() {
  }

  static createSprite(type: SpriteType): Sprite | null {
    switch (type) {
      case SpriteType.PLAYER:
        return new Sprite('@', 'red');
      case SpriteType.WALL:
        return new Sprite('#', 'grey');
      case SpriteType.FLOOR:
        return new Sprite('.', 'grey');
      default:
        return null;
    }
  }
}
