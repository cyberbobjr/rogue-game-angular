import {EntityType} from '../enums/entity-type.enum';
import {Player} from '../classes/entities/player';
import {Entity} from '../classes/base/entity';
import {Monster} from '../classes/entities/monster';
import {SpritesFactory} from './sprites-factory';
import {SpriteType} from '../enums/sprite-type.enum';
import {Position} from '../classes/position';

export class EntitiesFactory {
  constructor() {
  }

  static createEntity(type: EntityType, position?: Position): Entity | null {
    switch (type) {
      case EntityType.PLAYER:
        return new Player('player', position);
      case EntityType.ORC:
        const monster: Entity = new Monster('orc', position, SpritesFactory.createSprite(SpriteType.ORC));
        monster.hp = 5;
        return monster;
      default:
        return null;
    }
  }
  static createJsonEntity(type: EntityType, position?: Position): Entity | null {
    switch (type) {
      case EntityType.ORC:
        const monster: Entity = new Monster('orc', position, SpritesFactory.createSprite(SpriteType.ORC));
        monster.hp = 5;
        return monster;
      default:
        return null;
    }
  }
}
