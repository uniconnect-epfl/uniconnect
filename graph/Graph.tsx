interface Node {
  id: string
  x: number
  y: number
  dx: number
  dy: number
}
interface Link {
  source: string
  target: string
  strength: number
}

export default class Graph {
  
  nodes: Node[];

 
  links: Link[];

  constructor(
    ids: string[],
    sources: string[],
    targets: string[],
    strengths: number[]
  ) {
    if (ids.length === 0) {
      throw new Error("ids must not be empty");
    }
    if (sources.length === 0) {
      throw new Error("sources must not be empty");
    }
    if (sources.length !== targets.length || targets.length !== strengths.length) {
        throw new Error("sources, targets, and strengths must have the same length");
    }

    this.nodes = ids.map((id: string): Node => {
      return {
        id: id,
        x: 0,
        y: 0,
        dx: 0,
        dy: 0,
      };
    });

    this.links = sources.map((source: string, index: number): Link => {
      return {
        source: source,
        target: targets[index],
        strength: strengths[index],
      };
    });
  }

  
  getNodes(): Node[] {
    return this.nodes;
  }

  
  getLinks(): Link[] {
    return this.links;
  }

  
  addNode(id: string): void {
    this.nodes.push({
      id: id,
      x: 0,
      y: 0,
      dx: 0,
      dy: 0,
    });
  }

  
  addLink(source: string, target: string, strength: number): void {
    this.links.push({
      source: source,
      target: target,
      strength: strength,
    });
  }

  
  removeNode(id: string): void {
    this.nodes = this.nodes.filter((node: Node): boolean => {
      return node.id !== id;
    });

    this.links = this.links.filter((link: Link): boolean => {
      return link.source !== id && link.target !== id;
    });
  }

  
  removeLink(source: string, target: string): void {
    this.links = this.links.filter((link: Link): boolean => {
      return link.source !== source || link.target !== target;
    });
  }
}

export type { Node, Link };