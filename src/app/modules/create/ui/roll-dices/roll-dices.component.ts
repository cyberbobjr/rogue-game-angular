import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-roll-dices',
  templateUrl: './roll-dices.component.html',
  styleUrls: ['./roll-dices.component.css']
})
export class RollDicesComponent implements OnInit {
  @Input('dices') dices: Array<number>;

  constructor() {
  }

  ngOnInit() {
  }
}
