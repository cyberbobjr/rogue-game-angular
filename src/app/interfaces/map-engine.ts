export interface MapEngine {
  isWalkable(position: Position): boolean;

  generateNewMap(width: number, height: number): Array<Array<string>>;
}
