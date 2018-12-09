import {Injectable} from '@angular/core';
import {IDice, IScore} from '../interface/idice';

@Injectable({
  providedIn: 'root'
})
export class DiceService {
  dicesScore: Array<IDice> = [];
  abilityScore: Array<IScore> = [];

  constructor() {
  }

  removeScoreById(id: number) {
    this.dicesScore.forEach((score: IDice, index: number) => {
      if (score.id === id) {
        this.dicesScore.splice(index, 1);
      }
    });
  }
}
