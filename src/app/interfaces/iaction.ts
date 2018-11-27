import {IEntity} from './ientity';

export interface Iaction {
  execute(actor: IEntity): boolean;

  getInfo(): string;
}
