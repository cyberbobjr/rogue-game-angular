import {Armor} from './armor';
import {GameObjectFactory} from '../../factories/game-object-factory';
import {GameObjectType} from '../../enums/game-object-type.enum';
import {Sprite} from '../base/sprite';

describe('Armor object', () => {
  it('Create armor from scratch', () => {
    const armor: Armor = new Armor();
    expect(armor.objectType)
      .not
      .toEqual('WEAPON');
    expect(armor.objectType)
      .toEqual('ARMOR');
  });

  it('Create armor from Armor Class', () => {
    const armor: Armor = <Armor>GameObjectFactory.create(GameObjectType.ARMOR, 'shield');
    expect(armor.ac)
      .toEqual(2);
    expect(armor.name)
      .toEqual('Shield');
    expect(armor.sprite instanceof Sprite)
      .toBeTruthy();
    expect(armor.sprite.character)
      .toEqual('O');
  });
});
