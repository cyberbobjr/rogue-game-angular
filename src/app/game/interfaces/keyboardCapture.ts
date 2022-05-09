export interface KeyboardCapture {
    getId(): string;

    handleActionKeyEvent(key: KeyboardEvent): void;
}
