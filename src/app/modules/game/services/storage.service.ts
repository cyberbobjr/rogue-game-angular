import {Injectable} from '@angular/core';
import {Player} from '../../../core/classes/entities/player';
import {EntitiesEngine} from './entities-engine.service';
import {Entity} from '../../../core/classes/base/entity';
import {JsonEntity, JsonMap} from '../../../core/interfaces/json-interfaces';
import {DATA_TYPE, IDataBase, Instance, ITable} from 'jsstore';
import {GameMap} from 'src/app/core/classes/base/game-map';
import * as JsStore from 'jsstore';
import * as workerPath from 'file-loader?name=scripts/[name].[hash].js!jsstore/dist/jsstore.worker.min.js';
import {GameEntities} from '../../../core/classes/base/game-entities';

export const idbCon = new JsStore.Instance(new Worker(workerPath));

@Injectable({
              providedIn: 'root'
            })
export class StorageService {
  private dbname = 'TsRogue';
  private dbVersion = 3;

  get connection(): Instance {
    return idbCon;
  }

  constructor(private _entitiesService: EntitiesEngine) {
    console.log('storage created');
    this.connection.setLogStatus(false);
    this.initJsStore()
        .then(() => {
          console.log('DB init');
        });
  }

  async initJsStore() {
    try {
      const isExist: boolean = await this.connection.isDbExist({
                                                                 dbName: this.dbname,
                                                                 table: {name: 'Map', version: this.dbVersion}
                                                               });
      if (!isExist) {
        console.log('createDB');
        const dataBase = this.getDatabase();
        const test: string[] = await this.connection.createDb(dataBase);
        console.log(test);
      }
      console.log('openDB');
      await this.connection.openDb(this.dbname);
    } catch (e) {
      console.log(e);
      console.trace();
    }
  }

  private getDatabase(): IDataBase {
    const tblMap: ITable = {
      name: 'Map',
      version: this.dbVersion,
      columns: [
        {
          name: 'level',
          primaryKey: true
        },
        {
          name: 'map',
          dataType: DATA_TYPE.String
        },
        {
          name: 'entities',
          dataType: DATA_TYPE.String
        }
      ]
    };
    return {
      name: this.dbname,
      tables: [tblMap]
    };
  }

  async loadPlayer(): Promise<Player> {
    const json: string = await this.connection.get('Player');
    if (!json) {
      throw new Error('Player not found');
    }
    const playerLoaded: JsonEntity = JSON.parse(json) as JsonEntity;
    return Player.fromJSON(playerLoaded);
  }

  async loadRawMap(level: number): Promise<{ map: JsonMap, entities: Array<JsonEntity> }> {
    const gameMap: Array<any> = await this.connection.select({from: 'Map', limit: 1, where: {level: level}});
    if (gameMap.length === 0) {
      throw new Error('No maps in storage');
    }
    return {map: JSON.parse(gameMap[0]['map']), entities: JSON.parse(gameMap[0]['entities'])};
  }

  saveGameState(gameMap: GameMap, gameEntities: GameEntities) {
    this.savePlayer(gameEntities.getPlayer());
    this.saveMap(gameMap);
  }

  async saveMap(gameMap: GameMap): Promise<any> {
    return await this.connection.insert({
                                          into: 'Map',
                                          return: true,
                                          upsert: true,
                                          values: [{
                                            level: gameMap.level,
                                            map: JSON.stringify(gameMap),
                                            entities: JSON.stringify(gameMap.entities)
                                          }]
                                        });
  }

  async savePlayer(player: Entity) {
    await this.connection.set('Player', JSON.stringify(player));
  }
}
