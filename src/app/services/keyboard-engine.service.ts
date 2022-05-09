import {Injectable, OnDestroy} from '@angular/core';
import {fromEvent, Subscription} from 'rxjs';
import {filter, tap} from 'rxjs/operators';
import {KeyboardCapture} from '@core/interfaces/keyboardCapture';

@Injectable({
    providedIn: 'root'
})
export class KeyboardEngine implements OnDestroy {
    private _keyboardInput: Subscription;
    private _keyboardHandler: KeyboardCapture;

    constructor() {
        this.captureKeyboardEvent();
    }

    ngOnDestroy(): void {
        this._keyboardInput.unsubscribe();
    }

    public setKeyboardHandler(keyboardHandler: KeyboardCapture) {
        this._keyboardHandler = keyboardHandler;
    }

    private captureKeyboardEvent() {
        this._keyboardInput = fromEvent(window, 'keydown')
            .pipe(
                tap(i => console.log(i)),
                filter(_ => !!this._keyboardHandler),
                tap(i => this._keyboardHandler.handleActionKeyEvent(i as KeyboardEvent)),
            )
            .subscribe();
    }
}
