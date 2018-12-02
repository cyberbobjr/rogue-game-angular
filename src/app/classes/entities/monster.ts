import {Entity} from '../base/entity';
import {Iaction} from '../../interfaces/iaction';

export class Monster extends Entity {
  constructor(props) {
    super(props);
  }

  isWalkable(): boolean {
    return false;
  }

  onWalk(actor: Entity): Iaction | null {
    console.log('monster onWalk');
    return null;
  }

  onHit(actor: Entity): Iaction | null {
    return null;
  }
}
