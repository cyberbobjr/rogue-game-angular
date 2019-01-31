import {TestBed} from '@angular/core/testing';
import {InventorySystem} from './inventory-system';
import {GameObjectFactory} from '../../factories/game-object-factory';
import {GameObject} from '../gameObjects/game-object';
import {SlotType} from '../../enums/equiped-type.enum';
import {GameObjectType} from '../../enums/game-object-type.enum';
import {JsonGameObject, JsonInventory} from '../../interfaces/json-interfaces';

describe('Inventorysystem', () => {
  let inventoryJson: Array<JsonGameObject> = [];
  let inventoryLetter: string;
  let weapon: GameObject;
  let inventory: InventorySystem = new InventorySystem();
  let potion: GameObject;

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('it should be empty', () => {
    expect(inventory.getInventorySize())
      .toEqual(0);
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

  it('a InventorySystem can be cleared', () => {
    inventory.clear();
    expect(inventory.getInventorySize())
      .toEqual(0);
  });

  it('a InventorySystem can generate Json Data', () => {
    const weapon1: GameObject = GameObjectFactory.create(GameObjectType.WEAPON, 'club');
    inventory.addToInventory(weapon1);
    const jsonInventory: any = inventory.toJSON();
    inventoryJson = inventory.toJSON();
    console.log(jsonInventory);
    const jsonString = JSON.stringify(jsonInventory);
    expect(jsonString)
      .toContain('');
  });

  it('a InventorySystem can be created with persisted data', () => {
    inventory = new InventorySystem();
    inventoryJson.forEach((item: JsonGameObject) => {
      const gameObject: GameObject = GameObjectFactory.createFromJson(item.objectType, item);
      inventory.addToInventory(gameObject);
    });
    expect(inventory.getInventorySize())
      .toEqual(3);
  });

});
