import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-dices',
  templateUrl: './dices.component.html',
  styleUrls: ['./dices.component.css']
})
export class DicesComponent implements OnInit {
  @Input('diceValue') diceValue: number;

  constructor() {
  }

  ngOnInit() {
  }

  dragStart(event: DragEvent) {
    event.dataTransfer.setData('diceValue', this.diceValue.toString());
  }
}
