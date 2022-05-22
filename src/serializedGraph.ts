import Node from "./attributes/node";
import Edge from './attributes/edge';

export default class GraphSerializer {
    nodes: Array<Node>;
    edges: Array<Edge>;

    public constructor() {
        this.nodes = [];
        this.edges = [];
    }
}