import {Component, OnInit} from '@angular/core';
import {EntitiesEngine} from '@core/core/engines/entities-engine';
import {Router} from '@angular/router';
import {StorageEngine} from '@services/storage-engine.service';
import {Player} from '@core/core/entities/player';
import {JsonEntity, JsonMap} from '@core/interfaces/json-interfaces';
import {GameMapImp} from '@core/core/base/game-map-imp';
import {Error} from 'tslint/lib/error';
import {Config} from '@core/config';
import {MapBuilder} from '@core/factories/map-builder';
import {GameEntities} from '@core/core/base/game-entities';
import {EntityBuilder} from '@core/factories/entity-builder';
import {GameMap} from '@core/interfaces/GameMap';
import {IdleAction} from '@core/core/actions/idle-action';
import {GameEngineImp} from '@services/game-engine-imp.service';

@Component({
    selector: 'app-menu-page',
    templateUrl: './menu-page.component.html',
    styleUrls: ['./menu-page.component.scss']
})
export class MenuPageComponent implements OnInit {
    public isGameStarted = false;
    public isPlayerExist = false;
    private _player: Player = null;
    private entitiesEngine: EntitiesEngine;

    constructor(private _gameEngine: GameEngineImp,
                private _storageService: StorageEngine,
                private _router: Router) {
        this.entitiesEngine = this._gameEngine.getEntityEngine();
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
        const maps: Array<GameMap> = MapBuilder.generateMaps(Config.maxLevel);
        const saveMapPromise: Promise<void>[] = maps
            .map(map => {
                const gameEntities: GameEntities = EntityBuilder.generateEntitiesOnMap([], map.level, map);
                gameEntities.getEntities().map(e => e.setNextAction(new IdleAction(null, this._gameEngine)));
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
