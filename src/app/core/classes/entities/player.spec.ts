import {TestBed} from '@angular/core/testing';
import {Player} from './player';
import {JsonEntity} from '../../interfaces/json-interfaces';

const playerJsonData: JsonEntity = {
  'id': 'player',
  'type': 1,
  'speed': 1,
  'xp': 0,
  'size': 'm',
  'name': 'Player',
  'position': {'_x': 55, '_y': 20},
  'sprite': {'_color': '#ffffff', '_bgColor': '#000000', '_light': true, '_visibility': 0, '_character': '@'},
  'strength': 17,
  'dexterity': 16,
  'constitution': 16,
  'intelligence': 11,
  'wisdom': 7,
  'charisma': 7,
  'ac': 13,
  'hp': 15,
  'gp': 51,
  'hitDice': 12,
  'inventory': [
    {
      '_jsonData': {
        'id': 'greataxe',
        'name': 'Greataxe',
        'type': 'melee',
        'cost': {'unit': 'gp', 'value': 30},
        'damage': {'type': 'slashing', 'dice': 12, 'mul': 1},
        'weight': 6,
        'properties': ['heavy', 'two-handed'],
        'sprite': {'character': '%', 'color': 'white'}
      },
      '_qty': 1,
      '_empilable': false,
      '_id': 'greataxe',
      '_name': 'Greataxe',
      '_sprite': {'_color': 'white', '_bgColor': '#000000', '_light': false, '_visibility': 0, '_character': '%'},
      '_objectType': 'WEAPON'
    },
    {
      '_qty': 10,
      '_empilable': true,
      '_sprite': {'_color': '#66bbe2', '_bgColor': '#000000', '_light': false, '_visibility': 0, '_character': 'i'},
      '_id': 'torch',
      '_name': 'Torch',
      '_objectType': 'TORCH'
    },
    {
      '_qty': 1,
      '_empilable': true,
      '_sprite': {'_color': '#66bbe2', '_bgColor': '#000000', '_light': false, '_visibility': 0, '_character': 'i'},
      '_id': 'potion',
      '_name': 'Potion',
      '_objectType': 'POTION'
    }],
  'level': 1,
  'maxHp': 15,
  'equipped': [
    [1, 'a'],
    [0, 'b']
  ],
  'race': 'Human',
  'gameClass': 'Barbarian'
};

describe('Player', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const player: Player = new Player();
    expect(player)
      .toBeTruthy();
  });

  it('can be initiated with jsonData', () => {
    const player: Player = Player.fromJSON(playerJsonData);
    expect(player.race)
      .toEqual('Human');
    expect(player.gameClass)
      .toEqual('Barbarian');
  });

  it('should generate correct JSON', () => {
    const player: Player = new Player();
    const playerJson: string = player.toJSON();
  });
});
