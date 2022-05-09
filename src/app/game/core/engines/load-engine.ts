import {JsonEntity, JsonMap} from '../../interfaces/json-interfaces';
import {GameMapImp} from '../base/game-map-imp';
import {GameEntities} from '../base/game-entities';
import {GameEngine} from './GameEngine';

export interface LoadEngine {
    convertRawDataToGameData(map: JsonMap, entities: Array<JsonEntity>, gameEngine: GameEngine): { gameMap: GameMapImp, gameEntities: GameEntities };
}
