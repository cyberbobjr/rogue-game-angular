import {Position} from './position';
import {Injectable} from '@angular/core';
import {Iaction} from '../../interfaces/iaction';
import {Sprite} from './sprite';
import {Iobject} from '../../interfaces/iobject';
import {IEntity} from '../../interfaces/ientity';
import {EntityType} from '../../enums/entity-type.enum';
import {AttributesFactory} from '../../factories/attributes-factory';
import {EventLog} from '../event-log';
import {SpritesFactory} from '../../factories/sprites-factory';
import {SpriteType} from '../../enums/sprite-type.enum';
import {MapEngine} from '../../../modules/game/services/map-engine.service';
import {IRace} from '../../interfaces/i-race';
import {Weapon} from '../gameObjects/weapon';
import {GameClass} from './game-class';
import {GameObject} from '../gameObjects/game-object';
import {Utility} from '../utility';

@Injectable({
              providedIn: 'root'
            })
export abstract class Entity implements Iobject, IEntity {
  protected _backupSprite: Sprite = null;
  protected _currentAction: Iaction = null;
  protected _type: EntityType;
  protected _timeDisplaySprite: number;
  protected _position?: Position;
  protected _name: string;
  protected _sprite?: Sprite;

  protected _hp: number;
  protected _ac: number;
  protected _gp: number;

  protected _race: IRace;
  protected _hitDice: number;
  protected _id: string;
  protected _speed: number;
  protected _size: string;

  protected _ap = 0; // action points

  protected _inventory: Map<string, GameObject> = new Map<string, GameObject>();

  lightRadius = 20;
  ligthPower = 7; // max is lighter

  attributes: Map<string, number> = new Map<string, number>();

  get ap(): number {
    return this._ap;
  }

  set ap(value: number) {
    this._ap = value;
  }

  get speed(): number {
    return this._speed;
  }

  set speed(value: number) {
    this._speed = value;
  }

  get size(): string {
    return this._size;
  }

  set size(value: string) {
    this._size = value;
  }

  get weapons(): Array<Weapon> {
    const filteredObjects: Array<Weapon> = [];
    this._inventory.forEach((gameObject: GameObject, key: string) => {
      if (gameObject.objectType === 'WEAPON') {
        filteredObjects.push(gameObject as Weapon);
      }
    });
    return filteredObjects;
  }

  get inventory(): Map<string, GameObject> {
    return this._inventory;
  }

  set inventory(value: Map<string, GameObject>) {
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get hitDice(): number {
    return this._hitDice;
  }

  set hitDice(value: number) {
    this._hitDice = value;
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

  toJSON() {
    return {
      name: this.name,
      id: this.id,
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
      hitDice: this.hitDice,
      inventory: Array.from(this.inventory.values()),
      speed: this.speed,
      size: this.size
    };
  }

  getWeaponDamageDice(): number {
    return 1 + AttributesFactory.getModifier(this.strength);
  }

  setRace(race: IRace): Entity {
    this._race = race;
    return this;
  }

  setGameClass(gameClass: GameClass): Entity {
    this._hitDice = gameClass.getHitDice();
    this._hp = this._hitDice + this.constitution;
    this._gp = gameClass.getGp();
    return this;
  }

  getAction(): Iaction | null {
    return (this._currentAction) ? this._currentAction : null;
  }

  getInfo(): string {
    return '';
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

  addToInventory(gameObject: GameObject) {
    this._inventory.set(Utility.getLetter(this._inventory.size), gameObject);
  }

  setInventory(arrInventory: Array<GameObject>) {
    arrInventory.forEach((value: GameObject) => {
      this.addToInventory(value);
    });
  }

  getItemByLetter(inventoryLetter: string): GameObject {
    return this._inventory.get(inventoryLetter);
  }
}

