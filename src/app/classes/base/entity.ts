import {Position} from './position';
import {Injectable} from '@angular/core';
import {Iaction} from '../../interfaces/iaction';
import {Sprite} from './sprite';
import {IObject} from '../../interfaces/IObject';
import {IEntity} from '../../interfaces/ientity';
import {EntityType} from '../../enums/entity-type.enum';

@Injectable({
  providedIn: 'root'
})
export abstract class Entity implements IObject, IEntity {
  protected _backupSprite: Sprite = null;
  protected _currentAction: Iaction = null;
  protected _type: EntityType;
  protected _timeDisplaySprite: number;

  protected _strength: number;
  protected _hp: number;
  protected _ac: number;

  lightRadius = 20;
  ligthPower = 7; // max is lighter

  get ac(): number {
    return this._ac;
  }

  set ac(_ac: number) {
    this._ac = _ac;
  }

  get strength(): number {
    return this._strength;
  }

  set strength(value: number) {
    this._strength = value;
  }

  get type(): EntityType {
    return this._type;
  }

  set type(value: EntityType) {
    this._type = value;
  }

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

  toJSON(): any {
    return {type: this.type, strength: this.strength, hp: this.hp, name: this.name, position: this.position, sprite: this.sprite};
  }

  constructor(protected _name: string, protected _position?: Position, protected _sprite?: Sprite) {
    this._backupSprite = _sprite;
  }

  getAction(): Iaction | null {
    return (this._currentAction) ? this._currentAction : null;
  }

  setNextAction(action: Iaction) {
    this._currentAction = action;
  }

  tick() {
    const delta: number = (performance.now() - this._timeDisplaySprite);
    if (this._backupSprite && (delta / 1000) > 0.25) {
      this._sprite = Object.assign(this._sprite, this._backupSprite);
      this._backupSprite = null;
    }
  }

  abstract onHit(attacker: Entity): Iaction | null;
}

