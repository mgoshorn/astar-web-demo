class Astar {

    constructor(map, heuristicFunction) {
        this.map = map;
        this.heuristicFunction = heuristicFunction;
        this.travelCost = new Map();
        this.estimateRemainingCost = new Map();
        this.queuedNodes = [];
        this.started = false;
        this.heap;
        this.edgeMap = new Map();
        this.complete = false;
        this.impossible = false;
        this.solution = [];
    }

    next() {
        if (!this.started) {
            this.doFirstProcess();
        } if (this.impossible) {

        } if (this.complete) {
            if (!this.solution.length && this.edgeMap.has(this.map.goalNode)) {
                this.findSolutionPath();
            }

        } else {
            this.processMinNode();
        }
    }

    findSolutionPath() {
        let currentNode = this.map.goalNode;
        this.solution.push(currentNode);
        while (currentNode !== this.map.originNode) {
            if (!currentNode) return;
            currentNode = this.edgeMap.get(currentNode);
            this.solution.push(currentNode);
        }
    }

    processMinNode() {
        // Check if heap has been emptied
        if (this.heap.isEmpty()) {
            // if heap is empty prior to the goal node being found, then there
            // is no solution
            this.impossible = true;
            return;
        }
        const n = this.heap.extractMinimum().value;
        const neighbors = this.findNeighbors(n);
        neighbors
            .filter((neighbor) => this.processNode(neighbor, this.travelCost.get(n) || 0, this.isDiagonal(n, neighbor)))
            .forEach((neighbor) => {
                this.edgeMap.set(neighbor, n)
                this.heap.insert(this.travelCost.get(neighbor) + this.estimateRemainingCost.get(neighbor), neighbor);
            });
    }


    isDiagonal(n, o) {
        return n.x !== o.x && n.y !== o.y;
    }

    doFirstProcess() {
        this.heap = new BinaryHeap();
        this.travelCost.set(this.map.originNode, 0);
        const estimateRemaining = this.heuristicFunction(this.map.originNode, this.map.goalNode);
        this.estimateRemainingCost.set(this.map.originNode, estimateRemaining);
        this.started = true;
        this.heap.insert(estimateRemaining, this.map.originNode);

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
    processNode(node, travelCost, isDiagonal) {
        // If this node is the goal node, then we have found a solution
        if (node === this.map.goalNode) {
            this.complete = true;
        }

        const cost = isDiagonal ? node.weight * 1.1 : node.weight;

        if(this.travelCost.has(node) && this.travelCost.get(node) <= travelCost + cost) {
            return false;
        }
        
        this.travelCost.set(node, travelCost + cost);
        const estimateRemaining = this.heuristicFunction(node, this.map.goalNode);
        this.estimateRemainingCost.set(node, estimateRemaining);
        return true;
    }

    findNeighbors(node) {
        const xRange = [node.x - 1, node.x, node.x + 1];
        const yRange = [node.y - 1, node.y, node.y + 1];
        const nodes = [
            [xRange[0], yRange[0]],
            [xRange[0], yRange[1]],
            [xRange[0], yRange[2]],
            [xRange[1], yRange[0]],
            [xRange[1], yRange[2]],
            [xRange[2], yRange[0]],
            [xRange[2], yRange[1]],
            [xRange[2], yRange[2]],
        ].filter( c => {
            // filter out out of range coords
            return c[0] >= 0 && c[1] >= 0 && 
                c[0] < this.map.nodes.length &&
                c[1] < this.map.nodes[0].length; 
        }).map(c => {
            // map to actual Nodes
            return this.map.nodes[c[0]][c[1]];
            // filter out impassable nodes
        }).filter(n => n.navigable);

        return nodes;
    }
}