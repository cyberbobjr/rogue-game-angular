import {Injectable} from '@angular/core';
import {Entity} from '../classes/base/entity';
import {Position} from '../classes/position';
import {IEntity} from '../interfaces/ientity';

@Injectable({
  providedIn: 'root'
})
export class EntitiesService {
  private _entities: Array<Entity> = [];
  private _player: Entity = null;

  get entities(): Array<Entity> {
    return this._entities;
  }

  set entities(value: Array<Entity>) {
    this._entities = value;
  }

  get player(): Entity | null {
    return this._player;
  }

  set player(actor: Entity) {
    this._player = actor;
    this._entities.push(this._player);
  }

  constructor() {
  }

  addEntity(actor: Entity) {
    this._entities.push(actor);
  }

  getEntityAt(position: Position): IEntity | null {
    let monster: IEntity = null;
    this._entities.forEach((value: Entity, index: number) => {
      if (value.position.equal(position)) {
        monster = value;
      }
    });
    return monster;
  }
}
