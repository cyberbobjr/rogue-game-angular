import {Component, ElementRef, HostListener, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DisplayService} from '../../services/display.service';
import {GameEngineService} from '../../services/game-engine.service';

@Component({
             selector: 'app-main-map',
             templateUrl: './main-map.component.html',
             styleUrls: ['./main-map.component.css']
           })
export class MainMapComponent implements OnInit, OnDestroy {
  @ViewChild('refMap') refMap: ElementRef;

  @HostListener('document:keydown', ['$event'])
  handleKeyEvent(keyboardEvent: KeyboardEvent) {
    this._gameEngineService.handleKeyEvent(keyboardEvent);
    keyboardEvent.preventDefault();
    keyboardEvent.stopPropagation();
    return false;
  }

  constructor(private _displayService: DisplayService,
              private _gameEngineService: GameEngineService) {
  }

  ngOnInit() {
    const fontsize = 16;
    const maxHeight = Math.round(window.innerHeight / fontsize) - 1;
    this._displayService.options = {height: maxHeight, fontSize: fontsize};
    this.refMap.nativeElement.appendChild(this._displayService.container);
    this._displayService.computeBounds();
  }

  ngOnDestroy() {
  }
}
