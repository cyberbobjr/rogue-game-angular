import {IGameClass} from '../../interfaces/i-game-class';
import {JsonGameClass} from '../../interfaces/json-interfaces';
import {Utility} from '../Utility/utility';
import {GameObject} from '../gameObjects/game-object';
import {GameObjectFactory} from '../../factories/game-object-factory';
import {GameObjectType} from '../../enums/game-object-type.enum';

export class GameClass implements IGameClass {
  private _name: string;

  get jsonData(): JsonGameClass {
    return this._jsonGameClass;
  }

  get name(): string {
    return this._jsonGameClass.name;
  }

  getAC(): number {
    return this._jsonGameClass.ac;
  }

  getGp(): number {
    return this._jsonGameClass.gp.mul * Utility.rolldice(this._jsonGameClass.gp.dice) * this._jsonGameClass.gp.bonus;
  }

  getHitDice(): number {
    return this._jsonGameClass.hitDice;
  }

  getHp(): number {
    return Utility.rolldice(this.getHitDice());
  }

  getModifier(ability: string): number {
    return this._jsonGameClass.modifiers[ability];
  }

  getInitialEquipment(): Array<GameObject> {
    const equipments: Array<GameObject> = [];
    if (this._jsonGameClass.equipment) {
      this._jsonGameClass.equipment.forEach((equipment: { id: string, type: string, qty: number }) => {
        const item: GameObject = GameObjectFactory.create(GameObjectType.getFromString(equipment.type), equipment.id);
        if (item) {
          item.qty = equipment.qty;
          equipments.push(item);
        }
      });
    }
    return equipments;
  }

  constructor(private _jsonGameClass: JsonGameClass) {
    this._name = _jsonGameClass.name;
  }
}
