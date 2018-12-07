import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-roll-dice',
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
    this.value = +event.dataTransfer.getData('diceValue');
  }
}
