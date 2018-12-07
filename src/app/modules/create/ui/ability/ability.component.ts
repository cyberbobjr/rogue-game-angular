import {Component, Input, OnInit} from '@angular/core';
import {IScore} from '../../interface/idice';

@Component({
  selector: 'app-ability',
  templateUrl: './ability.component.html',
  styleUrls: ['./ability.component.css']
})
export class AbilityComponent implements OnInit {
  @Input('ability') ability: string;
  value: number;

  constructor() {
  }

  ngOnInit() {
  }

  drop(event: DragEvent) {
    this.value = (JSON.parse(event.dataTransfer.getData('diceValue')) as IScore).value;
  }
}
