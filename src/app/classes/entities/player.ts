import {Entity} from '../base/entity';
import {Sprite} from '../base/sprite';
import {SpritesFactory} from '../../factories/sprites-factory';
import {SpriteType} from '../../enums/sprite-type.enum';

export class Player extends Entity {

  constructor(props) {
    super(props);
    this.sprite = SpritesFactory.createSprite(SpriteType.PLAYER);
    this.sprite.light = true;
  }
}
