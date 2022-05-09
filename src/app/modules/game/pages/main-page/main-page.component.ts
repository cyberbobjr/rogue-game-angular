import {Component, OnDestroy, OnInit} from '@angular/core';
import {GameEngineImp} from '@services/game-engine-imp.service';
import {EntitiesEngine} from '@core/core/engines/entities-engine';
import {Player} from '@core/core/entities/player';
import {Router} from '@angular/router';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {StorageEngine} from '@services/storage-engine.service';
import {LoadEngine} from '@core/core/engines/load-engine';
import {LoadEngineImp} from '@core/core/engines/LoadEngineImp';

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit, OnDestroy {
    private entitiesEngine: EntitiesEngine;
    player: Player;

    constructor(private _gameEngine: GameEngineImp,
                private _storageService: StorageEngine,
                private _router: Router,
                private _modalService: NgxSmartModalService) {
        this.entitiesEngine = this._gameEngine.getEntityEngine();
    }

    async ngOnInit(): Promise<void> {
        console.log('Main page init');
        await this._initGame();
    }

    private async _initGame() {
        try {
            this.player = await this._storageService.loadPlayer();
            const {map, entities} = await this._storageService.loadRawMap(this.player.mapLevel);
            const loadEngine: LoadEngine = new LoadEngineImp();
            const {gameMap, gameEntities} = loadEngine.convertRawDataToGameData(map, entities, this._gameEngine);
            this._gameEngine.initEngine();
            this._gameEngine.loadGame(gameMap, gameEntities, this.player);
            this._gameEngine.startEngine();
        } catch (e) {
            console.log(e);
            console.trace();
            this._goBackToMenu();
        }
    }

    ngOnDestroy() {
        this._gameEngine.stopEngine();
    }

    private _goBackToMenu() {
        this._router.navigateByUrl('');
    }
}
