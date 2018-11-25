import {Entity} from './entity';
import {Sprite} from './sprite';

export class Player extends Entity {
  constructor(props) {
    super(props);
    this.sprite = new Sprite('@');
  }
}
