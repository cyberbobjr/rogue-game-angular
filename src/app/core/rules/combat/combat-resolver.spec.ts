import {EntitiesFactory} from '../../factories/entities-factory';
import {Position} from '../../classes/base/position';
import {Entity} from '../../classes/base/entity';
import {CombatResolver} from './combat-resolver';
import {Utility} from '../../classes/Utility/utility';
import {GameObjectFactory} from '../../factories/game-object-factory';
import {GameObjectType} from '../../enums/game-object-type.enum';

describe('Combat resolver', () => {

  it('should resolve hand to hand attack', () => {
    const attacker: Entity = EntitiesFactory.generateRandomEntities(new Position(5, 5));
    const target: Entity = EntitiesFactory.generateRandomEntities(new Position(5, 5));
    target.ac = 0;
    attacker.strength = 50;
    spyOn(Utility, 'rolldice')
      .and
      .returnValue(20);
    const damage: number = CombatResolver.HandToHandAttack(attacker, target);
    expect(damage)
      .toBeGreaterThan(0);
  });

  it('should resolve distance attack', () => {
    const attacker: Entity = EntitiesFactory.generateRandomEntities(new Position(5, 5));
    const target: Entity = EntitiesFactory.generateRandomEntities(new Position(5, 5));
    const inventoryLetter: string = attacker.addToInventory(GameObjectFactory.create(GameObjectType.WEAPON, 'greataxe'));
    attacker.equipInventory(inventoryLetter);
    target.ac = 0;
    const damage: number = CombatResolver.DistanceAttack(attacker, target);
    spyOn(Utility, 'rolldice')
      .and
      .returnValue(20);
    expect(damage)
      .toBeGreaterThan(0);
  });
});
