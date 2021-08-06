export type CellTypes = "code" | "text";
export type CellDirections = "up" | "down";

export interface Cell {
    id: string;
    direction: CellDirections;
    type: CellTypes;
    content: string;
}