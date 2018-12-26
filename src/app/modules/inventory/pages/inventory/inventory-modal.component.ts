import {Component, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {StorageService} from '../../../game/services/storage.service';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {GameEngineService} from '../../../game/services/game-engine.service';
import {Router} from '@angular/router';
import {EntitiesService} from '../../../game/services/entities.service';

@Component({
             selector: 'app-inventory-modal',
             templateUrl: './inventory-modal.component.html',
             styleUrls: ['./inventory-modal.component.css']
           })
export class InventoryModalComponent implements OnInit, OnDestroy {
  private _handleKeyBackup: any;
  private _listener: any = null;

  constructor(private _modalService: NgxSmartModalService,
              private _gameEngine: GameEngineService,
              private _entitiesService: EntitiesService,
              private _router: Router,
              private _renderer: Renderer2) {
  }

  ngOnInit() {
    if (this._router.url === '/game') {
      this.initModalHandler();
    } else {
      this._entitiesService.player = StorageService.loadPlayer();
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
          this._restoreKeyboardHandler();
        });
  }

  keyboardHandler(key: KeyboardEvent) {
    console.log(key);
  }

  private _restoreKeyboardHandler() {
    if (this._handleKeyBackup) {
      this._gameEngine.handleKeyEvent = this._handleKeyBackup;
    }
  }
}
