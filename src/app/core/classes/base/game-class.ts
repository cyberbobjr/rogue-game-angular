import {IGameClass} from '../../interfaces/i-game-class';
import {JsonGameClass} from '../../interfaces/json-interfaces';
import {Utility} from '../utility';

export class GameClass implements IGameClass {
  get name(): string {
    return this._jsonData.name;
  }

  getAC(): number {
    return this._jsonData.AC;
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

  constructor(private _jsonData: JsonGameClass) {

  }
}
