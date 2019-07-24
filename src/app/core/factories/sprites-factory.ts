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
      case SpriteType.DOORCLOSED:
        return new Sprite('I', '#f95757');
      case SpriteType.DOOROPENED:
        return new Sprite('=', '#f95757');
      case SpriteType.HITENTITY:
        return new Sprite('*', '#f95757');
      case SpriteType.GOLD:
        return new Sprite('g', '#f7ff0f');
      case SpriteType.FOOD:
        return new Sprite('f', '#087a34');
      case SpriteType.CHESTOPENED:
        return new Sprite('C', '#b56d48');
      case SpriteType.CHESTCLOSED:
        return new Sprite('c', '#b56d48');
      default:
        return null;
    }
  }
}
