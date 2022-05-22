import NodePosition from "./nodePosition";

export default class Node {
    label: string | number;
    color: string;
    size: number;
    position: NodePosition;

    public constructor(label: string | number, color: string, size: number, position: NodePosition) {
        this.label = label;
        this.color = color;
        this.size = size;
        this.position = {
            x: position.x,
            y: position.y,
        };
    }

    public changeLabel(label?: string | number): void {
        if (label) {
            this.label = label;
        }
    }

    public changeColor(color?: string): void {
        if (color) {
            this.color = color;
        }
    }

    public changeSize(size?: number): void {
        if (size) {
            this.size = size;
        }
    }

    public changePosition(x?: number, y?: number): void {
        if (x && y) {
            this.position.x = x;
            this.position.y = y;
        }
    }
}