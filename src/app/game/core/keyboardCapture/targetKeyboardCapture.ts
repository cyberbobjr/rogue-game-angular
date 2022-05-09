import {KeyboardCapture} from '../../interfaces/keyboardCapture';
import {Entity} from '../base/entity';

export class TargetKeyboardCapture implements KeyboardCapture {
    private _currentTargetIndex = 0;
    private _bgColorBackup: string;


    constructor(private _targets: Array<Entity>,
                private _options: { keyAction: string },
                private _callbackFn: (targets: Entity[] | null) => void) {
    }

    getId(): string {
        return 'target';
    }

    getCurrentTargetIndex(): number {
        return this._currentTargetIndex;
    }

    handleActionKeyEvent(key: KeyboardEvent): void {
        switch (key.code) {
            case 'Plus':
                this._setNextTarget();
                break;
            case 'Minus':
                this._setPreviousTarget();
                break;
            case this._options.keyAction:
                this._fireTarget();
                break;
            default:
                this._cancelAction();
                break;
        }
    }

    private _setNextTarget() {
        this._restoreBgColor();
        this._currentTargetIndex++;
        if (this._currentTargetIndex > this._targets.length - 1) {
            this._currentTargetIndex = 0;
        }
        this._setTargetBgColor();
    }

    private _setPreviousTarget() {
        this._restoreBgColor();
        this._currentTargetIndex--;
        if (this._currentTargetIndex < 0) {
            this._currentTargetIndex = this._targets.length - 1;
        }
        this._setTargetBgColor();
    }


    private _setTargetBgColor() {
        if (this._targets.length > 0) {
            this._bgColorBackup = this._targets[this._currentTargetIndex].sprite.bgColor;
            this._targets[this._currentTargetIndex].sprite.bgColor = 'green';
        }
    }

    private _fireTarget() {
        this._callbackFn([this._targets[this._currentTargetIndex]]);
    }

    private _cancelAction() {
        this._callbackFn(null);
    }

    private _restoreBgColor() {
        if (this._targets.length > 0) {
            this._targets[this._currentTargetIndex].sprite.bgColor = this._bgColorBackup;
        }
    }
}
