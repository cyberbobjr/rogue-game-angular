import {JsonEntity, JsonMap} from '../../interfaces/json-interfaces';
import {GameMapImp} from '../base/game-map-imp';
import {GameEntities} from '../base/game-entities';
import {MapBuilder} from '../../factories/map-builder';
import {EntityBuilder} from '../../factories/entity-builder';
import {IdleAction} from '../actions/idle-action';
import {LoadEngine} from './load-engine';
import {GameEngine} from './GameEngine';

export class LoadEngineImp implements LoadEngine {
    convertRawDataToGameData(map: JsonMap, entities: Array<JsonEntity>, gameEngine: GameEngine): { gameMap: GameMapImp, gameEntities: GameEntities } {
        const gameMap: GameMapImp = MapBuilder.fromJSON(map);
        const gameEntities: GameEntities = EntityBuilder.fromJSON(entities);
        gameEntities.getEntities().forEach(e => e.setNextAction((new IdleAction(null, gameEngine))));
        return {gameMap, gameEntities};
    }
}
