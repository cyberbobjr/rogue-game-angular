import {EntityType} from '../enums/entity-type.enum';
import {Player} from '../classes/player';
import {Entity} from '../classes/entity';

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
