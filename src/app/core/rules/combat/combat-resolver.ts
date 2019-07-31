import {Entity} from '../../classes/base/entity';
import {Utility} from '../../classes/Utility/utility';
import {AttributesFactory} from '../../factories/attributes-factory';
import {EventLog} from '../../classes/Utility/event-log';

export class CombatResolver {
  constructor() {
  }

  static HandToHandAttack(attacker: Entity, target: Entity): number {
    let weaponDamageMultiplicator = 1;
    const attackModifier: number = AttributesFactory.getModifier(attacker.strength);
    const hitDiceAttack: number = Utility.rolldice(20);
    console.log(`---------------------------------------`);
    console.log(`Attacker : ${attacker.name}`);
    console.log(`Hit Dice Attack : ${hitDiceAttack}`);
    console.log(`Attack modifier : ${attackModifier}`);
    if (hitDiceAttack === 1) {
      EventLog.getInstance().message = 'Attack miss!';
      return 0;
    }
    if (hitDiceAttack === 20) {
      // critical hit
      weaponDamageMultiplicator = 2;
      EventLog.getInstance().message = 'Critical hit!';
    }
    console.log(`Weapon damage multiplicator : ${weaponDamageMultiplicator}`);
    console.log(`hitDiceAttack + attackModifier = : ${hitDiceAttack + attackModifier}`);
    console.log(`target AC : ${target.ac}`);
    if (hitDiceAttack + attackModifier >= target.ac) {
      const weaponDamage: number = attacker.getWeaponsDamage();
      console.log(`Weapon damage : ${weaponDamage}`);

      const damage: number = (weaponDamageMultiplicator * weaponDamage) + Math.max(0, attackModifier);
      console.log(`Total damage : ${damage}`);
      EventLog.getInstance().message = `Damage : ${damage}`;
      return damage;
    }
    return 0;
  }

  static DistanceAttack(attacker: Entity, target: Entity): number {
    let weaponDamageMultiplicator = 1;
    const attackModifier: number = AttributesFactory.getModifier(attacker.dexterity);
    const weaponDamage: number = attacker.getWeaponsDamage();
    const hitDiceAttack: number = Utility.rolldice(20);
    if (hitDiceAttack === 1) {
      EventLog.getInstance().message = 'Attack miss!';
      return 0;
    }
    if (hitDiceAttack === 20) {
      // critical hit
      weaponDamageMultiplicator = 2;
      EventLog.getInstance().message = 'Critical hit!';
    }
    if (hitDiceAttack + attackModifier >= target.ac) {
      const damage: number = (weaponDamageMultiplicator * weaponDamage) + attackModifier;
      EventLog.getInstance().message = `Damage : ${damage}`;
      return damage;
    }
    return 0;
  }
}
