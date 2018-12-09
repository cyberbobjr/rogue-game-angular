import {EntityType} from '../enums/entity-type.enum';
import {Player} from '../classes/entities/player';
import {Entity} from '../classes/base/entity';
import {Monster} from '../classes/entities/monster';
import {SpritesFactory} from './sprites-factory';
import {SpriteType} from '../enums/sprite-type.enum';
import {Position} from '../classes/base/position';
import {Sprite} from '../classes/base/sprite';
import {JsonEntity} from '../../modules/game/services/storage.service';
import {Utility} from '../classes/utility';

export class EntitiesFactory {
  constructor() {
  }

  static createEntity(type: EntityType, position?: Position): Entity | null {
    switch (type) {
      case EntityType.PLAYER:
        const player: Player = new Player('player', position);
        player.hp = Utility.rolldice(12);
        player.strength = Utility.rolldice(10) + 1;
        return player;
      case EntityType.ORC:
        const monster: Entity = new Monster('orc', position, SpritesFactory.createSprite(SpriteType.ORC));
        monster.hp = Utility.rolldice(8) + 1;
        monster.strength = 17;
        monster.type = EntityType.ORC;
        return monster;
      default:
        return null;
    }
  }

  static createJsonEntity(type: EntityType, jsonData: JsonEntity): Entity | null {
    switch (type) {
      case EntityType.ORC:
        return Monster.fromJson('orc', Position.fromJson(jsonData.position), Sprite.fromJson(jsonData.sprite), jsonData);
      default:
        return null;
    }
  }
}