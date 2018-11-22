export class GameMap {
  private _data: string[][];

  set content(data: string[][]) {
    this._data = data;
  }

  get content(): string[][] {
    return this._data;
  }

  get width(): number {
    return this._width;
  }

  get height(): number {
    return this._height;
  }

  constructor(private _width: number, private _height: number, data?: string[][]) {
    this._data = data ? Object.create(data) : this._initArray(this._width, this._height);
  }

  clone(): GameMap {
    return this.extract(0, 0, this._width, this._height);
  }

  extract(startPosX: number, startPosY: number, width: number, height: number): GameMap {
    if (startPosX < 0) {
      startPosX = 0;
    }

    if (startPosY < 0) {
      startPosY = 0;
    }

    const endPosX = ((startPosX + width) > this._width) ? this._width : (startPosX + width);
    const endPosY = ((startPosY + height) > this._height) ? this._height : (startPosY + height);

    const finalWidth: number = endPosX - startPosX;
    const finalHeight: number = endPosY - startPosY;

    const arrayExtracted: string[][] = this._getRawData(startPosX, startPosY, finalWidth, finalHeight);

    return new GameMap(finalWidth, finalHeight, arrayExtracted);
  }

  private _getRawData(startX, startY, width, height): string[][] {
    const arrayExtracted: string[][] = this._initArray(width, height);
    let y = 0;
    let x = 0;
    for (let j = startY; j < startY + height; j++) {
      for (let i = startX; i < startX + width; i++) {
        arrayExtracted[y][x] = this._data[j][i];
        x++;
      }
      y++;
      x = 0;
    }
    return arrayExtracted;
  }

  private _initArray(width: number, height: number, fill = '.'): string[][] {
    const newArray = new Array(height);
    newArray.fill(['.']);
    newArray.forEach((value: any, index: number) => {
      newArray[index] = new Array(width).fill(fill);
    });
    return newArray;
  }
}
