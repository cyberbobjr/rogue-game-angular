import {JsonEntity} from '../interfaces/json-interfaces';
import {Entity} from '../classes/base/entity';
import {EntitiesFactory} from './entities-factory';
import {IdleAction} from '../classes/actions/idle-action';
import {GameEntities} from '../classes/base/game-entities';
import {GameMap} from '../classes/base/game-map';
import {Room} from 'rot-js/lib/map/features';
import {Utility} from '../classes/Utility/utility';
import {Position} from '../classes/base/position';

export class EntityBuilder {
  public static generateMonsters(excludeRooms: Array<number> = [], maxEntities: number, map: GameMap): GameEntities {
    const gameEntities: GameEntities = new GameEntities();
    const monsters: Array<Entity> = [];
    const rooms: Array<Room> = map.rooms;
    const nbRooms: number = rooms.length;
    let roomNumber = 0;
    EntitiesFactory.getInstance()
                   .setMaxPop(maxEntities);
    for (let nb = 0; nb < maxEntities; nb++) {
      do {
        roomNumber = Utility.rolldice(nbRooms - 1);
      } while (excludeRooms.indexOf(roomNumber) > -1);

      const entityPosition: Position = map.getFreeSlotForRoom(roomNumber);
      const entity: Entity = EntitiesFactory.generateRandomEntities(entityPosition);
      entity.setNextAction(new IdleAction());
      monsters.push(entity);
    }
    gameEntities.setEntities(monsters);
    return gameEntities;
  }

  static fromJSON(jsonEntities: Array<JsonEntity>): GameEntities {
    const gameEntities: GameEntities = new GameEntities();
    if (jsonEntities.length > 0) {
      const entities: Array<Entity> = [];
      jsonEntities.forEach((jsonEntity: JsonEntity) => {
        entities.push(EntitiesFactory.getInstance()
                                     .createEntityFromJson(jsonEntity)
                                     .setNextAction(new IdleAction()));
      });
      gameEntities.setEntities(entities);
    }
    return gameEntities;
  }
}
