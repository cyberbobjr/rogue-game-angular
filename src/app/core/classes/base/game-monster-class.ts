import {JsonMonster} from '../../interfaces/json-interfaces';
import {Utility} from '../utility';
import {Sprite} from './sprite';
import {Weapon} from '../gameObjects/weapon';
import {GameObjectFactory} from '../../factories/game-object-factory';

export class GameMonsterClass {

  get weapons(): Array<Weapon> {
    const weapons: Array<Weapon> = [];
    this._jsonData.weapons.forEach((weaponId: string) => {
      weapons.push(GameObjectFactory.getInstance()
                                    .getWeaponById(weaponId));
    });
    return weapons;
  }

  get id(): string {
    return this._jsonData.id;
  }

  get name(): string {
    return this._jsonData.name;
  }

  get ac(): number {
    return this._jsonData.ac;
  }

  get strength(): number {
    return this._jsonData.abilities.strength;
  }

  get dexterity(): number {
    return this._jsonData.abilities.dexterity;
  }

  get constitution(): number {
    return this._jsonData.abilities.constitution;
  }

  get intelligence(): number {
    return this._jsonData.abilities.intelligence;
  }

  get wisdom(): number {
    return this._jsonData.abilities.wisdom;
  }

  get charisma(): number {
    return this._jsonData.abilities.charisma;
  }

  get hp(): number {
    return this._jsonData.hp.mul * Utility.rolldice(this._jsonData.hp.dice) + this._jsonData.hp.bonus;
  }

  get gp(): number {
    return Utility.rolldice(this._jsonData.gp.dice);
  }

  get sprite(): Sprite {
    return new Sprite(this._jsonData.sprite.character, this._jsonData.sprite.color);
  }

  get size(): string {
    return this._jsonData.size;
  }

  get speed(): number {
    return this._jsonData.speed;
  }

  get frequency(): number {
    return this._jsonData.frequency;
  }

  constructor(private _jsonData: JsonMonster) {
  }

  toJSON(): any {
    return this._jsonData;
  }
}
