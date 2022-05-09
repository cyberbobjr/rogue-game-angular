import {Utility} from '../Utility/utility';
import {Sprite} from './sprite';
import {Weapon} from '../gameObjects/weapon';
import {GameObjectFactory} from '../../factories/game-object-factory';
import {instanceToPlain, Transform, Type} from 'class-transformer';

export class GameMonsterClass {
    id: string;
    name: string;
    ac: number;
    size: string;
    speed: number;
    frequency: number;
    abilities: any;

    @Transform(({value}) => value.mul * Utility.rolldice(value.dice) + value.bonus)
    hp: number;

    @Transform(({value}) => Utility.rolldice(value))
    gp: number;

    @Type(() => Sprite)
    @Transform(({value}) => Sprite.fromJson(value))
    sprite: Sprite;

    @Type(() => Weapon)
    @Transform(({value}) => {
        return value.map((weaponId: string) => GameObjectFactory.getInstance().getWeaponById(weaponId));
    })
    weapons: Weapon[];

    get strength(): number {
        return this.abilities.strength;
    }

    get dexterity(): number {
        return this.abilities.dexterity;
    }

    get constitution(): number {
        return this.abilities.constitution;
    }

    get intelligence(): number {
        return this.abilities.intelligence;
    }

    get wisdom(): number {
        return this.abilities.wisdom;
    }

    get charisma(): number {
        return this.abilities.charisma;
    }

    constructor() {
    }

    toJSON(): any {
        return instanceToPlain(this);
    }
}
