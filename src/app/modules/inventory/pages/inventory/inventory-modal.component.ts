import {Component, OnInit, Renderer2} from '@angular/core';
import {StorageService} from '../../../game/services/storage.service';
import {Player} from '../../../../core/classes/entities/player';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {GameEngineService} from '../../../game/services/game-engine.service';
import {Router} from '@angular/router';

@Component({
             selector: 'app-inventory-modal',
             templateUrl: './inventory-modal.component.html',
             styleUrls: ['./inventory-modal.component.css']
           })
export class InventoryModalComponent implements OnInit {
  player: Player = null;
  private _handleKeyBackup: any;

  /*@HostListener('document:keydown', ['$event'])
   handleKeyEvent(keyboardEvent: KeyboardEvent) {
   this.keyboardHandler(keyboardEvent);
   keyboardEvent.preventDefault();
   keyboardEvent.stopPropagation();
   return false;
   }*/

  constructor(private _modalService: NgxSmartModalService,
              private _gameEngine: GameEngineService,
              private _router: Router,
              private _renderer: Renderer2) {
    this.player = StorageService.loadPlayer();
  }

  ngOnInit() {
    if (this._router.url === '/game') {
      this.initModalHandler();
    } else {
      this._renderer.listen(document, 'keydown', (keyEvent) => {
        this.keyboardHandler(keyEvent);
      });
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
