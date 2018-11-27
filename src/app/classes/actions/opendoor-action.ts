import {Iaction} from '../../interfaces/iaction';
import {Entity} from '../base/entity';

export class OpendoorAction implements Iaction {
  private _info = '';

  constructor() {
  }

  execute(actor: Entity): boolean {
    this._info = 'Open Door';
    return true;
  }

  getInfo(): string {
    return this._info;
  }
}
