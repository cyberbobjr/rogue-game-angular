import {GameObject} from '../classes/base/game-object';

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
  _type: number;
  _name: string;
  _opaque: boolean;
  _position: JsonPosition;
  _sprite: JsonSprite;
  _contents: Array<GameObject>;
}

export interface JsonMap {
  _data: [[JSonCell]];
  _height: number;
  _width: number;
}

export interface JsonEntity {
  id: string;
  gp: number;
  hp: number;
  name: string;
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
}

export interface JsonWeapon {
  id: string;
  name: string;
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
}
