import {Position} from './position';
import {Injectable} from '@angular/core';
import {Iaction} from '../../interfaces/iaction';
import {Sprite} from './sprite';
import {Iobject} from '../../interfaces/iobject';
import {IEntity} from '../../interfaces/ientity';
import {EntityType} from '../../enums/entity-type.enum';
import {EventLog} from '../event-log';
import {SpritesFactory} from '../../factories/sprites-factory';
import {SpriteType} from '../../enums/sprite-type.enum';
import {Weapon} from '../gameObjects/weapon';
import {GameObject} from '../gameObjects/game-object';
import {SlotType} from '../../enums/equiped-type.enum';
import {GameEngineService} from '../../../modules/game/services/game-engine.service';
import {InventorySystem} from './inventory-system';
import {JsonAbilities, JsonEntity} from '../../interfaces/json-interfaces';

@Injectable({
              providedIn: 'root'
            })
export abstract class Entity implements Iobject, IEntity {
  protected _backupSprite: Sprite = null;
  protected _currentAction: Iaction = null;
  protected _entityType: EntityType;
  protected _timeDisplaySprite: number;
  protected _position?: Position;
  protected _name: string;
  protected _sprite?: Sprite;
  protected _race: string;

  protected _hp: number;
  protected _ac: number;
  protected _gp: number;

  protected _hitDice: number;
  protected _id: string;
  protected _speed: number;
  protected _size: string;

  protected _ap = 0; // action points
  protected _xp = 0; // xp for player or challenge point

  protected _inventory: InventorySystem = new InventorySystem();
  protected _equippedItem: Map<SlotType, string> = new Map<SlotType, string>();
  protected _abilities: JsonAbilities = {
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0
  };

  lightRadius = 20;
  lightPower = 3; // max is lighter


  get race(): string {
    return this._race;
  }

  set race(value: string) {
    this._race = value;
  }

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

  get inventory(): InventorySystem {
    return this._inventory;
  }

  set inventory(value: InventorySystem) {
    this._inventory = value;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  set hitDice(value: number) {
    this._hitDice = value;
  }

  get hitDice(): number {
    return this._hitDice;
  }

  get gp(): number {
    return this._gp;
  }

  set gp(value: number) {
    this._gp = value;
  }

  get constitution(): number {
    return this._abilities.constitution;
  }

  set constitution(value: number) {
    this._abilities['constitution'] = value;
  }

  get intelligence(): number {
    return this._abilities.intelligence;
  }

  set intelligence(value: number) {
    this._abilities['intelligence'] = value;
  }

  get wisdom(): number {
    return this._abilities.wisdom;
  }

  set wisdom(value: number) {
    this._abilities['wisdom'] = value;
  }

  get charisma(): number {
    return this._abilities.charisma;
  }

  set charisma(value: number) {
    this._abilities['charisma'] = value;
  }

  get dexterity(): number {
    return this._abilities.dexterity;
  }

  set dexterity(value: number) {
    this._abilities['dexterity'] = value;
  }

  get strength(): number {
    return this._abilities.strength;
  }

  set strength(value: number) {
    this._abilities['strength'] = value;
  }

  get ac(): number {
    return this._ac;
  }

  set ac(_ac: number) {
    this._ac = _ac;
  }

  get type(): EntityType {
    return this._entityType;
  }

  set type(value: EntityType) {
    this._entityType = value;
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

  get xp(): number {
    return this._xp;
  }

  set xp(value: number) {
    this._xp = value;
  }

  toJSON(): JsonEntity {
    return {
      xp: this.xp,
      name: this.name,
      id: this.id,
      position: this._position.toJSON(),
      sprite: this.sprite.toJSON(),
      abilities: this._abilities,
      ac: this.ac,
      hp: this.hp,
      gp: this.gp,
      hitDice: this.hitDice,
      inventory: this._inventory.toJSON(),
      speed: this.speed,
      size: this.size,
      race: this._race,
      entityType: this._entityType,
    };
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

  // region Events
  onHit(actor: Entity, damage: number) {
    EventLog.getInstance().message = `${this.name} take ${damage} points of damage`;
    this.hp -= damage;
    if (!this._backupSprite) {
      this._backupSprite = this._sprite;
      this._sprite = SpritesFactory.createSprite(SpriteType.HITENTITY);
      this._timeDisplaySprite = performance.now();
    }
  }

  onDead(_gameEngine: GameEngineService): void {
    EventLog.getInstance().message = `${this.name} is dead`;
  }

  onRest() {

  }

  // end region

  addToInventory(gameObject: GameObject): string {
    return this._inventory.addToInventory(gameObject);
  }

  setInventory(arrInventory: Array<GameObject>) {
    arrInventory.forEach((value: GameObject) => {
      this.addToInventory(value);
    });
  }

  useInventory(letterInventory: string, qty = 1): boolean {
    return this._inventory.removeFromInventory(letterInventory, qty);
  }

  getItemByLetter(inventoryLetter: string): GameObject {
    return this._inventory.getGameObjectByInventoryLetter(inventoryLetter);
  }

  equipInventory(inventoryletter: string): boolean {
    return this._inventory.equip(inventoryletter);
  }

  unequipItem(inventoryLetter: string): boolean {
    return this._inventory.unequip(inventoryLetter);
  }

  getWeaponsDamage(): number {
    const weaponsEquipped: Array<Weapon> = this._getEquippedWeapons();
    let totalDamage = 0;
    weaponsEquipped.forEach((weapon: Weapon) => {
      totalDamage += weapon.getDamage();
    });
    totalDamage = Math.max(1, totalDamage);
    return totalDamage;
  }

  inventoryContain(letterInventory: string): boolean {
    return this._inventory.hasLetter(letterInventory);
  }

  removeFromInventory(letterInventory: string): boolean {
    return this._inventory.removeFromInventory(letterInventory);
  }

  withAbilities(abilities: Map<string, number>): Entity {
    abilities.forEach((value: number, ability: string) => {
      this._abilities[ability] = value;
    });
    return this;
  }

  private _getEquippedWeapons(): Array<Weapon> {
    const weaponsEquipped: Array<Weapon> = [];
    for (const [key, value] of this._equippedItem) {
      const gameObject: GameObject = this._inventory.getGameObjectByInventoryLetter(value);
      if ((key === SlotType.TWOHANDS || key === SlotType.RIGHTHAND || key === SlotType.LEFTHAND) && (gameObject instanceof Weapon)) {
        weaponsEquipped.push(gameObject as Weapon);
      }
    }
    return weaponsEquipped;
  }
}

