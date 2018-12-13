import {Component, OnInit} from '@angular/core';
import {DiceService} from '../../services/dice.service';

@Component({
  selector: 'app-dices',
  templateUrl: './dices.component.html',
  styleUrls: ['./dices.component.css']
})
export class DicesComponent implements OnInit {
  constructor(private _diceService: DiceService) {
  }

  ngOnInit() {
  }
}
