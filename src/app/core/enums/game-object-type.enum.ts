export enum GameObjectType {
  GOLD,
  WEAPON,
  ARMOR,
  TORCH,
  POTION,
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

  export function getRandomType(): GameObjectType {
    const randIndex = Math.floor(6 * Math.random()) + 1;
    switch (randIndex) {
      case 1 :
        return GameObjectType.FOOD;
      case 2 :
        return GameObjectType.POTION;
      case 3 :
        return GameObjectType.ARMOR;
      case 4 :
        return GameObjectType.WEAPON;
      case 5 :
        return GameObjectType.TORCH;
      case 6 :
        return GameObjectType.GOLD;
    }
  }
}
