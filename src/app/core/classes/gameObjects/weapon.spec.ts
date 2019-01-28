import {Weapon} from './weapon';
import {GameObjectFactory} from '../../factories/game-object-factory';
import {GameObjectType} from '../../enums/game-object-type.enum';
import {GameObject} from './game-object';
import {Sprite} from '../base/sprite';

describe('Weapon object', () => {
  it('Create weapon from scratch', () => {
    const weapon: Weapon = new Weapon();
    expect(weapon.objectType)
      .toEqual('WEAPON');
  });

  it('Create weapon from WeaponClass', () => {
    const weapon: GameObject = GameObjectFactory.create(GameObjectType.WEAPON, 'club');
    expect(weapon.name)
      .toEqual('Club');
    expect(weapon.sprite instanceof Sprite)
      .toBeTruthy();
    expect(weapon instanceof Weapon)
      .toBeTruthy();
    expect(weapon.canEquip())
      .toBeTruthy();
    expect(weapon.empilable)
      .toBeFalsy();
  });
});
