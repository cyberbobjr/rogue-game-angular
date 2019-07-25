import {SlotType} from '../enums/equiped-type.enum';

export class Utility {
  static initArrayNumber(width: number, height: number, fill = 0): number[][] {
    const newArray = new Array(height);
    newArray.fill([fill]);
    newArray.forEach((value: any, index: number) => {
      newArray[index] = new Array(width).fill(fill);
    });
    return newArray;
  }

  static initArrayString(width: number, height: number, fill = '.'): [][] {
    const newArray = new Array(height);
    newArray.fill(fill);
    newArray.forEach((value: any, index: number) => {
      newArray[index] = new Array(width).fill(fill);
    });
    return newArray;
  }

  static rolldice(sides: number = 10): number {
    return Math.floor(Math.random() * sides);
  }

  static alphabetArray(): Array<string> {
    return 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  }

  static getLetter(index: number): string {
    return Utility.alphabetArray()[index];
  }

  static getSlotTypeLabel(slot: SlotType): string {
    switch (slot) {
      case SlotType.LEFTHAND :
        return 'LEFTHAND';
      case SlotType.RIGHTHAND :
        return 'RIGHTHAND';
      case SlotType.BOOTS :
        return 'BOOTS';
      case SlotType.CHEST :
        return 'CHEST';
      case SlotType.HEAD :
        return 'HEAD';
      case SlotType.LEGS :
        return 'LEGS';
      case SlotType.NECKLACE :
        return 'NECKLACE';
      case SlotType.RINGLEFT :
        return 'RINGLEFT';
      case SlotType.RINGRIGHT :
        return 'RINGRIGHT';
      case SlotType.TWOHANDS :
        return 'TWOHANDS';
      default:
        return '';
    }
  }

  static getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
