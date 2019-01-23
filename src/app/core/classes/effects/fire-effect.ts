import {IEffect} from '../../interfaces/i-effect';
import {Position} from '../base/position';
import {Sprite} from '../base/sprite';
import {GameMap} from '../base/game-map';
import {Tile} from '../base/tile';
import {EffectEngine} from '../../../modules/game/services/effect-engine.service';
import {Iobject} from '../../interfaces/iobject';

export class FireEffect implements IEffect {
  private _refreshTime = 50; // ms
  private _duration = 2000; // ms
  private _timeStart: number;
  private _timeCreated: number;
  color = '#FF5733';
  intensity = 0.5;
  position: Position = null;
  type = 'Fire';

  constructor(position: Position) {
    this.position = new Position(position.x, position.y);
    this._timeStart = performance.now();
    this._timeCreated = performance.now();
  }

  tick(timestamp: number) {
    if (timestamp - this._timeStart > this._refreshTime) {
      this.intensity = Math.random();
      this._timeStart = performance.now();
    }
    if (timestamp - this._timeCreated > this._duration) {
      this.unregister_callback();
    }
  }

  draw_callback(gameMap: GameMap): GameMap {
    const tile: Iobject = gameMap.getDataAt(this.position.x, this.position.y);
    const spriteEffect: Sprite = tile.sprite.clone();
    spriteEffect.visibility = this.intensity;
    spriteEffect.bgColor = '#FFBE33';
    spriteEffect.color = this.color;
    gameMap.content[this.position.y][this.position.x].sprite = spriteEffect;
    return gameMap;
  }

  unregister_callback() {
    EffectEngine.getInstance()
                .removeEffect(this);
  }
}
