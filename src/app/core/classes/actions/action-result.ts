import {Action} from '../../interfaces/action';

export class ActionResult {
  static SUCCESS = new ActionResult(true);
  static FAILURE = new ActionResult(false);
  static WAIT = new ActionResult(false);

  private _alternative: Action;

  get alternative(): Action {
    return this._alternative;
  }

  set alternative(value: Action) {
    this._alternative = value;
  }

  get succeeded(): boolean {
    return this._succeeded;
  }


  constructor(private _succeeded: boolean = true) {

  }
}
