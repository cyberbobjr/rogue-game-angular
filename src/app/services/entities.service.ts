import {Injectable} from '@angular/core';
import {IEntity} from '../interfaces/ientity';

@Injectable({
              providedIn: 'root'
            })
export class EntitiesService {
  private _playerEntity: IEntity;
  entities: Map<string, IEntity> = new Map<string, IEntity>();

  set player(entity: IEntity) {
    this._playerEntity = entity;
  }

  get player(): IEntity {
    return this._playerEntity;
  }

  constructor() {
  }

  addEntity(actor: IEntity) {
    this.entities.set(actor.name, actor);
  }
}
