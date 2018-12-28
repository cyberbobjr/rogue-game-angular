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
import {GameObjectFactory} from '../../factories/game-object-factory';
import {Utility} from '../utility';
import {RaceClass} from '../base/race';
import {GameClass} from '../base/game-class';

export class Player extends Entity {
  private _xp = 0;
  private _level = 1;
  private _mapLevel = 1;
  private _race: RaceClass;
  private _gameClass: GameClass;


  set race(value: RaceClass) {
    this._race = value;
  }

  set gameClass(value: GameClass) {
    this._gameClass = value;
  }

  get gameClass(): GameClass {
    return this._gameClass;
  }

  get race(): RaceClass {
    return this._race;
  }

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

    if (jsonData.race) {
      entity.race = new RaceClass(jsonData.race);
    }

    if (jsonData.gameClass) {
      entity.gameClass = new GameClass(jsonData.gameClass);
    }

    return entity;
  }

  toJSON(): any {
    return {
      ...super.toJSON(),
      ...{
        xp: this.xp,
        level: this.level,
        equipped: [...this._equippedItem],
        race: this.race.jsonData,
        gameClass: this.gameClass.jsonData
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

  setRace(race: RaceClass): Player {
    this._race = race;
    return this;
  }

  setGameClass(gameClass: GameClass): Player {
    this._hitDice = gameClass.getHitDice();
    this._hp = this._hitDice + this.constitution;
    this._gp = gameClass.getGp();
    this._gameClass = gameClass;
    return this;
  }
}
