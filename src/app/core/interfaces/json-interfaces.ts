import {GameObject} from '../classes/gameObjects/game-object';

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
  inventory: [{ id: string, objectType: string, _jsonData: JsonWeapon }];
}

export interface JsonWeapon {
  id: string;
  name: string;
  type: string;
  objectType: string;
  cost: {
    unit: string,
    value: number
  };
  damage: {
    type: string,
    dice: number,
    mul: number
  };
  weight: number;
  properties: [
    string
    ];
  thrown?: {
    normal: number;
    long: number;
  };
  sprite: {
    character: string;
    color: string;
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
