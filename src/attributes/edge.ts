import NodePosition from "./nodePosition";

export default class Edge {
    static width: number;
    static color: string;

    weight: number;
    from: NodePosition;
    to: NodePosition;

    public constructor(weight: number, from: NodePosition, to: NodePosition) {
        this.weight = weight;

        this.from = {
            x: from.x,
            y: from.y,
        };

        this.to = {
            x: to.x,
            y: to.y,
        };
    }

    public changeWeight(weight?: number): void {
        if (weight) {
            this.weight = weight;
        }
    }

    public static changeEdgeWidth(width?: number): void {
        if (width) {
            Edge.width = width;
        }
    }

    public static changeEdgeColor(color?: string): void {
        if (color) {
            Edge.color = color;
        }
    }
}