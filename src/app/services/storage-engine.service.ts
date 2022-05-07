import {Injectable} from '@angular/core';
import {Player} from '../core/classes/entities/player';
import {Entity} from '../core/classes/base/entity';
import {JsonEntity, JsonMap} from '../core/interfaces/json-interfaces';
import {GameMapImp} from 'src/app/core/classes/base/game-map-imp';
import {GameEntities} from '../core/classes/base/game-entities';
import {EntitiesFactory} from '../core/factories/entities-factory';
import {AppDB, db} from '../core/helpers/AppDB';

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

    /*private getDatabase(): IDataBase {
        const tblMap: ITable = {
            name: 'Map',
            columns:
                {
                    level: {primaryKey: true},
                    map: {dataType: DATA_TYPE.String},
                    entities: {dataType: DATA_TYPE.String}
                }
        };
        return {
            name: this.dbname,
            tables: [tblMap],
            version: this.dbVersion
        };
    }*/

    async loadPlayer(): Promise<Player> {
        const json: string = await this.idbCon.Player.get(1);
        if (!json) {
            throw new Error('Player not found');
        }
        const playerLoaded: JsonEntity = JSON.parse(json) as JsonEntity;
        return EntitiesFactory.getInstance()
                              .createEntityFromJson(playerLoaded) as Player;
    }

    async loadRawMap(level: number): Promise<{ map: JsonMap, entities: Array<JsonEntity> }> {
        const gameMap: Array<any> = await this.idbCon.Map.where({from: 'Map', limit: 1, where: {level: level}});
        if (gameMap.length === 0) {
            throw new Error('No maps in storage');
        }
        return {map: JSON.parse(gameMap[0]['map']), entities: JSON.parse(gameMap[0]['entities'])};
    }

    saveGameState(gameMap: GameMapImp, gameEntities: GameEntities) {
        this.savePlayer(gameEntities.getPlayer());
        this.saveMap(gameMap, gameEntities);
    }

    async saveMap(gameMap: GameMapImp, gameEntities: GameEntities): Promise<any> {
        return await this.idbCon
                         .Map
                         .put({
                             level: gameMap.level,
                             map: JSON.stringify(gameMap),
                             entities: JSON.stringify(gameEntities.getEntities())
                         });
    }

    async savePlayer(player: Entity) {
        await this.idbCon.Player.put(JSON.stringify(player));
    }
}
