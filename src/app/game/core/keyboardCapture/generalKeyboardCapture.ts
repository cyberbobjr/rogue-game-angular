import {KeyboardCapture} from '../../interfaces/keyboardCapture';
import {GameCommands} from '@core/core/commands/GameCommands';
import {EntitiesEngine} from '@core/core/engines/entities-engine';
import {GameEngine} from '@core/core/engines/GameEngine';

export class GeneralKeyboardCapture implements KeyboardCapture {
    private _commandEngine: GameCommands = new GameCommands(this._gameEngine);
    private _entitiesEngine: EntitiesEngine;

    constructor(private _gameEngine: GameEngine) {
        this._entitiesEngine = this._gameEngine.getEntityEngine();
    }

    getId(): string {
        return 'general';
    }

    handleActionKeyEvent(key: KeyboardEvent): void {
        switch (key.key) {
            case 'ArrowUp':
                this._commandEngine.ArrowUp.execute();
                break;
            case 'ArrowLeft':
                this._commandEngine.ArrowLeft.execute();
                break;
            case 'ArrowDown':
                this._commandEngine.ArrowDown.execute();
                break;
            case 'ArrowRight':
                this._commandEngine.ArrowRight.execute();
                break;
            case 'a':
                this._commandEngine.Keya.execute();
                break;
            case 'c':
                this._commandEngine.Keyc.execute();
                break;
            case 'C':
                this._commandEngine.KeyC.execute();
                break;
            case 'd':
                this._commandEngine.Keyd.execute();
                break;
            case 'e':
                this._commandEngine.Keye.execute();
                break;
            case 'f':
                this._commandEngine.Keyf.execute();
                break;
            case 'i':
                this._commandEngine.Keyi.execute();
                break;
            case 'o':
                this._commandEngine.Keyo.execute();
                break;
            case 'q':
                this._commandEngine.Keyq.execute();
                break;
            case 's':
                this._commandEngine.Keys.execute();
                break;
            case 't':
                this._commandEngine.Keyt.execute();
                break;
            case 'T':
                this._commandEngine.KeyT.execute();
                break;
            case 'w':
                this._commandEngine.Keyw.execute();
                break;
            case 'x':
                this._commandEngine.Keyx.execute();
                break;
            case 'z':
                this._commandEngine.Keyz.execute();
                break;
            case ' ':
                this._commandEngine.KeySpace.execute();
                break;
            case '<':
                this._commandEngine.KeyDown.execute();
                break;
            case '>':
                this._commandEngine.KeyUp.execute();
                break;
        }
        this._entitiesEngine.executeEntitiesActions();
    }
}
