import {Component, Input, OnInit} from '@angular/core';
import {IDice} from '../../interface/idice';

@Component({
             selector: 'app-roll-dices',
             templateUrl: './roll-dices.component.html',
             styleUrls: ['./roll-dices.component.css']
           })
export class RollDicesComponent implements OnInit {
  @Input('dices') dices: Array<IDice>;

  constructor() {
  }

  ngOnInit() {
  }
}
