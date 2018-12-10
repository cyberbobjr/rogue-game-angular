export class AttributesFactory {
  static getAttributes(): Array<[string, number]> {
    return [
      ['strength', 0],
      ['dexterity', 0],
      ['constitution', 0],
      ['intelligence', 0],
      ['wisdom', 0],
      ['charisma', 0]
    ];
  }
}
