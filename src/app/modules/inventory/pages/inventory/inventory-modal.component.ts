import {Component, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {StorageService} from '../../../game/services/storage.service';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {GameEngineService} from '../../../game/services/game-engine.service';
import {Router} from '@angular/router';
import {EntitiesService} from '../../../game/services/entities.service';
import {Player} from '../../../../core/classes/entities/player';
import {GameObject} from '../../../../core/classes/gameObjects/game-object';
import {Armour} from '../../../../core/classes/gameObjects/armour';
import {Weapon} from '../../../../core/classes/gameObjects/weapon';
import {Potion} from '../../../../core/classes/gameObjects/potion';
import {Food} from '../../../../core/classes/gameObjects/food';

@Component({
             selector: 'app-inventory-modal',
             templateUrl: './inventory-modal.component.html',
             styleUrls: ['./inventory-modal.component.css']
           })
export class InventoryModalComponent implements OnInit, OnDestroy {
  private _handleKeyBackup: any;
  private _listener: any = null;
  private _selected: string = null;
  private _player: Player = null;

  constructor(private _modalService: NgxSmartModalService,
              private _gameEngine: GameEngineService,
              private _entitiesService: EntitiesService,
              private _router: Router,
              private _renderer: Renderer2) {
  }

  ngOnInit() {
    if (this._router.url === '/game') {
      this._player = this._entitiesService.player;
      this.initModalHandler();
    } else {
      this._player = StorageService.loadPlayer();
      this._listener = this._renderer.listen(document, 'keydown', (keyEvent) => {
        this.keyboardHandler(keyEvent);
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
      if (this._player.inventory.has(letter)) {
        this._selected = letter;
      }
    } else {
      if (letter === 'c') {
        this._selected = null;
      }
      console.log(key);
    }
  }

  isSelectedWearable(): boolean {
    const object: GameObject = this._player.inventory.get(this._selected);
    return (object instanceof Armour);
  }

  isSelectedEquipable(): boolean {
    const object: GameObject = this._player.inventory.get(this._selected);
    return (object instanceof Weapon);
  }

  isSelectedDrinkable(): boolean {
    const object: GameObject = this._player.inventory.get(this._selected);
    return (object instanceof Potion);
  }

  isSelectedEatable(): boolean {
    const object: GameObject = this._player.inventory.get(this._selected);
    return (object instanceof Food);
  }
}
