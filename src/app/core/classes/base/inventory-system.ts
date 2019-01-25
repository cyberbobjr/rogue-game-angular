import {GameObject} from '../gameObjects/game-object';
import {SlotType} from '../../enums/equiped-type.enum';
import {Utility} from '../utility';

export class InventorySystem {
  protected _inventory: Map<string, GameObject> = new Map<string, GameObject>();
  protected _equippedItem: Map<SlotType, string> = new Map<SlotType, string>();

  constructor() {

  }

  addToInventory(gameObject: GameObject): string {
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
    if (gameObject.empilable && (gameObject.qty - qty > 0)) {
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

  public getItemEquippedAtSlot(slot: SlotType): GameObject | undefined {
    const letter: string = this._equippedItem.get(slot);
    return (letter) ? this._inventory.get(letter) : undefined;
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

  public toJSON(): string {
    return JSON.stringify(Array.from(this._inventory.values()));
  }
}
