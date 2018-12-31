export enum GameObjectType {
  GOLD,
  WEAPON,
  ARMOR,
  FLASK,
  TORCH,
  POTION,
  BACKPACK,
  FOOD
}

export namespace GameObjectType {
  export function getFromString(key: string): GameObjectType | null {
    switch (key) {
      case 'TORCH':
        return GameObjectType.TORCH;
      case 'FOOD':
        return GameObjectType.FOOD;
      case 'WEAPON':
        return GameObjectType.WEAPON;
      case 'ARMOR':
        return GameObjectType.ARMOR;
      default:
        return null;
    }
  }
}
