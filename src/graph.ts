import Node from './attributes/node';
import Edge from './attributes/edge';
import NodePosition from './attributes/nodePosition';
import GraphSerializer from './serializedGraph';

export default class Graph {
    nodes: Array<Node>;
    edges: Array<Edge>;

    public constructor(nodes?: Array<Node>, edges?: Array<Edge>) {
        this.nodes = nodes || [];
        this.edges = edges || [];
    }

    public addNode(label: string | number, color: string, size: number, position: NodePosition): void {
        const node = new Node(label, color, size, position);

        this.nodes.push(node);
    }

    public removeNode(label?: string): void {
        if (!label) {
            throw new Error(`There's no node with label ${label}`);
        }
        this.nodes = this.nodes.filter((node: Node) => node.label !== label);
    }

    public addEdge(from: Node, to: Node, weight: number): void {
        const edge = new Edge(weight, from.position, to.position);
        const reverseEdge = new Edge(weight, to.position, from.position)

        this.edges.push(edge);
        this.edges.push(reverseEdge);
    }

    public removeEdge(from: Node, to: Node) {
        if (!from && !to) {
            throw new Error("Incorrect nodes encountered.");
        }
        this.edges = this.edges.filter((edge: Edge) => {
            return from.position.x !== edge.from.x && from.position.y !== edge.from.y && to.position.x !== edge.to.x && to.position.y !== edge.to.y;
        });
    }

    public serializeGraph(): void {
        let result: GraphSerializer = new GraphSerializer();

        result.nodes = [...this.nodes];
        result.edges = [...this.edges];

        // console.log(result);
    }
}