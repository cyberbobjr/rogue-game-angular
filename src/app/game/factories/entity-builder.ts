import {JsonEntity} from '../interfaces/json-interfaces';
import {Entity} from '../core/base/entity';
import {EntitiesFactory} from './entities-factory';
import {GameEntities} from '../core/base/game-entities';
import {Room} from 'rot-js/lib/map/features';
import {Utility} from '../core/Utility/utility';
import {Position2D} from '../core/base/position2D';
import {GameMap} from '../interfaces/GameMap';

export class EntityBuilder {
    /**
     * Génère la liste des mobs
     * @param excludeRooms Liste des pièces à exclure pour le positionnement
     * @param maxEntities Nombre maximum de mobs à générer
     * @param map Carte contenant les mobs à placer
     */
    public static generateEntitiesOnMap(excludeRooms: Array<number> = [], maxEntities: number, map: GameMap): GameEntities {
        const gameEntities: GameEntities = new GameEntities();
        const monsters: Array<Entity> = [];
        const rooms: Array<Room> = map.rooms;
        const nbRooms: number = rooms.length;
        let roomNumber = 0;
        EntitiesFactory.getInstance().setMaxPop(maxEntities);
        for (let nb = 0; nb < maxEntities; nb++) {
            do {
                roomNumber = Utility.rolldice(nbRooms - 1);
            } while (excludeRooms.indexOf(roomNumber) > -1);

            const entityPosition: Position2D = map.getFreePositionForRoom(roomNumber);
            const entity: Entity = EntitiesFactory.generateRandomEntities(entityPosition);
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
                                             .createEntityFromJson(jsonEntity));
            });
            gameEntities.setEntities(entities);
        }
        return gameEntities;
    }
}
