import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {GameEngineImp} from '@services/game-engine-imp.service';
import {EntitiesEngine} from '@core/core/engines/entities-engine';
import {Player} from '@core/core/entities/player';
import {GameObject} from '@core/core/gameObjects/game-object';
import {InventoryKeyboardCapture} from '@core/core/keyboardCapture/inventoryKeyboardCapture';
import {KeyboardEngine} from '@services/keyboard-engine.service';

@Component({
    selector: 'app-inventory-modal',
    templateUrl: './inventory-modal.component.html',
    styleUrls: ['./inventory-modal.component.scss']
})
export class InventoryModalComponent implements OnInit, OnDestroy {
    private readonly _entitiesService: EntitiesEngine;

    get selected(): string {
        return this._selected;
    }

    get player(): Player {
        return this._player;
    }

    private _listener: any = null;
    private _selected: string = null;
    private _player: Player = null;
    private _keyboardEngine: KeyboardEngine;

    get entitiesService(): EntitiesEngine {
        return this._entitiesService;
    }

    constructor(private _modalService: NgxSmartModalService,
                private _gameEngine: GameEngineImp) {
        this._entitiesService = this._gameEngine.getEntityEngine();
    }

    ngOnInit() {
        this._player = this._entitiesService.getPlayer();
        this._keyboardEngine = this._gameEngine.getKeyboardEngine();
        this.initModalHandler();
    }

    ngOnDestroy() {
        if (this._listener) {
            this._listener();
        }
    }

    initModalHandler() {
        this._modalService.getModal('inventoryModal')
            .onOpen
            .subscribe(() => {
                this._player = this._entitiesService.getPlayer();
                const keyboardHandler = new InventoryKeyboardCapture(this._player, this._gameEngine, (selected: string) => {
                    console.log(selected);
                    this._selected = selected;
                });
                this._keyboardEngine.setKeyboardHandler(keyboardHandler);
            }, (err) => {
                console.log(err);
            });
        this._modalService.getModal('inventoryModal')
            .onAnyCloseEvent
            .subscribe(() => {
                this._gameEngine.setGeneralKeyboardHandlerCommand();
            });
    }

    isDroppable(): boolean {
        return !!this._player.position;
    }

    isSelectedEquipable(): boolean {
        const object: GameObject = this._player.getItemByLetter(this._selected);
        return object.canEquip() && !this._player.isInventoryEquipped(this._selected);
    }

    isSelectedUsable(): boolean {
        const object: GameObject = this._player.getItemByLetter(this._selected);
        return object.canUse();
    }

    isSelectedUnequippable(): boolean {
        const object: GameObject = this._player.getItemByLetter(this._selected);
        return object.canEquip() && this._player.isInventoryEquipped(this._selected);
    }
}
