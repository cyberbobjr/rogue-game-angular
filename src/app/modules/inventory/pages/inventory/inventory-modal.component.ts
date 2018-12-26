import {Component, OnInit} from '@angular/core';
import {StorageService} from '../../../game/services/storage.service';
import {Player} from '../../../../core/classes/entities/player';

@Component({
             selector: 'app-inventory-modal',
             templateUrl: './inventory-modal.component.html',
             styleUrls: ['./inventory-modal.component.css']
           })
export class InventoryModalComponent implements OnInit {
  player: Player = null;

  constructor() {
    this.player = StorageService.loadPlayer();
  }

  ngOnInit() {
  }

}
