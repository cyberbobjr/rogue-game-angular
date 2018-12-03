export class GameMap<T extends object> {
  private _data: T[][];

  set content(data: T[][]) {
    this._data = data;
  }

  get content(): T[][] {
    return this._data;
  }

  get width(): number {
    return this._width;
  }

  get height(): number {
    return this._height;
  }

  constructor(private _width?: number, private _height?: number, data?: T[][]) {
    this._data = data ? Object.create(data) : this._initArray(this._width, this._height);
  }

  clone(): GameMap<T> {
    return this.extract(0, 0, this._width, this._height);
  }

  extract(startPosX: number, startPosY: number, width: number, height: number): GameMap<T> {
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

    const arrayExtracted: T[][] = this._getRawData(startPosX, startPosY, finalWidth, finalHeight);

    return new GameMap<T>(finalWidth, finalHeight, arrayExtracted);
  }

  private _getRawData(startX, startY, width, height): T[][] {
    const arrayExtracted: T[][] = this._initArray(width, height);
    let y = 0;
    let x = 0;
    for (let j = startY; j < startY + height; j++) {
      for (let i = startX; i < startX + width; i++) {
        arrayExtracted[y][x] = Object.create(this._data[j][i]) as T;
        x++;
      }
      y++;
      x = 0;
    }
    return arrayExtracted;
  }

  private _initArray(width: number, height: number, fill = '.'): T[][] {
    const newArray = new Array(height);
    newArray.fill(fill);
    newArray.forEach((value: any, index: number) => {
      newArray[index] = new Array(width).fill(fill);
    });
    return newArray;
  }
}
