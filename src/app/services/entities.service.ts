import {Injectable} from '@angular/core';
import {RotDisplayService} from './rot-display.service';
import {IEntity} from '../interfaces/ientity';
import {Entity} from '../classes/entity';

@Injectable({
              providedIn: 'root'
            })
export class EntitiesService {
  playerEntity: IEntity;
  entities: Array<IEntity> = [];

  set player(entity: Entity) {
    this.playerEntity = entity;
  }

  get player(): IEntity {
    return this.playerEntity;

  }

  constructor() {
  }
}
