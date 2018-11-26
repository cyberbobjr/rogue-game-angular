import {Entity} from '../base/entity';
import {Sprite} from '../base/sprite';

export class Player extends Entity {

  constructor(props) {
    super(props);
    this.sprite = new Sprite('@', '#ffffff');
    this.sprite.light = true;
  }
}
