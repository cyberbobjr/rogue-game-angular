import {Component, OnInit} from '@angular/core';
import {DiceService} from '../../../../services/dice.service';
import {IDice} from '../../interface/idice';

@Component({
    selector: 'app-dices',
    templateUrl: './dices.component.html',
    styleUrls: ['./dices.component.scss']
})
export class DicesComponent implements OnInit {
    dicesScore: Array<IDice> = [];

    constructor(private _diceService: DiceService) {
        this.dicesScore = this._diceService.dicesScore;
    }

    ngOnInit() {
    }
}
