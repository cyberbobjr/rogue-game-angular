import {Component, OnInit} from '@angular/core';
import {RotMapService} from '../../services/rot-map.service';
import {EntitiesService} from '../../services/entities.service';
import {Entity} from '../../classes/entity';
import {Position} from '../../classes/position';

@Component({
             selector: 'app-main-page',
             templateUrl: './main-page.component.html',
             styleUrls: ['./main-page.component.css']
           })
export class MainPageComponent implements OnInit {
  map: Array<Array<string>> = [];

  constructor(private rotMapService: RotMapService,
              private entitiesService: EntitiesService) {
  }

  ngOnInit() {
    this.map = this.rotMapService.generateNewMap(10, 10);
    this._createPlayer();
  }

  private _createPlayer() {
    this.entitiesService.player = new Entity('player', '@', new Position(5, 5));
  }
}
