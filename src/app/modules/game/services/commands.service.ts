import {Injectable} from '@angular/core';
import {Command} from '../../../core/classes/commands/command';
import {MoveE, MoveN, MoveNE, MoveNW, MoveS, MoveSE, MoveSW, MoveW} from '../../../core/classes/commands/move';
import {SaveCommand} from '../../../core/classes/commands/save-command';
import {OpenDoorCommand} from '../../../core/classes/commands/open-door-command';
import {TakeCommand} from '../../../core/classes/commands/take-command';
import {InventoryCommand} from '../../../core/classes/commands/inventory-command';
import {AttackDistanceCommand} from '../../../core/classes/commands/attack-distance-command';
import {WaitCommand} from '../../../core/classes/commands/wait-command';
import {UpStairCommand} from 'src/app/core/classes/commands/up-stair-command';
import {DownStairCommand} from 'src/app/core/classes/commands/down-stair-command';

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
  KeyUp: Command;
  KeyDown: Command;
  KeySpace: Command;

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
    this.KeyF = new AttackDistanceCommand();
    this.KeyI = new InventoryCommand();
    this.KeySpace = new WaitCommand();
    this.KeyUp = new UpStairCommand();
    this.KeyDown = new DownStairCommand();
  }
}
