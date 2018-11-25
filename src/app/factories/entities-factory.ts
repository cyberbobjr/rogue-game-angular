import {EntityType} from '../enums/entity-type.enum';
import {Player} from '../classes/entities/player';
import {Entity} from '../classes/base/entity';

export class EntitiesFactory {
  constructor() {
  }

  static createEntity(type: EntityType): Entity | null {
    switch (type) {
      case EntityType.PLAYER:
        return new Player('player');
      default:
        return null;
    }
  }
}
