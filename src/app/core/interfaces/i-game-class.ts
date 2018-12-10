export interface IGameClass {
  getHitDice(): number;
  getAC(): number;
  getHp(): number;
  getModifier(ability: string): number;
}
