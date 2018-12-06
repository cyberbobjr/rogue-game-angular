import {Component, Input, OnInit} from '@angular/core';

@Component({
             selector: 'app-roll-dice',
             templateUrl: './roll-dice.component.html',
             styleUrls: ['./roll-dice.component.css']
           })
export class RollDiceComponent implements OnInit {
  @Input('ability') ability: string;

  constructor() {
  }

  ngOnInit() {
  }

}
