export enum NameGameEventEnum {
    KEYBOARD
}

export interface GameEvent {
    name: NameGameEventEnum;
    payload: any;
}
