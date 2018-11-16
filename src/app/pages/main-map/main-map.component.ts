import {Component, ElementRef, HostListener, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import Display from 'rot-js/lib/display/display';
import {DisplayService} from '../../services/display.service';
import {GameEngineService} from '../../services/game-engine.service';

@Component({
             selector: 'app-main-map',
             templateUrl: './main-map.component.html',
             styleUrls: ['./main-map.component.css']
           })
export class MainMapComponent implements OnInit, OnDestroy {
  @ViewChild('refMap') refMap: ElementRef;
  @Input('map') map: Array<string> = [];
  private _mainLoop: any;
  display: Display;

  @HostListener('document:keydown', ['$event'])
  handleKeyEvent(keyboardEvent: KeyboardEvent) {
    this._gameEngineService.handleKeyEvent(keyboardEvent);
    keyboardEvent.preventDefault();
    keyboardEvent.stopPropagation();
    return false;
  }

  constructor(private _displayService: DisplayService,
              private _gameEngineService: GameEngineService) {
    this.display = _displayService.display;
  }

  ngOnInit() {
    this.display.setOptions({height: 50});
    this.refMap.nativeElement.appendChild(this.display.getContainer());
  }

  ngOnDestroy() {
  }
}
