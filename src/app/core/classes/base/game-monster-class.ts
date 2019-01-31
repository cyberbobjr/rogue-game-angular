import {JsonMonster} from '../../interfaces/json-interfaces';
import {Utility} from '../utility';
import {Sprite} from './sprite';
import {Weapon} from '../gameObjects/weapon';
import {GameObjectFactory} from '../../factories/game-object-factory';

export class GameMonsterClass {

  get weapons(): Array<Weapon> {
    const weapons: Array<Weapon> = [];
    this._jsonMonster.weapons.forEach((weaponId: string) => {
      weapons.push(GameObjectFactory.getInstance()
                                    .getWeaponById(weaponId));
    });
    return weapons;
  }

  get id(): string {
    return this._jsonMonster.id;
  }

  get name(): string {
    return this._jsonMonster.name;
  }

  get ac(): number {
    return this._jsonMonster.ac;
  }

  get strength(): number {
    return this._jsonMonster.abilities.strength;
  }

  get dexterity(): number {
    return this._jsonMonster.abilities.dexterity;
  }

  get constitution(): number {
    return this._jsonMonster.abilities.constitution;
  }

  get intelligence(): number {
    return this._jsonMonster.abilities.intelligence;
  }

  get wisdom(): number {
    return this._jsonMonster.abilities.wisdom;
  }

  get charisma(): number {
    return this._jsonMonster.abilities.charisma;
  }

  get hp(): number {
    return this._jsonMonster.hp.mul * Utility.rolldice(this._jsonMonster.hp.dice) + this._jsonMonster.hp.bonus;
  }

  get gp(): number {
    return Utility.rolldice(this._jsonMonster.gp.dice);
  }

  get sprite(): Sprite {
    return new Sprite(this._jsonMonster.sprite.character, this._jsonMonster.sprite.color);
  }

  get size(): string {
    return this._jsonMonster.size;
  }

  get speed(): number {
    return this._jsonMonster.speed;
  }

  get frequency(): number {
    return this._jsonMonster.frequency;
  }

  constructor(private _jsonMonster: JsonMonster) {
  }

  toJSON(): any {
    return this._jsonMonster;
  }
}
