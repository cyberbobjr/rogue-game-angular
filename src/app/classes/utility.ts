export class Utility {
  static initArray(width: number, height: number, fill = '.'): string[][] {
    const newArray = new Array(height);
    newArray.fill(['.']);
    newArray.forEach((value: any, index: number) => {
      newArray[index] = new Array(width).fill(fill);
    });
    return newArray;
  }
}
