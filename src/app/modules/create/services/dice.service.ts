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
    this.abilityScore.forEach((score: IScore, index: number) => {
      if (score.id === id) {
        this.abilityScore.splice(index, 1);
      }
    });
  }
}
