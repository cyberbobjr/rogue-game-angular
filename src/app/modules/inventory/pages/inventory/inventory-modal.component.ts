import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {GameEngineService} from '../../../../services/game-engine-imp.service';
import {EntitiesEngine} from '../../../../services/entities-engine.service';
import {Player} from '../../../../core/classes/entities/player';
import {GameObject} from '../../../../core/classes/gameObjects/game-object';
import {InventoryKeyboardCapture} from '../../../../core/classes/Utility/inventoryKeyboardCapture';

@Component({
  selector: 'app-inventory-modal',
  templateUrl: './inventory-modal.component.html',
  styleUrls: ['./inventory-modal.component.scss']
})
export class InventoryModalComponent implements OnInit, OnDestroy {
  get selected(): string {
    return this._selected;
  }

  get player(): Player {
    return this._player;
  }

  private _handleKeyBackup: any;
  private _listener: any = null;
  private _selected: string = null;
  private _player: Player = null;

  get entitiesService(): EntitiesEngine {
    return this._entitiesService;
  }

  constructor(private _modalService: NgxSmartModalService,
              private _gameEngine: GameEngineService,
              private _entitiesService: EntitiesEngine) {
  }

  ngOnInit() {
    this._player = this._entitiesService.getPlayer();
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
          this._handleKeyBackup = this._gameEngine.keyboardHandler;
          this._gameEngine.keyboardHandler = new InventoryKeyboardCapture(this._player, this._gameEngine, (selected: string) => {
            this._selected = selected;
          });
        }, (err) => {
          console.log(err);
        });
    this._modalService.getModal('inventoryModal')
        .onAnyCloseEvent
        .subscribe(() => {
          this._gameEngine.captureKeyboardEvent();
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
