import {Position} from '../position';
import {Injectable} from '@angular/core';
import {Iaction} from '../../interfaces/iaction';
import {Sprite} from './sprite';
import {IObject} from '../../interfaces/IObject';

@Injectable({
              providedIn: 'root'
            })
export class Entity implements IObject {
  protected _position: Position;
  protected _name: string;
  protected _currentAction: Iaction = null;
  protected _sprite: Sprite = null;
  lightRadius = 20;
  ligthPower = 7; // max is lighter

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

  constructor(name: string, position?: Position) {
    this._name = name;
    if (position) {
      this._position = position;
    }
  }

  getAction(): Iaction | null {
    return (this._currentAction) ? this._currentAction : null;
  }

  setNextAction(action: Iaction) {
    this._currentAction = action;
  }
}
