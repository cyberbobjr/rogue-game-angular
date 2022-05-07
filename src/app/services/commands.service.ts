import {Injectable} from '@angular/core';
import {Command} from '../core/interfaces/command';
import {MoveE, MoveN, MoveNE, MoveNW, MoveS, MoveSE, MoveSW, MoveW} from '../core/classes/commands/move';
import {SaveCommand} from '../core/classes/commands/save-command';
import {OpenDoorCommand} from '../core/classes/commands/open-door-command';
import {TakeCommand} from '../core/classes/commands/take-command';
import {InventoryCommand} from '../core/classes/commands/inventory-command';
import {AttackDistanceCommand} from '../core/classes/commands/attack-distance-command';
import {WaitCommand} from '../core/classes/commands/wait-command';
import {UpStairCommand} from 'src/app/core/classes/commands/up-stair-command';
import {DownStairCommand} from 'src/app/core/classes/commands/down-stair-command';
import {OpenChestCommand} from '../core/classes/commands/open-chest-command';
import {GameEngine} from '../core/interfaces/game-engine';
import {TeleportCommand} from '../core/classes/commands/teleport-command';

@Injectable({
  providedIn: 'root'
})
export class CommandsService {
  private _gameEngine: GameEngine;
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
  KeyT: Command;
  KeyUp: Command;
  KeyDown: Command;
  KeySpace: Command;
  KeyC: Command;

  set gameEngine(value: GameEngine) {
    this._gameEngine = value;
    this._initDefaultCommand();
  }

  constructor() {
    this._initDefaultCommand();
  }

  private _initDefaultCommand() {
    this.ArrowUp = new MoveN(this._gameEngine);
    this.ArrowDown = new MoveS(this._gameEngine);
    this.ArrowLeft = new MoveW(this._gameEngine);
    this.ArrowRight = new MoveE(this._gameEngine);
    this.Keyw = new MoveSW(this._gameEngine);
    this.Keyq = new MoveW(this._gameEngine);
    this.Keye = new MoveNE(this._gameEngine);
    this.Keyd = new MoveE(this._gameEngine);
    this.Keyc = new MoveSE(this._gameEngine);
    this.Keyx = new MoveS(this._gameEngine);
    this.Keyz = new MoveN(this._gameEngine);
    this.Keya = new MoveNW(this._gameEngine);
    this.Keyo = new OpenDoorCommand(this._gameEngine);
    this.Keys = new SaveCommand(this._gameEngine);
    this.Keyt = new TakeCommand(this._gameEngine);
    this.Keyf = new AttackDistanceCommand(this._gameEngine);
    this.Keyi = new InventoryCommand(this._gameEngine);
    this.KeySpace = new WaitCommand(this._gameEngine);
    this.KeyUp = new UpStairCommand(this._gameEngine);
    this.KeyDown = new DownStairCommand(this._gameEngine);
    this.KeyC = new OpenChestCommand(this._gameEngine);
    this.KeyT = new TeleportCommand(this._gameEngine);
  }
}
