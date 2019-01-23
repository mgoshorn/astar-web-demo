class Astar {

    constructor(map, heuristicFunction) {
        this.map = map;
        this.heuristicFunction = heuristicFunction;
        this.travelCost = new Map();
        this.estimateRemainingCost = new Map();
        this.queuedNodes = [];
        this.started = false;
    }

    next() {
        if (!this.started) {

        }
    }

    doFirstProcess() {
        initialNodes = this.findNeighbors(this.map.originNode);
        // forEach
    }

    isNewNode(node) {
        return !this.travelCost.has(node);
    }

    findNeighbors(node) {
        const xRange = [node.x - 1, node.x, node.x + 1];
        const yRange = [node.y - 1, node.y, node.y + 1];
        const nodeCoords = [
            [xRange[0], yRange[0]],
            [xRange[0], yRange[1]],
            [xRange[0], yRange[2]],
            [xRange[1], yRange[0]],
            [xRange[1], yRange[2]],
            [xRange[2], yRange[0]],
            [xRange[2], yRange[1]],
            [xRange[2], yRange[2]],
        ].filter( c => {
            return c[0] >= 0 && c[1] >= 0 && 
                c[0] < this.map.nodes.length &&
                c[1] < this.map.nodes[0].length; 
        });
        const nodes = [];
        nodeCoords.forEach( (c) => {
            nodes.push(this.map.nodes[c[0]][c[1]]);
        })

        console.log(nodes);
        return nodes;
    }
}