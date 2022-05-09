import {JsonArmor, JsonSprite} from '../../interfaces/json-interfaces';
import {GameObject} from './game-object';
import {SlotType} from '../../enums/equiped-type.enum';
import {Sprite} from '../base/sprite';
import {Entity} from '@core/core/base/entity';

export class Armor extends GameObject implements JsonArmor {
    private _ac: number;

    set ac(value: number) {
        this._ac = value;
    }

    get ac(): number {
        return this._ac;
    }

    static fromJson(_jsonArmor: JsonArmor): Armor {
        const armor: Armor = new Armor();
        for (const key of Object.keys(_jsonArmor)) {
            armor['_' + key] = _jsonArmor[key];
        }
        if (_jsonArmor.sprite) {
            armor.sprite = new Sprite((_jsonArmor.sprite as JsonSprite).character, (_jsonArmor.sprite as JsonSprite).color);
        }
        return armor;
    }

    constructor() {
        super();
        this.objectType = 'ARMOR';
    }

    toJSON(): JsonArmor {
        return {
            ...super.toJSON(),
            ac: this._ac
        };
    }

    onEquip(actor: Entity, letterInventory?: string) {
        actor.equipInventory(letterInventory);
    }

    onUnequip(actor: Entity, letterInventory?: string) {
        actor.unequipItem(letterInventory);
    }

    canEquip(): boolean {
        return true;
    }

    getInfo(): string {
        return `${this._name}`;
    }

    getSlots(): Array<SlotType> {
        if (this.id === 'shield') {
            return [SlotType.LEFTHAND,
                SlotType.RIGHTHAND];
        }

        return [SlotType.CHEST,
            SlotType.LEGS,
            SlotType.HEAD,
            SlotType.BOOTS];
    }
}
