export class AttributesFactory {
  static modifiers: Array<{ min: number, max: number, modifier: number }> = [
    {min: 0, max: 1, modifier: -5},
    {min: 2, max: 3, modifier: -4},
    {min: 4, max: 5, modifier: -3},
    {min: 6, max: 7, modifier: -2},
    {min: 8, max: 9, modifier: -1},
    {min: 10, max: 11, modifier: 0},
    {min: 12, max: 13, modifier: 1},
    {min: 14, max: 15, modifier: 2},
    {min: 16, max: 17, modifier: 3},
    {min: 18, max: 19, modifier: 4},
    {min: 20, max: 21, modifier: 5},
    {min: 22, max: 23, modifier: 6},
    {min: 24, max: 25, modifier: 7},
    {min: 26, max: 27, modifier: 8},
    {min: 28, max: 29, modifier: 9},
    {min: 30, max: 99, modifier: 10},
  ];

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

  static getModifier(score: number): number | null {
    const modifier: { min, max, modifier } | null = AttributesFactory.modifiers.find((value: { min, max, modifier }) => {
      return (score >= value.min && score <= value.max);
    });
    return modifier ? modifier.modifier : null;
  }
}
