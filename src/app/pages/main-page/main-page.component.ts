import {Component, OnInit} from '@angular/core';
import {RotMapService} from '../../services/rot-map.service';
import {EntitiesService} from '../../services/entities.service';
import {Entity} from '../../classes/entity';
import {Position} from '../../classes/position';
import {IEntity} from '../../interfaces/ientity';

@Component({
             selector: 'app-main-page',
             templateUrl: './main-page.component.html',
             styleUrls: ['./main-page.component.css']
           })
export class MainPageComponent implements OnInit {
  map: Array<Array<string>> = [];

  constructor(private rotMapService: RotMapService,
              private entitiesService: EntitiesService) {
    this._createPlayer();
  }

  ngOnInit() {
    this.map = this.rotMapService.generateNewMap(10, 10);
  }

  private _createPlayer() {
    const actorPlayer : IEntity = new Entity('player', '@', new Position(5, 5));
    this.entitiesService.addEntity(actorPlayer);
  }
}
