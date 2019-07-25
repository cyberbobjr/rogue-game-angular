import {Injectable} from '@angular/core';
import {IDice} from '../interface/idice';
import {AttributesFactory} from '../../../core/factories/attributes-factory';
import {JsonAbilities} from '../../../core/interfaces/json-interfaces';

@Injectable({
              providedIn: 'root'
            })
export class DiceService {
  dicesScore: Array<IDice> = [];
  attributesScore: Map<string, number> = null;

  constructor() {
    this.attributesScore = new Map<string, number>(AttributesFactory.getAttributes());
  }

  addDiceScore(value: number) {
    this.dicesScore.push({
                           id: (new Date()).getMilliseconds()
                                           .toString(),
                           value: value,
                           used: false
                         });
  }
}
