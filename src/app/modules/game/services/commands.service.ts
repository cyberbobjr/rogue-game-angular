import {Injectable} from '@angular/core';
import {Command} from '../../../core/classes/commands/command';
import {MoveE, MoveN, MoveNE, MoveNW, MoveS, MoveSE, MoveSW, MoveW} from '../../../core/classes/commands/move';
import {SaveCommand} from '../../../core/classes/commands/save-command';
import {OpenDoorCommand} from '../../../core/classes/commands/open-door-command';
import {TakeCommand} from '../../../core/classes/commands/take-command';
import {AttackDistance} from '../../../core/classes/commands/attack-distance';
import {InventoryCommand} from '../../../core/classes/commands/inventory-command';

@Injectable({
              providedIn: 'root'
            })
export class CommandsService {
  ArrowUp: Command;
  ArrowDown: Command;
  ArrowLeft: Command;
  ArrowRight: Command;
  KeyQ: Command;
  KeyZ: Command;
  KeyA: Command;
  KeyE: Command;
  KeyW: Command;
  KeyC: Command;
  KeyX: Command;
  KeyD: Command;
  KeyO: Command;
  KeyS: Command;
  KeyT: Command;
  KeyF: Command;
  KeyI: Command;

  constructor() {
    this._initCommand();
  }

  private _initCommand() {
    this.ArrowUp = new MoveN();
    this.ArrowDown = new MoveS();
    this.ArrowLeft = new MoveW();
    this.ArrowRight = new MoveE();
    this.KeyW = new MoveSW();
    this.KeyQ = new MoveW();
    this.KeyE = new MoveNE();
    this.KeyD = new MoveE();
    this.KeyC = new MoveSE();
    this.KeyX = new MoveS();
    this.KeyZ = new MoveN();
    this.KeyA = new MoveNW();
    this.KeyO = new OpenDoorCommand();
    this.KeyS = new SaveCommand();
    this.KeyT = new TakeCommand();
    this.KeyF = new AttackDistance();
    this.KeyI = new InventoryCommand();
  }
}
