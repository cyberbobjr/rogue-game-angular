import {Iaction} from '../../interfaces/iaction';

export class ActionResult {
  static SUCCESS = new ActionResult(true);
  static FAILURE = new ActionResult(false);
  private _alternative: Iaction;

  get alternative(): Iaction {
    return this._alternative;
  }

  set alternative(value: Iaction) {
    this._alternative = value;
  }

  get succeeded(): boolean {
    return this._succeeded;
  }


  constructor(private _succeeded: boolean = true) {

  }
}
