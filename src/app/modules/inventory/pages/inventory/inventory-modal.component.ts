import {Component, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {StorageService} from '../../../game/services/storage.service';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {GameEngine} from '../../../game/services/game-engine.service';
import {Router} from '@angular/router';
import {EntitiesManager} from '../../../game/services/entities-manager.service';
import {Player} from '../../../../core/classes/entities/player';
import {GameObject} from '../../../../core/classes/gameObjects/game-object';
import {Tile} from '../../../../core/classes/base/tile';

@Component({
  selector: 'app-inventory-modal',
  templateUrl: './inventory-modal.component.html',
  styleUrls: ['./inventory-modal.component.css']
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

  get entitiesService(): EntitiesManager {
    return this._entitiesService;
  }

  constructor(private _modalService: NgxSmartModalService,
              private _gameEngine: GameEngine,
              private _entitiesService: EntitiesManager,
              private _router: Router,
              private _storageService: StorageService,
              private _renderer: Renderer2) {
  }

  ngOnInit() {
    if (this._router.url === '/game') {
      this._player = this._entitiesService.getPlayer();
      this.initModalHandler();
    } else {
      this._storageService.loadPlayer()
          .then((player: Player) => {
            this._player = player;
            this._listener = this._renderer.listen(document, 'keydown', (keyEvent) => {
              this.keyboardHandler(keyEvent);
            });
          });
    }
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
          this._handleKeyBackup = this._gameEngine.handleKeyEvent;
          this._gameEngine.handleKeyEvent = this.keyboardHandler.bind(this);
        });
    this._modalService.getModal('inventoryModal')
        .onAnyCloseEvent
        .subscribe(() => {
          this._gameEngine.restoreGameKeyHandler();
        });
  }

  keyboardHandler(key: KeyboardEvent) {
    const letter: string = key.key;
    if (!this._selected) {
      if (this._player.inventoryContain(letter)) {
        this._selected = letter;
      }
    } else {
      switch (letter) {
        case 'Escape':
        case 'c' :
          this._selected = null;
          break;
        case 'd':
          if (this.isDroppable()) {
            this.dropObject();
          }
          break;
        case 'e':
          if (this.isSelectedEquipable()) {
            this.equipObject(this._selected);
          }
          break;
        case 'u':
          if (this.isSelectedUnequippable()) {
            this.unequipObject(this._selected);
          }
          break;
        case 'U':
          if (this.isSelectedUsable()) {
            this.useObject(this._selected);
          }
          break;
        default :
          return;
      }
      this._selected = null;
    }
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

  dropObject() {
    const gameObject: GameObject = this._player.getItemByLetter(this._selected);
    const tile: Tile = this._gameEngine.getMapEngine()
                           .getTileAt(this._player.position);
    tile.dropOn(gameObject);
    this._player.removeFromInventory(this._selected);
  }

  equipObject(inventoryLetter: string) {
    const gameObject: GameObject = this._player.getItemByLetter(inventoryLetter);
    gameObject.onEquip(this._player, inventoryLetter);
  }

  unequipObject(inventoryLetter: string) {
    const gameObject: GameObject = this._player.getItemByLetter(inventoryLetter);
    gameObject.onUnequip(this._player, inventoryLetter);
  }

  useObject(inventoryLetter: string) {
    const gameObject: GameObject = this._player.getItemByLetter(inventoryLetter);
    gameObject.onUse(this._player, inventoryLetter);
  }
}
