export enum Direction {
  N,
  NW,
  W,
  SW,
  S,
  SE,
  E,
  NE
}

export namespace Direction {
  export function getRandom(): Direction {
    const randIndex = Math.floor(8 * Math.random());
    switch (randIndex) {
      case 1 :
        return Direction.E;
      case 2 :
        return Direction.W;
      case 3 :
        return Direction.SW;
      case 4 :
        return Direction.SE;
      case 5 :
        return Direction.S;
      case 6 :
        return Direction.NW;
      case 7 :
        return Direction.NE;
      case 8 :
        return Direction.N;
    }
  }
}
