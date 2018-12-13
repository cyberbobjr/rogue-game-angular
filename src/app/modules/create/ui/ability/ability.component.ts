import {Component, Input, OnInit} from '@angular/core';
import {DiceService} from '../../services/dice.service';

@Component({
             selector: 'app-ability',
             templateUrl: './ability.component.html',
             styleUrls: ['./ability.component.css']
           })
export class AbilityComponent implements OnInit {
  @Input('ability') ability: string;
  value: number = null;

  constructor(private _diceService: DiceService) {
  }

  ngOnInit() {
  }

  onBlur() {
    this._diceService.abilityScore.set(this.ability, this.value);
  }
}
