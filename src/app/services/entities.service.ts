import {Injectable} from '@angular/core';
import {IEntity} from '../interfaces/ientity';

@Injectable({
              providedIn: 'root'
            })
export class EntitiesService {
  entities: Array<IEntity> = [];
  private _player: IEntity;

  get player(): IEntity {
    return this._player;
  }

  set player(actor: IEntity) {
    this._player = actor;
    this.entities.push(this._player);
  }

  constructor() {
  }

  addEntity(actor: IEntity) {
    this.entities.push(actor);
  }

}
