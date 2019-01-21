class AstarMap {
    constructor(settings, originNode, goalNode, nodes) {
        this.settings = settings;
        this.originNode = originNode;
        this.goalNode = goalNode;
        this.nodes = nodes;
        this.computed = {};
        this.offsetX;
        this.offsetY;
        this.drawInterval;
        this.redrawTime;
        this.mouse = [];
        this.canvas;
        this.mouseNode = { draw: () => {}};
    }

    /**
     * Initialize the Map configuration with calculating values derived
     * from a defined number of Nodes fit into the canvas frame.
     */
    initializeWithExplicitNodes() {
        // Initialize settings
        const settings = this.settings.layout;

        // Calculate node width to fit all nodes within canvas
        const marginWidthRequirement = settings.nodeX * settings.margin + settings.margin;
        const nodeWidth = Math.floor((canvas.width - marginWidthRequirement) / settings.nodeX);
        
        // Calculate node height to fit all nodes within canvas
        const marginHeightRequirement = settings.nodeY * settings.margin + settings.margin;
        const nodeHeight = Math.floor((canvas.height - marginHeightRequirement) / settings.nodeY);

        // Initialize computed settings
        this.settings.computed = new LayoutSettings().configure(this.settings.layout);

        // Calculate canvas outer margins
        const outerMarginX = canvas.width - ((nodeWidth + settings.margin) * settings.nodeX + settings.margin);
        const outerMarginY = canvas.height - ((nodeHeight + settings.margin) * settings.nodeY + settings.margin);
        
        // Assign computed setting values
        this.settings.computed.nodeWidth = nodeWidth;
        this.settings.computed.nodeHeight = nodeHeight;
        this.settings.computed.x = this.settings.layout.nodeX;
        this.settings.computed.y = this.settings.layout.nodeY;
        this.settings.computed.outerMarginX = outerMarginX;
        this.settings.computed.outerMarginY = outerMarginY;  

        // Generate offset calculation functions
        this.offsetX = (x) => {
            return this.settings.computed.outerMarginX/2 + this.settings.computed.margin + x * 
                            (this.settings.computed.nodeWidth + this.settings.computed.margin);
        }
    
        this.offsetY = (y) => {
            return outerMarginY/2 + this.settings.computed.margin + y * 
                (this.settings.computed.nodeHeight + this.settings.computed.margin);
        }
    
        // Initialize Nodes
        for (let x = 0; x < this.settings.computed.nodeX; x++) {
            this.nodes[x] = [];
            for (let y = 0; y < this.settings.computed.nodeY; y++) {
                const node = new Node(x, y, 1, true, this);
                this.nodes[x][y] = node;
            }
        }
    }

    /**
     * Initialize animation
     */
    animateIn() {
        this.settings.animation.startTime = new Date();
        this.settings.animation.animating = true;
    }

    /**
     * Draw Astar to canvas with provided context
     * @param {*} ctx - Canvas context
     */
    drawSelf(ctx) {
        // Set timestamp for current redraw
        this.redrawTime = new Date();

        // Check if map is currently animating in
        if (this.settings.animation.animating) {
            if (new Date() - this.settings.animation.startTime > this.settings.animation.duration * 2) {
                this.settings.animation.animating = false;
                // clearInterval(this.drawInterval);
            }
        }

        // Draw Nodes
        for(let x = 0; x < this.nodes.length; x++) {
            for(let y = 0; y < this.nodes[x].length; y++) {
                this.nodes[x][y].draw(ctx);
            }
        }
        // console.log(this.canvas);
        const mouseNode = this.getNodeUnderMouse();
        if (mouseNode) {
            this.mouseNode = mouseNode;
        }

        this.mouseNode.draw(ctx, {underMouse: true});
    }

    getMouseCoords() {
        return [this.mouse[0] - this.canvas.offsetLeft,
                this.mouse[1] - this.canvas.offsetTop];
    }

    getNodeUnderMouse() {
        let [mouseX, mouseY] = this.getMouseCoords();
        const nodeRelativeX = (mouseX - this.settings.computed.outerMarginX/2) % 
                    (this.settings.computed.margin + this.settings.computed.nodeWidth);

        const nodeRelativeY = (mouseY - this.settings.computed.outerMarginY/2) %
                    (this.settings.computed.margin + this.settings.computed.nodeHeight);

        // fail fast
        if (nodeRelativeX < 0 || nodeRelativeY < 0) return;
        if (nodeRelativeX < this.settings.computed.margin || 
            nodeRelativeY < this.settings.computed.margin) return;

        const x = Math.floor((mouseX - this.settings.computed.outerMarginX/2) / 
                    (this.settings.computed.margin + this.settings.computed.nodeWidth));

        const y = Math.floor((mouseY - this.settings.computed.outerMarginY/2) /
                    (this.settings.computed.margin + this.settings.computed.nodeHeight));
        
        // Fail if mouse is beyond the range of displayed nodes
        if (x > this.nodes.length) return;
        if (y > this.nodes[0].length) return;
        if (!x || !y) return;

        return this.nodes[x][y];
    }
}