import {GameObject} from '../classes/gameObjects/game-object';
import {Sprite} from '../classes/base/sprite';

export interface JsonSprite {
  _color: string;
  _character: string;
  _bgColor: string;
  _light: boolean;
  _visibility: number;
}

export interface JsonPosition {
  _x: number;
  _y: number;
}

export interface JSonCell {
  type: number;
  name: string;
  opaque: boolean;
  position: JsonPosition;
  sprite: JsonSprite;
  contents: Array<GameObject>;
}

export interface JsonMap {
  _seed: number;
  _data: [[JSonCell]];
  _height: number;
  _width: number;
  _entities: [JsonEntity];
}

export interface JsonEntity {
  id: string;
  gp: number;
  hp: number;
  maxHp?: number;
  name: string;
  speed: number;
  size: string;
  position: JsonPosition;
  sprite: JsonSprite;
  type: number;
  strength: number;
  ac: number;
  xp: number;
  hitDice: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  level: number;
  inventory: Array<JsonInventory>;
  equipped?: Array<[number, string]>;
  race: string;
  gameClass: string;
}

export interface JsonInventory {
  _id: string;
  _name: string;
  _jsonData?: any;
  _qty: number;
  _sprite: JsonSprite;
  _objectType: string;
  _empilable: boolean;
}

export interface JsonArmor {
  id: string;
  name: string;
  type: string;
  objectType: string;
  ac: number;
  cost: {
    unit: string,
    value: number
  };
  weight: number;
  sprite: {
    character: string;
    color: string;
  };
  properties: [
    string
    ];
}

export interface JsonGameObject {
  id: string;
  name: string;
  type: string;
  objectType: string;
  cost: {
    unit: string,
    value: number
  };
  weight: number;
  properties: [
    string
    ];
  sprite: {
    character: string;
    color: string;
  };
}

export interface JsonWeapon {
  damage: {
    type: string,
    dice: number,
    mul: number
  };
  thrown?: {
    normal: number;
    long: number;
  };
}

export interface JsonGameClass {
  id: string;
  name: string;
  hitDice: number;
  ac: number;
  modifiers: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };
  gp: {
    dice: number;
    mul: number;
    bonus: number;
  };
  sprite: {
    character: string;
    color: string;
  };
  equipment: Array<{
    id: string;
    type: string;
    qty: number;
  }>;
}

export interface JsonMonster {
  id: string;
  name: string;
  hp: {
    dice: number;
    mul: number;
    bonus: number;
  };
  speed: number;
  size: string;
  abilities: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };
  ac: number;
  gp: {
    dice: number;
  };
  sprite: {
    character: string;
    color: string;
  };
  weapons: [string];
  frequency: number;
  xp: number;
}

export interface JsonRace {
  id: string;
  name: string;
  speed: number;
  size: string;
  modifiers: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };
}
