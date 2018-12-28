import {Entity} from '../base/entity';
import {SpritesFactory} from '../../factories/sprites-factory';
import {SpriteType} from '../../enums/sprite-type.enum';
import {Iaction} from '../../interfaces/iaction';
import {EventLog} from '../event-log';
import {Position} from '../base/position';
import {Sprite} from '../base/sprite';
import {MapEngine} from '../../../modules/game/services/map-engine.service';
import {JsonEntity, JsonWeapon} from '../../interfaces/json-interfaces';
import {SlotType} from '../../enums/equiped-type.enum';
import {GameObject} from '../gameObjects/game-object';
import {GameObjectFactory} from '../../factories/game-object-factory';
import {Utility} from '../utility';

export class Player extends Entity {
  private _xp = 0;
  private _level = 1;
  private _mapLevel = 1;
  private _equippedItem: Map<SlotType, string> = new Map<SlotType, string>();

  get equippedItem(): Map<SlotType, string> {
    return this._equippedItem;
  }

  get mapLevel(): number {
    return this._mapLevel;
  }

  set mapLevel(value: number) {
    this._mapLevel = value;
  }

  get ac(): number {
    return 10 + this.attributes.get('dexterity');
  }

  set ac(value: number) {
    this._ac = value;
  }

  get level(): number {
    return this._level;
  }

  set level(value: number) {
    this._level = value;
  }

  get xp(): number {
    return this._xp;
  }

  set xp(value: number) {
    this._xp = value;
  }

  // region Serialization
  static fromJSON(jsonData: JsonEntity): Player {
    let entity: Player = new this();

    entity = Object.assign(entity, jsonData, {
      _sprite: new Sprite(jsonData.sprite._character, jsonData.sprite._color),
    });

    if (jsonData.inventory.length > 0) {
      jsonData.inventory.forEach((value: { id: string, objectType: string, _jsonData: JsonWeapon }, index: number) => {
        entity.addToInventory(GameObjectFactory.createFromJson(value.objectType, value));
      });
    }

    if (jsonData.position) {
      entity.position = new Position(jsonData.position._x, jsonData.position._y);
    }

    if (jsonData.equipped) {
      entity._equippedItem = new Map(jsonData.equipped);
    }
    return entity;
  }

  toJSON(): any {
    return {
      ...super.toJSON(),
      ...{
        xp: this.xp,
        level: this.level,
        equipped: [...this._equippedItem]
      }
    };
  }

  // endregion

  constructor(position?: Position, sprite?: Sprite) {
    super();
    if (position) {
      this.position = position;
    }
    this.sprite = sprite ? sprite : SpritesFactory.createSprite(SpriteType.PLAYER);
    this.sprite.light = true;
    this.name = 'Player';
  }

  // region Events
  onHit(attacker: Entity, damage: number): Iaction | null {
    EventLog.getInstance().message = `You take ${damage} point of damage`;
    return null;
  }

  onDead(_mapEngine: MapEngine): void {
    super.onDead(_mapEngine);
  }

  // endregion

  equipItem(inventoryletter: string) {
    const gameObject: GameObject = this._inventory.get(inventoryletter);
    if (gameObject) {
      const slots: Array<SlotType> = gameObject.getSlots();
      slots.every((slot: SlotType) => {
        if (this._equippedItem.has(slot)) {
          return true;
        }
        this._equippedItem.set(slot, inventoryletter);
      });
    }
  }

  unequipItem(inventoryLetter: string) {
    for (const [key, value] of this._equippedItem) {
      if (value === inventoryLetter) {
        this._equippedItem.delete(key);
        return;
      }
    }
  }

  isInventoryEquipped(inventoryLetter: string): boolean {
    for (const [key, value] of this._equippedItem) {
      if (value === inventoryLetter) {
        return true;
      }
    }
    return false;
  }

  getSlotTypeForEquipped(inventoryLetter: string): string {
    let slotEquipped: SlotType;
    this._equippedItem.forEach((value: string, slot: SlotType) => {
      if (value === inventoryLetter) {
        slotEquipped = slot;
      }
    });
    return Utility.getSlotTypeLabel(slotEquipped);
  }
}
