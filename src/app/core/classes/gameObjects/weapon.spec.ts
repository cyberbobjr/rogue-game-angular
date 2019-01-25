import {Weapon} from './weapon';
import {GameObjectFactory} from '../../factories/game-object-factory';
import {GameObjectType} from '../../enums/game-object-type.enum';
import {GameObject} from './game-object';

describe('Weapon object', () => {
  it('Create weapon from scratch', () => {
    const weapon: Weapon = new Weapon();
    expect(weapon.objectType)
      .toEqual('WEAPON');
  });

  it('Create weapon from WeaponClass', () => {
    const weapon: GameObject = GameObjectFactory.create(GameObjectType.WEAPON, 'club');
    console.log(weapon);
    expect(weapon.name)
      .toEqual('Club');
  });
});
