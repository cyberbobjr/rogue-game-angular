import {Position} from '../position';
import {Injectable} from '@angular/core';
import {Iaction} from '../../interfaces/iaction';
import {Sprite} from './sprite';
import {IObject} from '../../interfaces/IObject';
import {IEntity} from '../../interfaces/ientity';
import {MapEngine} from '../../services/map-engine.service';

@Injectable({
              providedIn: 'root'
            })
export abstract class Entity implements IObject, IEntity {
  protected _name: string;
  protected _currentAction: Iaction = null;
  protected _hp: number;

  lightRadius = 20;
  ligthPower = 7; // max is lighter

  get hp(): number {
    return this._hp;
  }

  set hp(hp: number) {
    this._hp = hp;
  }

  get sprite(): Sprite {
    return this._sprite;
  }

  set sprite(value: Sprite) {
    this._sprite = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get position(): Position {
    return this._position;
  }

  set position(value: Position) {
    this._position = value;
  }

  constructor(name: string, protected _position?: Position, protected _sprite?: Sprite) {
    this._name = name;
  }

  getAction(): Iaction | null {
    return (this._currentAction) ? this._currentAction : null;
  }

  setNextAction(action: Iaction) {
    this._currentAction = action;
  }

  tick() {

  }

  abstract onHit(attacker: Entity): Iaction | null;
}

