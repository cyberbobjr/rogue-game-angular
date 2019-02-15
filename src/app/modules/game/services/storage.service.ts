import {Injectable} from '@angular/core';
import {Player} from '../../../core/classes/entities/player';
import {EntitiesService} from './entities.service';
import {Entity} from '../../../core/classes/base/entity';
import {JsonEntity} from '../../../core/interfaces/json-interfaces';
import {IdbService} from './idb.service';
import {DATA_TYPE, IDataBase, Instance, ITable} from 'jsstore';
import {GameMap} from 'src/app/core/classes/base/game-map';

@Injectable({
              providedIn: 'root'
            })
export class StorageService {
  private dbname = 'TsRogue';

  get connection(): Instance {
    return IdbService.idbCon;
  }

  constructor(private _entitiesService: EntitiesService) {
    console.log('storage created');
    this.connection.setLogStatus(false);
    this.initJsStore()
        .then(() => {
          console.log('DB init');
        });
  }

  async initJsStore() {
    try {
      const isExist: boolean = await this.connection.isDbExist(this.dbname);
      if (isExist) {
        console.log('openDB');
        this.connection.openDb(this.dbname);
      } else {
        console.log('createDB');
        const dataBase = this.getDatabase();
        this.connection.createDb(dataBase);
      }
    } catch (e) {
      console.log(e);
      console.trace();
    }
  }

  private getDatabase(): IDataBase {
    const tblPlayer: ITable = {
      name: 'Player',
      columns: [
        {
          name: 'id',
          primaryKey: true,
        },
        {
          name: 'jsonData',
          dataType: DATA_TYPE.String
        }]
    };
    const tblMap: ITable = {
      name: 'Map',
      columns: [
        {
          name: 'level',
          primaryKey: true
        },
        {
          name: 'jsonData',
          dataType: DATA_TYPE.String
        }
      ]
    };
    return {
      name: this.dbname,
      tables: [tblPlayer,
               tblMap]
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

  async loadMap(level: number) {
    const gameMap: Array<any> = await this.connection.select({from: 'Map', limit: 1, where: {level: level}});
    if (gameMap.length === 0) {
      throw new Error('No maps in storage');
    }
    return JSON.parse(gameMap[0]['jsonData']);
  }

  clearAllMaps(): Promise<null> {
    return this.connection.isDbExist('Map') ? this.connection.clear('Map') : new Promise((resolve) => resolve(null));
  }

  saveGameState(gameMap: GameMap, player: Player) {
    this.savePlayer(player);
    this.saveMap(gameMap);
  }

  async saveMap(gameMap: GameMap) {
    return await this.connection.insert({
                                          into: 'Map',
                                          return: true,
                                          upsert: true,
                                          values: [{
                                            level: gameMap.level,
                                            jsonData: JSON.stringify({map: gameMap, entities: this._entitiesService.getEntities()})
                                          }]
                                        });
  }

  async savePlayer(player: Entity) {
    await this.connection.set('Player', JSON.stringify(player));
  }
}
