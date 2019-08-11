import {GameObject} from '../classes/gameObjects/game-object';
import {Sprite} from '../classes/base/sprite';

export interface JsonSprite {
  color: string;
  character: string;
  bgColor: string;
  light?: boolean;
  visibility?: number;
}

export interface JsonPosition {
  x: number;
  y: number;
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
  _level: number;
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
  entityType: number;
  abilities: JsonAbilities;
  ac: number;
  xp: number;
  hitDice: number;
  inventory: Array<JsonGameObject>;
  equipped?: Array<[number, string]>;
  race: string;
  gameClass?: string;
}

export interface JsonPlayer extends JsonEntity {
  level: number;
  mapLevel: number;
  gameClass: string;
  maxHp: number;
}

export interface JsonMonster extends JsonEntity {
  frequency: number;
}

export interface JsonArmor extends JsonGameObject {
  ac: number;
}

export interface JsonGameObject {
  id: string;
  name: string;
  type: string;
  empilable: boolean;
  objectType: string;
  cost: {
    unit: string,
    value: number
  };
  weight: number;
  properties: [
    string
  ];
  sprite: JsonSprite | Sprite;
  qty: number;
}

export interface JsonWeapon extends JsonGameObject {
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

export interface JsonMonsterClass {
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
  sprite: JsonSprite;
  weapons: [string];
  frequency: number;
  xp: number;
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

export interface JsonAbilities {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}
