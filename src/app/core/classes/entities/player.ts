import {Entity} from '../base/entity';
import {SpritesFactory} from '../../factories/sprites-factory';
import {SpriteType} from '../../enums/sprite-type.enum';
import {Iaction} from '../../interfaces/iaction';
import {EventLog} from '../event-log';
import {Position} from '../base/position';
import {Sprite} from '../base/sprite';
import {JsonEntity, JsonInventory} from '../../interfaces/json-interfaces';
import {SlotType} from '../../enums/equiped-type.enum';
import {GameObjectFactory} from '../../factories/game-object-factory';
import {Utility} from '../utility';
import {RaceClass} from '../base/race';
import {GameClass} from '../base/game-class';
import {Armor} from '../gameObjects/armor';
import {GameObject} from '../gameObjects/game-object';
import {AttributesFactory} from '../../factories/attributes-factory';
import {GameEngineService} from '../../../modules/game/services/game-engine.service';

export class Player extends Entity {
  private _level = 1;
  private _mapLevel = 1;
  private _gameClass: string;
  private _maxHp: number;

  set gameClass(value: string) {
    this._gameClass = value;
  }

  get gameClass(): string {
    return this._gameClass;
  }

  set maxHp(value: number) {
    this._maxHp = value;
  }

  get maxHp(): number {
    return this._maxHp;
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
    return this.getArmorAc();
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

  // region Serialization
  static fromJSON(jsonData: JsonEntity): Player {
    let entity: Player = new this();

    entity = Object.assign(entity, jsonData, {
      _sprite: new Sprite(jsonData.sprite.character, jsonData.sprite.color),
    });

    if (jsonData.inventory.length > 0) {
      jsonData.inventory.forEach((value: JsonInventory) => {
        const gameObject: GameObject = GameObjectFactory.createFromJson(value._objectType, value);
        gameObject.qty = value._qty;
        entity.addToInventory(gameObject);
      });
    }

    if (jsonData.position) {
      entity.position = new Position(jsonData.position._x, jsonData.position._y);
    }

    if (jsonData.equipped) {
      jsonData.equipped.forEach((value: [SlotType, string]) => {
        const gameObject: GameObject = entity.inventory.get(value[1]);
        gameObject.onEquip(entity, value[1]);
      });
    }

    return entity;
  }

  toJSON(): any {
    return {
      ...super.toJSON(),
      ...{
        level: this.level,
        maxHp: this._maxHp,
        equipped: [...this._equippedItem],
        gameClass: this._gameClass
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

  private _getArmorEquipped(): Array<Armor> {
    const armorEquipped: Array<Armor> = [];
    for (const [key, value] of this._equippedItem) {
      const gameObject: GameObject = this._inventory.get(value);
      if (gameObject instanceof Armor) {
        armorEquipped.push(gameObject as Armor);
      }
    }
    return armorEquipped;
  }

  // region Events
  onHit(attacker: Entity, damage: number): Iaction | null {
    EventLog.getInstance().message = `You take ${damage} point of damage`;
    // this.hp -= damage;
    return null;
  }

  onDead(_gameEngine: GameEngineService): void {
    super.onDead(_gameEngine);
  }

  onRest() {
    this.hp += (Utility.rolldice(this._hitDice) + AttributesFactory.getModifier(this.attributes.get('constitution')));
    this.hp = Math.min(this.hp, this._maxHp);
  }

  // endregion

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
    this._race = race.name;
    return this;
  }

  setGameClass(gameClass: GameClass): Player {
    this._hitDice = gameClass.getHitDice();
    this._hp = this._hitDice + AttributesFactory.getModifier(this.attributes.get('constitution'));
    this._maxHp = this._hp;
    this._gp = gameClass.getGp();
    this._gameClass = gameClass.name;
    gameClass.getInitialEquipment()
             .forEach((item: GameObject) => {
               this.addToInventory(item);
             });
    return this;
  }

  getArmorAc(): number {
    let ac = 0;
    let dexterity = false;
    let bonus = 0;
    const dexterityModifier: number = AttributesFactory.getModifier(this.attributes.get('dexterity'));
    const armorEquipped: Array<Armor> = this._getArmorEquipped();
    if (armorEquipped.length === 0) {
      return 10 + dexterityModifier;
    }
    armorEquipped.forEach((armor: Armor) => {
      if (armor.properties.indexOf('dexterity') > -1) {
        dexterity = true;
      }
      if (armor.properties.indexOf('bonus') > -1) {
        bonus += armor.ac;
      } else {
        ac += armor.ac;
      }
    });
    if (ac === 0) {
      ac = 10 + dexterityModifier;
    }
    return ac + bonus;
  }

  setToFullHp() {
    this.hp = this._maxHp;
  }

  setLevelAndPosition(level: number, position: Position) {
    this.level = level;
    this.position = position;
  }
}
