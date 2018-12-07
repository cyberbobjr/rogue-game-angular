import {Component, OnInit} from '@angular/core';
import {Utility} from '../../../core/classes/utility';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.css']
})
export class CreatePageComponent implements OnInit {
  abilityScore: Array<number> = [];
  dicesScore: Array<number> = [];
  nbDices = 4;

  constructor() {
  }

  ngOnInit() {
  }

  onDice() {
    let totalScore = 0;
    this.dicesScore = [];
    for (let i = 0; i < this.nbDices; i++) {
      this.dicesScore.push(Utility.rolldice(6));
    }
    this.dicesScore = this.dicesScore.sort((v1, v2) => v2 - v1);
    for (let i = 0; i < 3; i++) {
      totalScore += this.dicesScore[i];
    }
    this.abilityScore.push(totalScore);
  }
}
