import {TestBed} from '@angular/core/testing';
import {Player} from './player';
import {JsonPlayer} from '../../interfaces/json-interfaces';
import {InventorySystem} from '../base/inventory-system';
import {GameObjectFactory} from '../../factories/game-object-factory';
import {GameObjectType} from '../../enums/game-object-type.enum';
import {GameObject} from '../gameObjects/game-object';
import {Position} from '../base/position';

let playerJsonData: JsonPlayer = {
  'id': 'player',
  'entityType': 1,
  'speed': 1,
  'xp': 0,
  'size': 'm',
  'name': 'Player',
  'position': {'x': 55, 'y': 20},
  'sprite': {'color': '#ffffff', 'bgColor': '#000000', 'light': true, 'visibility': 0, 'character': '@'},
  'abilities': {
    'strength': 17,
    'dexterity': 16,
    'constitution': 16,
    'intelligence': 11,
    'wisdom': 7,
    'charisma': 7
  },
  'ac': 13,
  'hp': 15,
  'gp': 51,
  'hitDice': 12,
  'inventory': [],
  'level': 1,
  'mapLevel': 1,
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
    playerJsonData.inventory = generateInventory();
    const player: Player = Player.fromJSON(playerJsonData);
    expect(player.race)
      .toEqual('Human');
    expect(player.gameClass)
      .toEqual('Barbarian');
    expect(player.isInventoryEquipped('a'))
      .toBeTruthy();
  });

  it('should generate correct JSON', () => {
    const player: Player = new Player();
    player.setMapLevelAndPosition(1, new Position(0, 0));
    const weapon: GameObject = GameObjectFactory.create(GameObjectType.WEAPON, 'club');
    const letter: string = player.addToInventory(weapon);
    playerJsonData = player.toJSON();
    const player1: Player = Player.fromJSON(playerJsonData);
    const gameObject: GameObject = player1.getItemByLetter(letter);
    expect(gameObject.name)
      .toEqual('Club');
    expect(player1.position.toJSON())
      .toEqual({'x': 0, 'y': 0});
  });

  it('should be created with generated Json', () => {
    const player: Player = Player.fromJSON(playerJsonData);
    expect(player.toJSON())
      .toEqual(playerJsonData);
  });

  const generateInventory = function () {
    const inventory: InventorySystem = new InventorySystem();
    const weapon: GameObject = GameObjectFactory.create(GameObjectType.WEAPON, 'club');
    const potion: GameObject = GameObjectFactory.create(GameObjectType.POTION);
    const shield: GameObject = GameObjectFactory.create(GameObjectType.ARMOR, 'shield');

    inventory.addToInventory(weapon);
    inventory.addToInventory(potion);
    inventory.addToInventory(shield);
    return inventory.toJSON();
  };
});
