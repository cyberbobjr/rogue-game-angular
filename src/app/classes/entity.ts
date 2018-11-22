import {IEntity} from '../interfaces/ientity';
import {Position} from './position';
import {Injectable} from '@angular/core';
import {Iaction} from '../interfaces/iaction';

@Injectable({
              providedIn: 'root'
            })
export class Entity implements IEntity {
  private _position: Position;
  private _name: string;
  private _currentAction: Iaction = null;

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

  private _character: string;

  get character(): string {
    return this._character;
  }

  set character(value: string) {
    this._character = value;
  }

  constructor(name: string, character: string, position?: Position) {
    this._name = name;
    this._character = character;
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
