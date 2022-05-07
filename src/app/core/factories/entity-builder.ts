import {JsonEntity} from '../interfaces/json-interfaces';
import {Entity} from '../classes/base/entity';
import {EntitiesFactory} from './entities-factory';
import {IdleAction} from '../classes/actions/idle-action';
import {GameEntities} from '../classes/base/game-entities';
import {GameMapImp} from '../classes/base/game-map-imp';
import {Room} from 'rot-js/lib/map/features';
import {Utility} from '../classes/Utility/utility';
import {Position} from '../classes/base/position';
import {GameMap} from '../interfaces/GameMap';

export class EntityBuilder {
    /**
     * Génère la liste des mobs
     * @param excludeRooms Liste des pièces à exclure pour le positionnement
     * @param maxEntities Nombre maximum de mobs à générer
     * @param map Carte contenant les mobs à placer
     */
    public static generateMonsters(excludeRooms: Array<number> = [], maxEntities: number, map: GameMap): GameEntities {
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

            const entityPosition: Position = map.getFreePositionForRoom(roomNumber);
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
