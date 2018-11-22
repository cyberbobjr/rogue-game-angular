import {Injectable} from '@angular/core';
import {IEntity} from '../interfaces/ientity';

@Injectable({
              providedIn: 'root'
            })
export class EntitiesService {
  private _entities: Array<IEntity> = [];
  private _player: IEntity = null;

  get entities(): Array<IEntity> {
    return this._entities;
  }

  set entities(value: Array<IEntity>) {
    this._entities = value;
  }

  get player(): IEntity | null {
    return this._player;
  }

  set player(actor: IEntity) {
    this._player = actor;
    this._entities.push(this._player);
  }

  constructor() {
  }

  addEntity(actor: IEntity) {
    this._entities.push(actor);
  }

}
