import {Position} from './position';
import {Injectable} from '@angular/core';
import {Iaction} from '../../interfaces/iaction';
import {Sprite} from './sprite';
import {IObject} from '../../interfaces/IObject';
import {IEntity} from '../../interfaces/ientity';
import {EntityType} from '../../enums/entity-type.enum';
import {AttributesFactory} from '../../factories/attributes-factory';
import {EventLog} from '../event-log';
import {SpritesFactory} from '../../factories/sprites-factory';
import {SpriteType} from '../../enums/sprite-type.enum';
import {MapEngine} from '../../../modules/game/services/map-engine.service';
import {IGameClass} from '../../interfaces/i-game-class';
import {IRace} from '../../interfaces/i-race';
import {JsonEntity} from '../../../modules/game/services/storage.service';

@Injectable({
              providedIn: 'root'
            })
export abstract class Entity implements IObject, IEntity {
  protected _backupSprite: Sprite = null;
  protected _currentAction: Iaction = null;
  protected _type: EntityType;
  protected _timeDisplaySprite: number;

  protected _hp: number;
  protected _ac: number;
  protected _gp: number;

  protected _gameClass: IGameClass;
  protected _race: IRace;
  protected _hitDice: number;

  lightRadius = 20;
  ligthPower = 7; // max is lighter

  attributes: Map<string, number> = new Map<string, number>();

  get hitDice(): number {
    return this._hitDice;
  }

  set hitDice(value: number) {
    this._hitDice = value;
  }

  get gameClass(): IGameClass {
    return this._gameClass;
  }

  get gp(): number {
    return this._gp;
  }

  set gp(value: number) {
    this._gp = value;
  }

  get constitution(): number {
    return this.attributes.get('constitution');
  }

  set constitution(value: number) {
    this.attributes.set('constitution', value);
  }

  get intelligence(): number {
    return this.attributes.get('intelligence');
  }

  set intelligence(value: number) {
    this.attributes.set('intelligence', value);
  }

  get wisdom(): number {
    return this.attributes.get('wisdom');
  }

  set wisdom(value: number) {
    this.attributes.set('wisdom', value);
  }

  get charisma(): number {
    return this.attributes.get('charisma');
  }

  set charisma(value: number) {
    this.attributes.set('charisma', value);
  }

  get dexterity(): number {
    return this.attributes.get('dexterity');
  }

  set dexterity(value: number) {
    this.attributes.set('dexterity', value);
  }

  get strength(): number {
    return this.attributes.get('strength');
  }

  set strength(value: number) {
    this.attributes.set('strength', value);
  }

  get ac(): number {
    return this._ac;
  }

  set ac(_ac: number) {
    this._ac = _ac;
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

  constructor(protected _name: string, protected _position?: Position, protected _sprite?: Sprite) {
    this._backupSprite = _sprite;
  }

  toJson() {
    return {
      name: this.name,
      position: this.position,
      sprite: this.sprite,
      strength: this.strength,
      dexterity: this.dexterity,
      constitution: this.constitution,
      intelligence: this.intelligence,
      wisdom: this.wisdom,
      charisma: this.charisma,
      ac: this.ac,
      hp: this.hp,
      gp: this.gp,
      type: this.type,
      hitDice: this.hitDice
    };
  }

  getWeaponDamageDice(): number {
    return 1 + AttributesFactory.getModifier(this.strength);
  }

  setRace(race: IRace): Entity {
    this._race = race;
    return this;
  }

  setClass(gameClass: IGameClass): Entity {
    this._gameClass = gameClass;
    this._hitDice = gameClass.getHitDice();
    return this;
  }

  getAction(): Iaction | null {
    return (this._currentAction) ? this._currentAction : null;
  }

  setNextAction(action: Iaction) {
    this._currentAction = action;
  }

  update() {
    const delta: number = (performance.now() - this._timeDisplaySprite);
    if (this._backupSprite && (delta / 1000) > 0.25) {
      this._sprite = Object.assign(this._sprite, this._backupSprite);
      this._backupSprite = null;
    }
  }

  onHit(actor: Entity, damage: number): Iaction | null {
    EventLog.getInstance().message = `${this.name} take ${damage} points of damage`;
    this.hp -= damage;
    this._backupSprite = this._sprite;
    this._sprite = SpritesFactory.createSprite(SpriteType.HITMONSTER);
    this._timeDisplaySprite = performance.now();
    return null;
  }

  onDead(_mapEngine: MapEngine): void {
    EventLog.getInstance().message = `${this.name} is dead`;
  }
}

