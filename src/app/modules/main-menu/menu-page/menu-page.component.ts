import {Component, OnInit} from '@angular/core';
import {EntitiesEngine} from '../../../services/entities-engine.service';
import {Router} from '@angular/router';
import {MapEngine} from '../../../services/map-engine.service';
import {StorageEngine} from '../../../services/storage-engine.service';
import {Player} from '../../../core/classes/entities/player';
import {JsonEntity, JsonMap} from 'src/app/core/interfaces/json-interfaces';
import {GameMapImp} from '../../../core/classes/base/game-map-imp';
import {Error} from 'tslint/lib/error';
import {Config} from '../../../core/config';
import {MapBuilder} from '../../../core/factories/map-builder';
import {GameEntities} from '../../../core/classes/base/game-entities';
import {EntityBuilder} from '../../../core/factories/entity-builder';

@Component({
    selector: 'app-menu-page',
    templateUrl: './menu-page.component.html',
    styleUrls: ['./menu-page.component.scss']
})
export class MenuPageComponent implements OnInit {
    public isGameStarted = false;
    public isPlayerExist = false;
    private _player: Player = null;

    constructor(private _entitiesServices: EntitiesEngine,
                private _storageService: StorageEngine,
                private _mapEngine: MapEngine,
                private _router: Router) {
    }

    ngOnInit() {
        this._storageService
            .loadPlayer()
            .then((player: Player) => {
                this._player = player;
                this.isPlayerExist = !!this._player;
                this.isGameStarted = !!(this._player.mapLevel && this._player.position);
                if (this.isGameStarted) {
                    this._storageService.loadRawMap(this._player.mapLevel)
                        .then((mapLoaded: { map: JsonMap, entities: Array<JsonEntity> } | null) => {
                            this.isGameStarted = this.isPlayerExist ? (!!this._player.position && !!mapLoaded) : false;
                        });
                }
            })
            .catch((e: Error) => {
                console.log(e.message);
                console.trace();
            });
    }

    async startNewGame() {
        const maps: Array<GameMapImp> = MapBuilder.generateMaps(Config.maxLevel);
        const saveMapPromise: Promise<void>[] = maps
            .map(map => {
                const gameEntities: GameEntities = EntityBuilder.generateMonsters([], map.level, map);
                return this._storageService.saveMap(map, gameEntities);
            });
        await Promise.all(saveMapPromise)
                     .then(() => {
                         return this._storageService.loadRawMap(1);
                     })
                     .then((data: { map: JsonMap, entities: Array<JsonEntity> }) => {
                         const gameMap: GameMapImp = MapBuilder.fromJSON(data.map);
                         this._player.setMapLevelAndPosition(1, gameMap.entryPosition);
                         this._player.setToFullHp();
                         this._storageService.savePlayer(this._player);
                         this._router.navigateByUrl('game');
                     })
                     .catch((err) => {
                         console.log(err);
                     });
    }
}
