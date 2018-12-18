import {JsonRace} from '../../interfaces/json-interfaces';


export class RaceClass {
  private _name: string;

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  constructor(private _jsonData: JsonRace) {
  }

  getModifier(ability: string): number {
    return this._jsonData.modifiers[ability];
  }
}
