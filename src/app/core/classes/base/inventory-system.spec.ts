import {TestBed} from '@angular/core/testing';
import {InventorySystem} from './inventory-system';
import {Player} from '../entities/player';
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
      'empilable': false,
      '_id': 'greataxe',
      '_name': 'Greataxe',
      '_sprite': {'_color': 'white', '_bgColor': '#000000', '_light': false, '_visibility': 0, '_character': '%'},
      'objectType': 'WEAPON'
    },
    {
      '_qty': 10,
      'empilable': true,
      '_sprite': {'_color': '#66bbe2', '_bgColor': '#000000', '_light': false, '_visibility': 0, '_character': 'i'},
      '_id': 'torch',
      '_name': 'Torch',
      'objectType': 'TORCH'
    },
    {
      '_qty': 1,
      'empilable': true,
      '_sprite': {'_color': '#66bbe2', '_bgColor': '#000000', '_light': false, '_visibility': 0, '_character': 'i'},
      '_id': 'potion',
      '_name': 'Potion',
      'objectType': 'POTION'
    }],
  'level': 1,
  'maxHp': 15,
  'equipped': [
    [1, 'a'],
    [0, 'b']
  ],
  'race': {
    'id': 'HUMAN',
    'name': 'Human',
    'speed': 30,
    'size': 'm',
    'modifiers': {'strength': 1, 'dexterity': 1, 'constitution': 1, 'intelligence': 1, 'wisdom': 1, 'charisma': 1}
  },
  'gameClass': {
    'id': 'BARBARIAN',
    'name': 'Barbarian',
    'hitDice': 12,
    'ac': 14,
    'modifiers': {'strength': 3, 'dexterity': 2, 'constitution': 2, 'intelligence': -1, 'wisdom': 1, 'charisma': 0},
    'gp': {'dice': 4, 'mul': 5, 'bonus': 10},
    'sprite': {'character': 'O', 'color': '#FFFFFF'},
    'equipment': [
      {'id': 'greataxe', 'type': 'WEAPON', 'qty': 1},
      {'id': 'torch', 'type': 'TORCH', 'qty': 10},
      {'id': 'food', 'type': 'FOOD', 'qty': 10},
      {'id': 'shield', 'type': 'ARMOR', 'qty': 1}
    ]
  }
};

describe('Inventorysystem', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const inventory: InventorySystem = new InventorySystem();
    expect(inventory)
      .toBeTruthy();
  });

  it('can be initiated with object', () => {
    const player: Player = Player.fromJSON(playerJsonData);
    expect(player.xp)
      .toEqual(0);
    const inventory: InventorySystem = new InventorySystem();
  });
});
