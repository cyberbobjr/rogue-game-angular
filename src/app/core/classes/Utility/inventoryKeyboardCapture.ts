import {KeyboardCapture} from '../../interfaces/keyboardCapture';
import {GameObject} from '../gameObjects/game-object';
import {Tile} from '../base/tile';
import {Player} from '../entities/player';
import {GameEngine} from '../../interfaces/game-engine';

export class InventoryKeyboardCapture implements KeyboardCapture {
  private _selected: string = null;

  constructor(private _player: Player,
              private _gameEngine: GameEngine,
              private _callbackFn: (selected: string) => void) {
  }

  handleActionKeyEvent(key: KeyboardEvent): void {
    const letter: string = key.key;
    if (!this._selected) {
      if (this._player.inventoryContain(letter)) {
        this._changeSelected(letter);
      }
    } else {
      switch (letter) {
        case 'Escape':
        case 'c' :
          this._changeSelected(null);
          break;
        case 'd':
          if (this.isDroppable()) {
            this.dropObject();
          }
          break;
        case 'e':
          if (this.isSelectedEquipable()) {
            this.equipObject(this._selected);
          }
          break;
        case 'u':
          if (this.isSelectedUnequippable()) {
            this.unequipObject(this._selected);
          }
          break;
        case 'U':
          if (this.isSelectedUsable()) {
            this.useObject(this._selected);
          }
          break;
        default :
          return;
      }
      this._selected = null;
    }
  }

  private _changeSelected(letter: string | null) {
    this._selected = letter;
    this._callbackFn(this._selected);
  }

  isDroppable(): boolean {
    return !!this._player.position;
  }

  isSelectedEquipable(): boolean {
    const object: GameObject = this._player.getItemByLetter(this._selected);
    return object.canEquip() && !this._player.isInventoryEquipped(this._selected);
  }

  isSelectedUsable(): boolean {
    const object: GameObject = this._player.getItemByLetter(this._selected);
    return object.canUse();
  }

  isSelectedUnequippable(): boolean {
    const object: GameObject = this._player.getItemByLetter(this._selected);
    return object.canEquip() && this._player.isInventoryEquipped(this._selected);
  }

  dropObject() {
    const gameObject: GameObject = this._player.getItemByLetter(this._selected);
    const tile: Tile = this._gameEngine.getMapEngine()
                           .getTileAt(this._player.position);
    tile.dropOn(gameObject);
    this._player.removeFromInventory(this._selected);
  }

  equipObject(inventoryLetter: string) {
    const gameObject: GameObject = this._player.getItemByLetter(inventoryLetter);
    gameObject.onEquip(this._player, inventoryLetter);
  }

  unequipObject(inventoryLetter: string) {
    const gameObject: GameObject = this._player.getItemByLetter(inventoryLetter);
    gameObject.onUnequip(this._player, inventoryLetter);
  }

  useObject(inventoryLetter: string) {
    const gameObject: GameObject = this._player.getItemByLetter(inventoryLetter);
    gameObject.onUse(this._player, inventoryLetter);
  }
}
