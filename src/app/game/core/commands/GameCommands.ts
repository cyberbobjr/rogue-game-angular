import {Command} from '@core/interfaces/command';
import {MoveE, MoveN, MoveNE, MoveNW, MoveS, MoveSE, MoveSW, MoveW} from '@core/core/commands/move';
import {OpenDoorCommand} from '@core/core/commands/open-door-command';
import {TakeCommand} from '@core/core/commands/take-command';
import {InventoryCommand} from '@core/core/commands/inventory-command';
import {AttackDistanceCommand} from '@core/core/commands/attack-distance-command';
import {WaitCommand} from '@core/core/commands/wait-command';
import {UpStairCommand} from '@core/core/commands/up-stair-command';
import {DownStairCommand} from '@core/core/commands/down-stair-command';
import {OpenChestCommand} from '@core/core/commands/open-chest-command';
import {GameEngine} from '@core/core/engines/GameEngine';
import {TeleportCommand} from '@core/core/commands/teleport-command';
import {SaveCommand} from '@core/core/commands/save-command';

export class GameCommands {
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


    constructor(private _gameEngine: GameEngine) {
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
