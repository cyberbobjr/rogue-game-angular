import {JsonRace} from '../../interfaces/json-interfaces';


export class RaceClass {
  private _name: string;

  get jsonData(): JsonRace {
    return this._jsonData;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  constructor(private _jsonData: JsonRace) {
    this._name = _jsonData.name;
  }

  getModifier(ability: string): number {
    return this._jsonData.modifiers[ability];
  }
}
