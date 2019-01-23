import {GameObject} from '../gameObjects/game-object';
import {SlotType} from '../../enums/equiped-type.enum';

export class InventorySystem {
  protected _inventory: Map<string, GameObject> = new Map<string, GameObject>();
  protected _equippedItem: Map<SlotType, string> = new Map<SlotType, string>();

  constructor() {

  }
}
