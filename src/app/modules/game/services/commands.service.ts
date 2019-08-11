import {Injectable} from '@angular/core';
import {Command} from '../../../core/interfaces/command';
import {MoveE, MoveN, MoveNE, MoveNW, MoveS, MoveSE, MoveSW, MoveW} from '../../../core/classes/commands/move';
import {SaveCommand} from '../../../core/classes/commands/save-command';
import {OpenDoorCommand} from '../../../core/classes/commands/open-door-command';
import {TakeCommand} from '../../../core/classes/commands/take-command';
import {InventoryCommand} from '../../../core/classes/commands/inventory-command';
import {AttackDistanceCommand} from '../../../core/classes/commands/attack-distance-command';
import {WaitCommand} from '../../../core/classes/commands/wait-command';
import {UpStairCommand} from 'src/app/core/classes/commands/up-stair-command';
import {DownStairCommand} from 'src/app/core/classes/commands/down-stair-command';
import {OpenChestCommand} from '../../../core/classes/commands/open-chest-command';

@Injectable({
              providedIn: 'root'
            })
export class CommandsService {
  ArrowUp: Command;
  ArrowDown: Command;
  ArrowLeft: Command;
  ArrowRight: Command;
  Keyq: Command;
  Keyz: Command;
  Keya: Command;
  Keye: Command;
  Keyw: Command;
  Keyc: Command;
  Keyx: Command;
  Keyd: Command;
  Keyo: Command;
  Keys: Command;
  Keyt: Command;
  Keyf: Command;
  Keyi: Command;
  KeyUp: Command;
  KeyDown: Command;
  KeySpace: Command;
  KeyC: Command;

  constructor() {
    this._initCommand();
  }

  private _initCommand() {
    this.ArrowUp = new MoveN();
    this.ArrowDown = new MoveS();
    this.ArrowLeft = new MoveW();
    this.ArrowRight = new MoveE();
    this.Keyw = new MoveSW();
    this.Keyq = new MoveW();
    this.Keye = new MoveNE();
    this.Keyd = new MoveE();
    this.Keyc = new MoveSE();
    this.Keyx = new MoveS();
    this.Keyz = new MoveN();
    this.Keya = new MoveNW();
    this.Keyo = new OpenDoorCommand();
    this.Keys = new SaveCommand();
    this.Keyt = new TakeCommand();
    this.Keyf = new AttackDistanceCommand();
    this.Keyi = new InventoryCommand();
    this.KeySpace = new WaitCommand();
    this.KeyUp = new UpStairCommand();
    this.KeyDown = new DownStairCommand();
    this.KeyC = new OpenChestCommand();
  }
}
