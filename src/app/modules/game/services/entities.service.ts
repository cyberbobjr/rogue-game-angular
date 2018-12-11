import {Injectable} from '@angular/core';
import {Entity} from '../../../core/classes/base/entity';
import {Position} from '../../../core/classes/base/position';
import {IObject} from '../../../core/interfaces/IObject';
import {EventLog} from '../../../core/classes/event-log';

@Injectable({
              providedIn: 'root'
            })
export class EntitiesService {
  private _entities: Array<IObject> = [];
  private _player: Entity = null;

  get entities(): IObject[] {
    return this._entities;
  }

  set entities(value: Array<IObject>) {
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

  getEntityAtIndex(index: number): IObject {
    return this.entities[index];
  }

  tick() {
    this._entities.forEach((entity: Entity, index: number) => {
      entity.tick();
      if (entity.hp <= 0) {
        EventLog.getInstance().message = `${entity.name} is dead`;
        this._entities.splice(index, 1);
      }
    });
  }
}
