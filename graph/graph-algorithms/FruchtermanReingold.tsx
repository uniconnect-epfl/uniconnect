import { Node, Link } from '../Graph';

export const fruchtermanReingold = (nodes: Node[], links: Link[], constrainedNodeId: string, width: number, height: number, iterations: number) => {
    
    const area = width * height;
    const k = Math.sqrt(area / nodes.length); // Maximum distance between nodes

    const attractiveForce = (distance: number): number => distance ** 2 / k; // Attractive force proportional to distance
    const repulsiveForce = (distance: number): number => k ** 2 / distance; // Repulsive force inversely proportional to distance

    const distanceBetween = (p1: Node, p2: Node): number => Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);

    // Calculate initial positions
    for (const node of nodes) {
        node.x = Math.random() * width;
        node.y = Math.random() * height;
    } 

    let temperature = width / 10; // Initial temperature
    const cooling = temperature / (iterations + 1); // Cooling rate

    for (let i = 0; i < iterations; i++) { 
        // Calculate repulsive forces
        for (const node of nodes) {
            node.dx = 0;
            node.dy = 0; 

            for (const otherNode of nodes) {
                if (node != otherNode) {
                    const dx = node.x - otherNode.x;
                    const dy = node.y - otherNode.y;
                    const distance = distanceBetween(node, otherNode);

                    if (distance != 0) {
                        const force = repulsiveForce(distance) / distance;
                        node.dx += dx * force;
                        node.dy += dy * force;
                    }
                }
            }
        }

        // Calculate attractive forces
        for (const link of links) {
            const source = nodes.find((node) => node.id === link.source);
            const target = nodes.find((node) => node.id === link.target);

            if (source && target) {
                const dx = target.x - source.x;
                const dy = target.y - source.y;
                const distance = distanceBetween(source, target);

                if (distance != 0) {
                    const force = attractiveForce(distance) / distance;
                    source.dx += dx * force;
                    source.dy += dy * force;
                    target.dx -= dx * force;
                    target.dy -= dy * force;
                }
            }
        }

        // Limit maximum displacement
        for (const node of nodes) {

            if (node.id === constrainedNodeId) {
                node.x = width / 2;
                node.y = height / 2;
                continue;
            }
            const distance = Math.sqrt(node.dx ** 2 + node.dy ** 2);

            if (distance != 0) {
                const ratio = Math.min(distance, temperature) / distance;
                node.x += node.dx * ratio;
                node.y += node.dy * ratio;

                node.x = Math.min(width, Math.max(0, node.x));
                node.y = Math.min(height, Math.max(0, node.y));
            }
        }

        // Cool down temperature
        temperature -= cooling;

    }
    return nodes;
}