import {TestBed} from '@angular/core/testing';
import {InventorySystem} from './inventory-system';
import {GameObjectFactory} from '../../factories/game-object-factory';
import {GameObject} from '../gameObjects/game-object';
import {SlotType} from '../../enums/equiped-type.enum';
import {GameObjectType} from '../../enums/game-object-type.enum';
import {JsonInventory} from '../../interfaces/json-interfaces';

describe('Inventorysystem', () => {
  const inventoryJson: Array<JsonInventory> = [
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
    }];
  let inventoryLetter: string;
  let weapon: GameObject;
  let inventory: InventorySystem;
  let potion: GameObject;

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    inventory = new InventorySystem();
    expect(inventory)
      .toBeTruthy();
  });

  it('a GameObject can be added in inventory', () => {
    weapon = GameObjectFactory.create(GameObjectType.WEAPON, 'club');
    inventoryLetter = inventory.addToInventory(weapon);
    expect(inventory.getInventorySize())
      .toEqual(1);
    expect(inventoryLetter)
      .toEqual('a');
  });

  it('a GameObject can be remove in inventory', () => {
    expect(inventory.removeFromInventory(inventoryLetter))
      .toBeTruthy();
    expect(inventory.getInventorySize())
      .toEqual(0);
  });

  it('a consumable GameObject can be added in inventory', () => {
    potion = GameObjectFactory.create(GameObjectType.POTION, 'potion');
    potion.qty = 2;
    inventoryLetter = inventory.addToInventory(potion);
    expect(inventoryLetter)
      .toBeDefined();
  });

  it('a consumable GameObject can be consumed', () => {
    inventory.removeFromInventory(inventoryLetter, 1);
    potion = inventory.getGameObjectByInventoryLetter(inventoryLetter);
    expect(potion)
      .toBeDefined();
    expect(potion.qty)
      .toEqual(1);
  });

  it('a GameObject does not exist for a random letter', () => {
    const randomObject: GameObject = inventory.getGameObjectByInventoryLetter('zz');
    expect(randomObject)
      .toBeUndefined();
  });

  it('a GameObject can be equipped', () => {
    weapon = GameObjectFactory.create(GameObjectType.WEAPON, 'club');
    inventoryLetter = inventory.addToInventory(weapon);
    const isEquipped: boolean = inventory.equip(inventoryLetter);
    expect(isEquipped)
      .toBeTruthy();
  });

  it('a GameObject can be equipped instead another GameObject', () => {
    weapon = GameObjectFactory.create(GameObjectType.WEAPON, 'greataxe');
    inventoryLetter = inventory.addToInventory(weapon);
    inventory.equipItemAtSlot(SlotType.RIGHTHAND, inventoryLetter);
    const weaponEquipped: GameObject = inventory.getItemEquippedAtSlot(SlotType.RIGHTHAND);
    expect(weapon)
      .toEqual(weaponEquipped);
  });

  it('a GameObject can be unequipped', () => {
    expect(inventory.unequip(inventoryLetter))
      .toBeTruthy();
  });

  it('a InventorySystem can be created with persisted data', () => {
    inventory = new InventorySystem();
    inventoryJson.forEach((item: JsonInventory) => {
      const gameObject: GameObject = GameObjectFactory.createFromJson(item._objectType, item);
      inventory.addToInventory(gameObject);
    });
    expect(inventory.getInventorySize())
      .toEqual(3);
  });

  it('a InventorySystem can generate correct Json Data', () => {
    const json: string = inventory.toJSON();
    expect(json)
      .toEqual(JSON.stringify(inventoryJson));
    console.log(json);
    console.log(JSON.stringify(inventoryJson));
  });
});
