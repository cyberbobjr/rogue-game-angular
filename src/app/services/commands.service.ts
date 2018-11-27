import {Injectable} from '@angular/core';
import {Command} from '../classes/commands/command';
import {MoveE, MoveN, MoveNE, MoveNW, MoveS, MoveSE, MoveSW, MoveW} from '../classes/commands/move';

@Injectable({
              providedIn: 'root'
            })
export class CommandsService {
  ArrowUp: Command;
  ArrowDown: Command;
  ArrowLeft: Command;
  ArrowRight: Command;
  KeyH: Command;
  KeyU: Command;
  KeyY: Command;
  KeyI: Command;
  KeyB: Command;
  KeyM: Command;
  KeyN: Command;
  KeyK: Command;

  constructor() {
    this._initCommand();
  }

  private _initCommand() {
    this.ArrowUp = new MoveN();
    this.ArrowDown = new MoveS();
    this.ArrowLeft = new MoveW();
    this.ArrowRight = new MoveE();
    this.KeyB = new MoveSW();
    this.KeyH = new MoveW();
    this.KeyI = new MoveNE();
    this.KeyK = new MoveE();
    this.KeyM = new MoveSE();
    this.KeyN = new MoveS();
    this.KeyU = new MoveN();
    this.KeyY = new MoveNW();
  }
}
