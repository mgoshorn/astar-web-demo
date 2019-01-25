class Astar {

    constructor(map, heuristicFunction) {
        this.map = map;
        this.heuristicFunction = heuristicFunction;
        this.travelCost = new Map();
        this.estimateRemainingCost = new Map();
        this.queuedNodes = [];
        this.started = false;
        this.heap;
    }

    next() {
        if (!this.started) {
            this.doFirstProcess();
        }
    }

    doFirstProcess() {
        const customCompare = (n1, n2) => {
            (this.travelCost.get(n1) + this.estimateRemainingCost.get(n1)) -
            (this.travelCost.get(n2) + this.estimateRemainingCost.get(n2))
        };
        this.heap = new BinaryHeap(customCompare);

        const initialNodes = this.findNeighbors(this.map.originNode);
        initialNodes
            .filter((n) => this.processNode(n, 0))
            .forEach((n) => this.heap.push(n));   
    }

    isNewNode(node) {
        return !this.travelCost.has(node);
    }

    /**
     * Processes Node given current source Node.
     * Checks if this Node is tracked, and if so if the
     * the current path is more efficient than existing track
     * route. If so, updates travel costs and returns true, otherwise
     * returns false.
     * @param {} node 
     * @param {*} travelCost 
     */
    processNode(node, travelCost) {
        if(this.travelCost.has(node) && this.travelCost.get(node) <= travelCost + node.weight) {
            return false;
        }
        this.travelCost.set(node, travelCost + node.weight);
        const estimateRemaining = this.heuristicFunction(node, this.map.goalNode);
        this.estimateRemainingCost.set(node, estimateRemaining);
        return true;
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