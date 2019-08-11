import {JsonAbilities} from '../../interfaces/json-interfaces';
import {AttributeSystem} from './AttributeSystem';

describe('Attribut System testing', () => {
  it('should set attributes from Json', () => {
    const jsonProperties: JsonAbilities = {
      'strength': 17,
      'dexterity': 16,
      'constitution': 16,
      'intelligence': 11,
      'wisdom': 7,
      'charisma': 7
    };
    const attributeSystem: AttributeSystem = new AttributeSystem(jsonProperties);
    expect(attributeSystem.get('strength'))
      .toEqual(jsonProperties.strength);
  });

  it('should generate JSON', () => {
    const jsonProperties: JsonAbilities = {
      'strength': 17,
      'dexterity': 16,
      'constitution': 16,
      'intelligence': 11,
      'wisdom': 7,
      'charisma': 7
    };
    const attributeSystem: AttributeSystem = new AttributeSystem(jsonProperties);
    expect(JSON.stringify(attributeSystem))
      .toEqual(JSON.stringify(jsonProperties));
  });

  it('should set attributes', () => {
    const intelligence = 'intelligence';
    const value = 10;
    const attributeSystem: AttributeSystem = new AttributeSystem();
    attributeSystem.set(intelligence, value);
    expect(attributeSystem.get(intelligence))
      .toEqual(value);
  });
});
