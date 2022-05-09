import {Injectable} from '@angular/core';
import {Player} from '@core/core/entities/player';
import {JsonEntity, JsonMap} from '@core/interfaces/json-interfaces';
import {GameEntities} from '@core/core/base/game-entities';
import {EntitiesFactory} from '@core/factories/entities-factory';
import {AppDB, db} from '@core/helpers/AppDB';
import {GameMap} from '@core/interfaces/GameMap';

@Injectable({
    providedIn: 'root'
})
export class StorageEngine {
    private idbCon: AppDB = db;

    get connection(): AppDB {
        return this.idbCon;
    }

    constructor() {
        console.log('storage created');
        this.idbCon
            .open()
            .then(_ => {
                this.loadPlayer();
            });
    }

    async loadPlayer(): Promise<Player> {
        const json: string = await this.idbCon.Player.get(1);
        if (!json || json.length === 0) {
            throw new Error('Player not found');
        }
        const playerLoaded: JsonEntity = JSON.parse(json) as JsonEntity;
        return EntitiesFactory.getInstance()
                              .createEntityFromJson(playerLoaded) as Player;
    }

    async loadRawMap(level: number): Promise<{ map: JsonMap, entities: Array<JsonEntity> }> {
        const gameMap: Array<any> = await this.idbCon
                                              .Map
                                              .where({level})
                                              .limit(1)
                                              .toArray();
        if (gameMap.length === 0) {
            throw new Error('No maps in storage');
        }
        return {map: JSON.parse(gameMap[0]['map']), entities: JSON.parse(gameMap[0]['entities'])};
    }

    saveGameState(gameMap: GameMap, gameEntities: GameEntities) {
        this.savePlayer(gameEntities.getPlayer());
        this.saveMap(gameMap, gameEntities);
    }

    async saveMap(gameMap: GameMap, gameEntities: GameEntities): Promise<any> {
        return await this.idbCon
                         .Map
                         .put({
                             level: gameMap.level,
                             map: JSON.stringify(gameMap),
                             entities: JSON.stringify(gameEntities.getEntities())
                         });
    }

    async savePlayer(player: Player) {
        await this.idbCon.Player.put(JSON.stringify(player), 1);
    }
}
