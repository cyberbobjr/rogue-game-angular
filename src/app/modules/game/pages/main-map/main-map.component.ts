import {Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DisplayEngine} from '../../services/display-engine.service';
import {GameEngineImp} from '../../services/game-engine-imp.service';

@Component({
             selector: 'app-main-map',
             templateUrl: './main-map.component.html',
             styleUrls: ['./main-map.component.css']
           })
export class MainMapComponent implements OnInit, OnDestroy {
  @ViewChild('refMap', { static: true }) refMap: ElementRef;

  @HostListener('document:keydown', ['$event'])
  handleKeyEvent(keyboardEvent: KeyboardEvent) {
    this._gameEngineService.keyboardHandler.handleActionKeyEvent(keyboardEvent);
    keyboardEvent.preventDefault();
    keyboardEvent.stopPropagation();
    return false;
  }

  constructor(private _displayService: DisplayEngine,
              private _gameEngineService: GameEngineImp) {
  }

  ngOnInit() {
    const fontsize = 18;
    const maxHeight = Math.round(window.innerHeight / fontsize) - 1;
    this._displayService.options = {height: maxHeight, fontSize: fontsize};
    this.refMap.nativeElement.appendChild(this._displayService.container);
    this._displayService.computeVisiblesRowsCols();
  }

  ngOnDestroy() {
  }
}
