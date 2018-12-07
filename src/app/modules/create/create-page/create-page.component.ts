import {Component, OnInit} from '@angular/core';
import {Utility} from '../../../core/classes/utility';
import {DiceService} from '../services/dice.service';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.css']
})
export class CreatePageComponent implements OnInit {
  nbDices = 4;

  constructor(private _diceService: DiceService) {
  }

  ngOnInit() {
  }

  onDice() {
    let totalScore = 0;
    this._diceService.dicesScore = [];
    for (let i = 0; i < this.nbDices; i++) {
      this._diceService.dicesScore.push({id: this._diceService.dicesScore.length + 1, value: Utility.rolldice(6), type: 6});
    }
    this._diceService.dicesScore = this._diceService.dicesScore.sort((v1, v2) => v2.value - v1.value);
    for (let i = 0; i < 3; i++) {
      totalScore += this._diceService.dicesScore[i].value;
    }
    this._diceService.abilityScore.push({id: this._diceService.abilityScore.length + 1, value: totalScore});
  }
}
