import {IEntity} from './ientity';

export interface Iaction {
  perform(actor: IEntity): boolean;

  getInfo(): string;
}
