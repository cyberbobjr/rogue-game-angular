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
}
