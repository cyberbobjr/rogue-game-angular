import {TestBed} from '@angular/core/testing';
import {InventorySystem} from './inventory-system';
import {GameObjectFactory} from '../../factories/game-object-factory';
import {GameObject} from '../gameObjects/game-object';
import {SlotType} from '../../enums/equiped-type.enum';
import {GameObjectType} from '../../enums/game-object-type.enum';
import {JsonGameObject} from '../../interfaces/json-interfaces';
import {Weapon} from '../gameObjects/weapon';

describe('Inventorysystem', () => {
  let inventoryJson: Array<JsonGameObject> = [];
  let inventoryLetter: string;
  let weapon: GameObject;
  let inventory: InventorySystem = new InventorySystem();
  let potion: GameObject;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    inventory.clear();
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
    weapon = GameObjectFactory.create(GameObjectType.WEAPON, 'club');
    inventoryLetter = inventory.addToInventory(weapon);
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
    potion = GameObjectFactory.create(GameObjectType.POTION, 'potion');
    potion.qty = 2;
    inventoryLetter = inventory.addToInventory(potion);
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
    const newWeapon = GameObjectFactory.create(GameObjectType.WEAPON, 'club');
    inventory = new InventorySystem();
    inventoryLetter = inventory.addToInventory(newWeapon);
    const isEquipped: boolean = inventory.equip(inventoryLetter);
    expect(isEquipped)
      .toBeTruthy();
  });

  it('a GameObject can be equipped instead another GameObject', () => {
    weapon = GameObjectFactory.create(GameObjectType.WEAPON, 'greataxe');
    inventoryLetter = inventory.addToInventory(weapon);
    inventory.equipItemAtSlot(SlotType.RIGHTHAND, inventoryLetter);
    const weaponEquipped: GameObject = inventory.getItemEquippedWithSlot(SlotType.RIGHTHAND);
    expect(weapon)
      .toEqual(weaponEquipped);
  });

  it('a GameObject can be unequipped', () => {
    weapon = GameObjectFactory.create(GameObjectType.WEAPON, 'greataxe');
    inventoryLetter = inventory.addToInventory(weapon);
    inventory.equip(inventoryLetter);
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
    inventoryJson = inventory.toJSON();
    const jsonString = JSON.stringify(inventoryJson);
    expect(jsonString)
      .toContain('club');
  });

  it('a InventorySystem can be created with persisted data', () => {
    inventory = new InventorySystem();
    weapon = GameObjectFactory.create(GameObjectType.WEAPON, 'club');
    potion = GameObjectFactory.create(GameObjectType.POTION);
    const shield: GameObject = GameObjectFactory.create(GameObjectType.ARMOR, 'shield');

    inventory.addToInventory(weapon);
    inventory.addToInventory(potion);
    inventory.addToInventory(shield);
    inventoryJson = inventory.toJSON();

    const weapon1: GameObject = GameObjectFactory.createFromJson(inventoryJson[0].objectType, inventoryJson[0]);
    const potion1: GameObject = GameObjectFactory.createFromJson(inventoryJson[1].objectType, inventoryJson[1]);
    const shield1: GameObject = GameObjectFactory.createFromJson(inventoryJson[2].objectType, inventoryJson[2]);

    expect(weapon.toJSON())
      .toEqual(weapon1.toJSON());
    expect(potion.toJSON())
      .toEqual(potion1.toJSON());
    expect(shield.toJSON())
      .toEqual(shield1.toJSON());
  });

  it('a InventorySystem should return gameObject by Class', () => {
    inventory.clear();
    weapon = GameObjectFactory.create(GameObjectType.WEAPON, 'club');
    inventory.addToInventory(weapon);

    const gameObjectClass = 'Weapon';
    const arrayGameObject: Array<GameObject> = inventory.getGameObjectByClass(gameObjectClass);
    expect(arrayGameObject.length)
      .toEqual(1);
    expect(arrayGameObject[0] instanceof Weapon)
      .toBeTruthy();
  });

});
