import {IGameClass} from '../../interfaces/i-game-class';
import {JsonGameClass} from '../../interfaces/json-interfaces';
import {Utility} from '../utility';
import {GameObject} from '../gameObjects/game-object';
import {GameObjectFactory} from '../../factories/game-object-factory';
import {GameObjectType} from '../../enums/game-object-type.enum';

export class GameClass implements IGameClass {
  private _name: string;

  get jsonData(): JsonGameClass {
    return this._jsonData;
  }

  get name(): string {
    return this._jsonData.name;
  }

  getAC(): number {
    return this._jsonData.ac;
  }

  getGp(): number {
    return this._jsonData.gp.mul * Utility.rolldice(this._jsonData.gp.dice) * this._jsonData.gp.bonus;
  }

  getHitDice(): number {
    return this._jsonData.hitDice;
  }

  getHp(): number {
    return Utility.rolldice(this.getHitDice());
  }

  getModifier(ability: string): number {
    return this._jsonData.modifiers[ability];
  }

  getInitialEquipment(): Array<GameObject> {
    const equipments: Array<GameObject> = [];
    if (this._jsonData.equipment) {
      this._jsonData.equipment.forEach((equipment: { id: string, type: string, qty: number }) => {
        const item: GameObject = GameObjectFactory.create(GameObjectType.getFromString(equipment.type), equipment.id);
        if (item) {
          item.qty = equipment.qty;
          equipments.push(item);
        }
      });
    }
    return equipments;
  }

  constructor(private _jsonData: JsonGameClass) {
    this._name = _jsonData.name;
  }
}
