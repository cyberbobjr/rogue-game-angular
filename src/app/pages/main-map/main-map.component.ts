import {Component, ElementRef, HostListener, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import Display from 'rot-js/lib/display/display';
import {RotDisplayService} from '../../services/rot-display.service';
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

  @HostListener('window:keyup', ['$event'])
  handleKeyEvent(keyboardEvent: KeyboardEvent) {
    this._gameEngineService.handleKeyEvent(keyboardEvent);
  }

  constructor(private _displayService: RotDisplayService,
              private _gameEngineService: GameEngineService) {
    this.display = _displayService.display;
  }

  ngOnInit() {
    this.refMap.nativeElement.appendChild(this.display.getContainer());
  }

  ngOnDestroy() {
  }
}
