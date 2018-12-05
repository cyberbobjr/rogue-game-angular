export class Utility {
  static initArray(width: number, height: number, fill = '.'): string[][] {
    const newArray = new Array(height);
    newArray.fill(['.']);
    newArray.forEach((value: any, index: number) => {
      newArray[index] = new Array(width).fill(fill);
    });
    return newArray;
  }

  static rolldice(sides: number = 10): number {
    return Math.floor(Math.random() * sides) + 1;
  }
}
