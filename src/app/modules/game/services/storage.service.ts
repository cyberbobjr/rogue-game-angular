import {Injectable} from '@angular/core';
import {Player} from '../../../core/classes/entities/player';
import {EntitiesService} from './entities.service';
import {Entity} from '../../../core/classes/base/entity';
import {JsonEntity, JsonMap} from '../../../core/interfaces/json-interfaces';
import {IdbService} from './idb.service';
import {DATA_TYPE, IDataBase, Instance, ITable} from 'jsstore';
import {GameMap} from 'src/app/core/classes/base/gameMap';
import {Iobject} from 'src/app/core/interfaces/iobject';

@Injectable({
              providedIn: 'root'
            })
export class StorageService {
  dbname = 'TsRogue';

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
      return null;
    }
    const playerLoaded: JsonEntity = JSON.parse(json) as JsonEntity;
    return Player.fromJSON(playerLoaded);
  }

  async loadMap(level: number) {
    const gameMap: Array<any> = await this.connection.select({from: 'Map', limit: 1, where: {level: level}});
    if (gameMap.length === 0) {
      throw new Error('No maps in storage');
    }
    const data: { map: JsonMap, _entities: Array<JsonEntity> } = JSON.parse(gameMap[0]['jsonData']);
    this._entitiesService.loadEntitiesFromJson(data._entities);
    return data;
  }

  async saveMap(gameMap: GameMap<Iobject>) {
    return await this.connection.insert({
                                          into: 'Map',
                                          return: true,
                                          values: [{
                                            level: gameMap.level,
                                            jsonData: JSON.stringify({map: gameMap, _entities: this._entitiesService.getEntities()})
                                          }]
                                        });
  }

  clearAllMaps(): Promise<null> {
    return this.connection.clear('Map');
  }

  saveGameState() {
    this.savePlayer(this._entitiesService.player);
  }

  async savePlayer(player: Entity) {
    await this.connection.set('Player', JSON.stringify(player));
  }

  /*private async _saveMap() {
   const level: number = this._mapEngine.map.level;
   let entities: Array<Entity> = [];
   entities = Object.assign(entities, this._entitiesService.entities);
   entities.shift();
   await this.connection.insert({
   into: 'Map',
   return: true,
   values: [{level: level, jsonData: JSON.stringify({map: this._mapEngine.map, _entities: entities})}]
   });
   window.localStorage.setItem('map_' + level, JSON.stringify({map: this._mapEngine.map, _entities: entities}));
   }*/
}
