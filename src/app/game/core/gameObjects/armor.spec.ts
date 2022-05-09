import {Armor} from './armor';
import {GameObjectFactory} from '../../factories/game-object-factory';
import {GameObjectType} from '../../enums/game-object-type.enum';
import {Sprite} from '../base/sprite';
import {JsonArmor} from '../../interfaces/json-interfaces';

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

  it('Create armor from JSON', () => {
    const armor: Armor = <Armor>GameObjectFactory.create(GameObjectType.ARMOR, 'shield');
    const jsonArmor: JsonArmor = armor.toJSON();
    const armor1: Armor = <Armor>GameObjectFactory.createFromJson(jsonArmor.objectType, jsonArmor);
    expect(jsonArmor)
      .toEqual(armor1.toJSON());
  });
});
