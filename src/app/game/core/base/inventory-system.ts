import {GameObject} from '../gameObjects/game-object';
import {SlotType} from '../../enums/equiped-type.enum';
import {Utility} from '../Utility/utility';

export class InventorySystem {
  private _inventory: Map<string, GameObject> = new Map<string, GameObject>();
  private _equippedItem: Map<SlotType, string> = new Map<SlotType, string>();

  get equippedItem(): Map<SlotType, string> {
    return this._equippedItem;
  }

  constructor() {

  }

  public addToInventory(gameObject: GameObject): string {
    let letterInventory: string = Utility.getLetter(this._inventory.size);
    if (gameObject.empilable) {
      const key: string = this._getByInventoryItemId(gameObject.id);
      if (key) {
        const gameObjectExisting: GameObject = this._inventory.get(key);
        gameObject.qty += gameObjectExisting.qty;
        letterInventory = key;
      }
    }
    this._inventory.set(letterInventory, gameObject);
    return letterInventory;
  }

  public getInventorySize(): number {
    return this._inventory.size;
  }

  private _getByInventoryItemId(itemId: string): string | null {
    let keyFind: string | null = null;
    this._inventory.forEach((value: GameObject, key: string) => {
      if (value.id === itemId) {
        keyFind = key;
      }
    });
    return keyFind;
  }

  public removeFromInventory(letterInventory: string, qty = 1): boolean {
    const gameObject: GameObject = this._inventory.get(letterInventory);
    if (gameObject && gameObject.empilable && (gameObject.qty - qty > 0)) {
      gameObject.qty -= qty;
      return (!!this._inventory.set(letterInventory, gameObject));
    } else {
      return this._inventory.delete(letterInventory);
    }
  }

  public getGameObjectByInventoryLetter(inventoryLetter: string): GameObject | undefined {
    return this._inventory.get(inventoryLetter);
  }

  public equip(inventoryletter: string): boolean {
    let equipped = false;
    const gameObject: GameObject = this._inventory.get(inventoryletter);
    if (!this._inventory.has(inventoryletter)) {
      return false;
    }
    if (gameObject) {
      gameObject.getSlots()
                .every((slot: SlotType) => {
                  if (this._equippedItem.has(slot)) {
                    return false;
                  }
                  this._equippedItem.set(slot, inventoryletter);
                  equipped = true;
                });
    }
    return equipped;
  }

  public equipItemAtSlot(slot: SlotType, inventoryletter: string): void {
    this._equippedItem.set(slot, inventoryletter);

  }

  public getItemEquippedWithSlot(slot: SlotType): GameObject | undefined {
    const letter: string = this._equippedItem.get(slot);
    return (letter) ? this._inventory.get(letter) : undefined;
  }

  public getItemEquippedWithLetter(inventoryLetter: string): GameObject | undefined {
    for (const [key, value] of this._equippedItem) {
      if (value === inventoryLetter) {
        return this._inventory.get(value);
      }
    }
    return undefined;
  }

  public unequip(inventoryLetter: string): boolean {
    for (const [key, value] of this._equippedItem) {
      if (value === inventoryLetter) {
        this._equippedItem.delete(key);
        return true;
      }
    }
    return false;
  }

  public toJSON(): any {
    const jsonObject: Array<any> = [];
    this._inventory.forEach((item: GameObject) => {
      jsonObject.push(item.toJSON());
    });
    return jsonObject;
  }

  public clear(): number {
    const size: number = this._inventory.size;
    this._inventory.clear();
    return size;
  }

  public getGameObjectByClass(gameObjectClass: string): Array<GameObject> {
    const arrayGameObject: Array<GameObject> = [];
    this._inventory.forEach((item: GameObject) => {
      if (item.constructor.name === gameObjectClass) {
        arrayGameObject.push(item);
      }
    });
    return arrayGameObject;
  }

  public getAllGameObjects(): Array<GameObject> {
    const gameObjects: Array<GameObject> = [];
    this._inventory.forEach((item: GameObject) => {
      gameObjects.push(item);
    });
    return gameObjects;
  }

  public getAllInventoryWithLetter(): Map<string, GameObject> {
    return this._inventory;
  }

  public hasLetter(inventoryLetter: string): boolean {
    return this._inventory.has(inventoryLetter);
  }

  public getEquippedGameObject(): Map<SlotType, GameObject> {
    const equippedGameObject: Map<SlotType, GameObject> = new Map();
    this._equippedItem.forEach((letter: string, key: SlotType) => {
      equippedGameObject.set(key, this._inventory.get(letter));
    });
    return equippedGameObject;
  }
}
