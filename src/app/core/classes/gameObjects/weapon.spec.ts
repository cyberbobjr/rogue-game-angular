import {Weapon} from './weapon';
import {GameObjectFactory} from '../../factories/game-object-factory';
import {GameObjectType} from '../../enums/game-object-type.enum';
import {Sprite} from '../base/sprite';
import {JsonWeapon} from '../../interfaces/json-interfaces';

describe('Weapon object', () => {
  it('Create weapon from scratch', () => {
    const weapon: Weapon = new Weapon();
    expect(weapon.objectType)
      .toEqual('WEAPON');
  });

  it('Create weapon from WeaponClass', () => {
    const weapon: Weapon = (GameObjectFactory.create(GameObjectType.WEAPON, 'club') as Weapon);
    expect(weapon.name)
      .toEqual('Club');
    expect(weapon.sprite instanceof Sprite)
      .toBeTruthy();
    expect(weapon.canEquip())
      .toBeTruthy();
    expect(weapon.empilable)
      .toBeFalsy();
  });

  it('Create weapon from JSON', () => {
    const weapon: Weapon = (GameObjectFactory.create(GameObjectType.WEAPON, 'club') as Weapon);
    const jsonWeapon: JsonWeapon = weapon.toJSON();
    const weapon1: Weapon = (GameObjectFactory.createFromJson(jsonWeapon.objectType, jsonWeapon) as Weapon);
    expect(jsonWeapon)
      .toEqual(weapon1.toJSON());
  });
});
