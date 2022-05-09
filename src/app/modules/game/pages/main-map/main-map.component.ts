import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DisplayEngine} from '@core/core/engines/display-engine';
import {GameEngineImp} from '@services/game-engine-imp.service';

@Component({
    selector: 'app-main-map',
    templateUrl: './main-map.component.html',
    styleUrls: ['./main-map.component.scss']
})
export class MainMapComponent implements OnInit, OnDestroy {
    @ViewChild('refMap', {static: true}) refMap: ElementRef;
    private _displayService: DisplayEngine;

    constructor(private _gameEngineService: GameEngineImp) {
        this._displayService = this._gameEngineService.getDisplayEngine();
    }

    ngOnInit() {
        const fontsize = 18;
        const maxHeight = Math.round(window.innerHeight / fontsize) - 1;
        this.refMap.nativeElement.appendChild(this._displayService.container);
        this._displayService.initDisplay(maxHeight, fontsize);
    }

    ngOnDestroy() {
    }
}
