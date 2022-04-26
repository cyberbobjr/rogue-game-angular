import {JsonPlayer} from '../interfaces/json-interfaces';

describe('entities factory test', () => {
  const jsonPlayerData: JsonPlayer = {
    'xp': 0,
    'name': 'Player',
    'position': {'x': 57, 'y': 41},
    'sprite': {'character': '@', 'color': '#ffffff', 'bgColor': '#000000'},
    'abilities': {
      'strength': 19,
      'dexterity': 19,
      'constitution': 19,
      'intelligence': 19,
      'wisdom': 19,
      'charisma': 19
    },
    'ac': 14,
    'hp': 16,
    'gp': 50,
    'hitDice': 12,
    'inventory': [
      {
        'id': 'greataxe',
        'name': 'Greataxe',
        'sprite': {'character': '%', 'color': 'white', 'bgColor': '#000000'},
        'qty': 1,
        'empilable': true,
        'type': 'melee',
        'objectType': 'WEAPON',
        'cost': {'unit': 'gp', 'value': 30},
        'weight': 6,
        'properties': ['heavy', 'two-handed'],
        'damage': {'type': 'slashing', 'dice': 12, 'mul': 1}
      },
      {
        'id': 'torch',
        'name': 'Torch',
        'sprite': {'character': 'i', 'color': '#66bbe2', 'bgColor': '#000000'},
        'qty': 10,
        'empilable': true,
        'objectType': 'TORCH'
      },
      {
        'id': 'food',
        'name': 'food',
        'sprite': {'character': 'f', 'color': '#087a34', 'bgColor': '#000000'},
        'qty': 10,
        'empilable': true,
        'objectType': 'FOOD'
      },
      {
        'id': 'shield',
        'name': 'Shield',
        'sprite': {'character': 'O', 'color': '#b28255', 'bgColor': '#000000'},
        'qty': 1,
        'empilable': true,
        'type': 'shield',
        'objectType': 'ARMOR',
        'cost': {'unit': 'gp', 'value': 10},
        'weight': 6,
        'properties': ['bonus'],
        'ac': 2
      }, {
        'id': 'handaxe',
        'name': 'Handaxe',
        'sprite': {'character': '%', 'color': 'white', 'bgColor': '#000000'},
        'qty': 1,
        'empilable': true,
        'type': 'melee',
        'objectType': 'WEAPON',
        'cost': {'unit': 'gp', 'value': 5},
        'weight': 2,
        'properties': ['light'],
        'damage': {'type': 'slashing', 'dice': 6, 'mul': 1},
        'thrown': {'normal': 20, 'long': 60}
      }],
    'race': 'Human',
    'entityType': 0,
    'level': 1,
    'maxHp': 16,
    'equipped': [[0, 'b']],
    'gameClass': 'Barbarian',
    'mapLevel': 2
  };

  it('should create Player from JsonData', () => {

  });
});
