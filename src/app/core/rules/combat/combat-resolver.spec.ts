import {EntitiesFactory} from '../../factories/entities-factory';
import {Position} from '../../classes/base/position';
import {Entity} from '../../classes/base/entity';
import {CombatResolver} from './combat-resolver';
import {Utility} from '../../classes/Utility/utility';

describe('Combat resolver', () => {

  it('should resolve hand to hand attack', () => {
    const attacker: Entity = EntitiesFactory.generateRandomEntities(new Position(5, 5));
    const target: Entity = EntitiesFactory.generateRandomEntities(new Position(5, 5));
    target.ac = 0;
    attacker.strength = 50;
    const damage: number = CombatResolver.HandToHandAttack(attacker, target);
    spyOn(Utility, 'rolldice')
      .and
      .returnValue(20);
    expect(damage)
      .toBeGreaterThan(0);
  });

  it('should resolve distance attack', () => {
    const attacker: Entity = EntitiesFactory.generateRandomEntities(new Position(5, 5));
    const target: Entity = EntitiesFactory.generateRandomEntities(new Position(5, 5));
    target.ac = 0;
    const damage: number = CombatResolver.DistanceAttack(attacker, target);
    spyOn(Utility, 'rolldice')
      .and
      .returnValue(20);
    expect(damage)
      .toBeGreaterThan(0);
  });
});
