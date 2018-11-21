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
  display: Display;
  canvasContainer: HTMLElement;

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
    this.display = this._displayService.display;
    this._displayService.options = {height: window.innerHeight};
    this.canvasContainer = this._displayService.container;
    this.refMap.nativeElement.appendChild(this.canvasContainer);
    const [width, height] = (this.display.computeSize(this.canvasContainer.offsetWidth, this.canvasContainer.offsetHeight));
    this._displayService.setMaxBound(width, height);
  }

  ngOnDestroy() {
  }
}
