import {Injectable} from '@angular/core';
import {IDice} from '../modules/create/interface/idice';
import {AttributeSystem} from '../core/classes/base/AttributeSystem';

@Injectable({
              providedIn: 'root'
            })
export class DiceService {
  dicesScore: Array<IDice> = [];
  attributesScore: AttributeSystem = new AttributeSystem();

  constructor() {
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
