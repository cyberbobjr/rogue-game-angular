import {Component, Input, OnInit} from '@angular/core';
import {IScore} from '../../interface/idice';
import {DiceService} from '../../services/dice.service';

@Component({
  selector: 'app-ability',
  templateUrl: './ability.component.html',
  styleUrls: ['./ability.component.css']
})
export class AbilityComponent implements OnInit {
  @Input('ability') ability: string;
  value: number;

  constructor(private _diceService: DiceService) {
  }

  ngOnInit() {
  }

  drop(event: DragEvent) {
    const diceScore: IScore = (JSON.parse(event.dataTransfer.getData('diceValue')) as IScore);
    this._diceService.removeScoreById(diceScore.id);
    this.value = diceScore.value;
  }
}
