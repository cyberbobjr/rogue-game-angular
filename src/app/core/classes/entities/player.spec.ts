import {TestBed} from '@angular/core/testing';
import {Player} from './player';
import {JsonEntity, JsonPlayer} from '../../interfaces/json-interfaces';
import {InventorySystem} from '../base/inventory-system';
import {GameObjectFactory} from '../../factories/game-object-factory';
import {GameObjectType} from '../../enums/game-object-type.enum';
import {GameObject} from '../gameObjects/game-object';
import {Position} from '../base/position';
import {EntitiesFactory} from '../../factories/entities-factory';
import {EntityType} from '../../enums/entity-type.enum';
import {GameClassFactory} from '../../factories/game-class-factory';
import {ClassType} from '../../enums/class-type.enum';
import {RaceFactory} from '../../factories/race-factory';
import {RaceType} from '../../enums/race-type.enum';

const playerJsonData: JsonPlayer = {
  'id': 'player',
  'entityType': EntityType.PLAYER,
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
  'inventory': [
    GameObjectFactory.create(GameObjectType.WEAPON, 'club').toJSON(),
    GameObjectFactory.create(GameObjectType.ARMOR, 'shield').toJSON()
  ],
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
    const jsonData: JsonEntity = new Player().setGameClass(GameClassFactory.getInstance()
                                                                           .createGameClass(ClassType.BARBARIAN))
                                             .setRace(RaceFactory.getInstance().createRace(RaceType.HUMAN))
                                             .toJSON();
    playerJsonData.inventory = generateInventory();
    const player: Player = EntitiesFactory.getInstance()
                                          .createEntityFromJson(jsonData) as Player;
    expect(player.race)
      .toEqual('Human');
    expect(player.gameClass)
      .toEqual('Barbarian');
  });

  it('should generate correct JSON', () => {
    const player: Player = new Player();
    player.setMapLevelAndPosition(1, new Position(0, 0));
    const weapon: GameObject = GameObjectFactory.create(GameObjectType.WEAPON, 'club');
    const letter: string = player.addToInventory(weapon);
    const jsonData = player.toJSON();
    const player1: Player = EntitiesFactory.getInstance()
                                           .createEntityFromJson(jsonData) as Player;
    const gameObject: GameObject = player1.getItemByLetter(letter);
    expect(gameObject.name)
      .toEqual('Club');
    expect(player1.position.toJSON())
      .toEqual({'x': 0, 'y': 0});
  });

  it('should be created with generated Json', () => {
    const player: any = JSON.parse(JSON.stringify(EntitiesFactory.getInstance()
                                                                 .createEntityFromJson(playerJsonData) as Player));
    const objKeys = Object.keys(playerJsonData);
    for (let i = 0; i < objKeys.length; i++) {
      if (!(player[objKeys[i]] instanceof Object)) {
        expect(player[objKeys[i]]).toEqual(playerJsonData[objKeys[i]]);
      }
    }
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
