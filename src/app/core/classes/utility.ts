import {SlotType} from '../enums/equiped-type.enum';

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

}
