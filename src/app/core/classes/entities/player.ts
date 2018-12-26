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

export class Player extends Entity {
  private _xp = 0;
  private _level = 1;
  private _mapLevel = 1;
  private _equippedItem: Map<SlotType, number> = new Map<SlotType, number>();

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
    return entity;
  }

  constructor(position?: Position, sprite?: Sprite) {
    super();
    if (position) {
      this.position = position;
    }
    this.sprite = sprite ? sprite : SpritesFactory.createSprite(SpriteType.PLAYER);
    this.sprite.light = true;
  }

  toJSON(): any {
    return {
      ...super.toJSON(),
      ...{
        xp: this.xp,
        level: this.level
      }
    };
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

  EquipItem(inventoryNumber: number) {
    const gameObject: GameObject = this._inventory[inventoryNumber];
  }
}
