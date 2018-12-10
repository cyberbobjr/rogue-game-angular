import {Injectable} from '@angular/core';
import {IDice} from '../interface/idice';
import {AttributesFactory} from '../../../core/factories/attributes-factory';

@Injectable({
              providedIn: 'root'
            })
export class DiceService {
  dicesScore: Array<IDice> = [];
  abilityScore: Map<string, number> = null;

  constructor() {
    this.abilityScore = new Map<string, number>(AttributesFactory.getAttributes());
  }

  removeDiceScoreById(id: string) {
    this.dicesScore.forEach((score: IDice, index: number) => {
      if (score.id === id) {
        this.dicesScore.splice(index, 1);
      }
    });
  }

  addDiceScore(value: number) {
    this.dicesScore.push({
                           id: (new Date()).getMilliseconds().toString(), value: value
                         });
  }
}
