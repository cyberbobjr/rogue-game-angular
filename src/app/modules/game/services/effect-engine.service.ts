import {GameMap} from '../../../core/classes/base/gameMap';
import {IEffect} from '../../../core/interfaces/i-effect';
import {Injectable} from '@angular/core';

@Injectable({
              providedIn: 'root'
            })
export class EffectEngine {
  private static instance: EffectEngine;
  private _effects: Map<string, IEffect> = new Map();

  static getInstance() {
    if (!EffectEngine.instance) {
      EffectEngine.instance = new EffectEngine();
    }
    return EffectEngine.instance;
  }

  constructor() {
    if (!EffectEngine.instance) {
      EffectEngine.instance = this;
    }
  }

  tick(timestamp: number) {
    this._effects.forEach((effect: IEffect) => {
      effect.tick(timestamp);
    });
  }

  addEffect(effect: IEffect) {
    this._effects.set(effect.type, effect);
  }

  removeEffect(effect: IEffect) {
    this._effects.delete(effect.type);
  }

  drawEffects(gameMap: GameMap): GameMap {
    this._effects.forEach((effect: IEffect) => {
      effect.draw_callback(gameMap);
    });
    return gameMap;
  }
}
