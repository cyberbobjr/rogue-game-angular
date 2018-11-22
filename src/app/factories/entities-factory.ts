import {EntityType} from '../enums/entity-type.enum';
import {Entity} from '../classes/entity';
import {Player} from '../classes/player';

export class EntitiesFactory {
  constructor() {
  }

  createEntity(type: EntityType): Entity | null {
    switch (type) {
      case EntityType.PLAYER:
        return new Player('player', '@');
      default:
        return null;
    }
  }
}
