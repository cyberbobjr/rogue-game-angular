import {Injectable} from '@angular/core';
import {Entity} from '../classes/base/entity';
import {Position} from '../classes/position';
import {IObject} from '../interfaces/IObject';
import {EventLog} from '../classes/event-log';

@Injectable({
  providedIn: 'root'
})
export class EntitiesService {
  private _entities: Array<Entity> = [];
  private _player: Entity = null;

  get entities(): Entity[] {
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
    this._entities[0] = this._player;
  }

  constructor() {
  }

  addEntity(actor: Entity) {
    this._entities.push(actor);
  }

  getEntityAt(position: Position): IObject | null {
    let monster: IObject = null;
    this._entities.forEach((value: Entity, index: number) => {
      if (value.position.equal(position)) {
        monster = value;
      }
    });
    return monster;
  }

  tick() {
    this._entities.forEach((entity: Entity, index: number) => {
      entity.tick();
      if (entity.hp <= 0) {
        EventLog.getInstance().message = entity.name + ' is dead';
        this._entities.splice(index, 1);
      }
    });
  }
}
