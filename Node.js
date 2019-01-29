/**
 * Describes a singular Node in an A* graph
 */
class AstarNode {
    constructor(x, y, weight, navigable, map) {
        this.x = x;
        this.y = y;
        this.weight = weight;
        this.navigable = navigable;
        this.map = map;
    }

    /**
     * Gets the Rectangle describing the location of the Node relative to the Canvas based
     * on the maps conmputed draw settings
     */
    getRectangle() {
        return [this.map.offsetX(this.x), this.map.offsetY(this.y), this.map.settings.computed.nodeWidth, this.map.settings.computed.nodeHeight];
    }

    isGoalNode() {
        return this.map.goalNode === this;
    }

    isOriginNode() {
        return this.map.originNode === this;
    }

    /**
     * Draw self to the canvas with provided context
     * @param {} ctx 
     */
    draw(ctx, options = {}) {
        const color = this.getFillStyle(options);
        if (color.a === 0) return;
        ctx.fillStyle = color.getColor();
        ctx.fillRect(...this.getRectangle());
    }

    drawEdge(ctx, to) {
        ctx.fillStyle = new Color(0, 255, 255).getColor();
        ctx.fillRect(...this.getRectangle());
    }

    /**
     * Generate fill Color from Node state
     */
    getFillStyle(options = {}) {
        let style;
        if (this.map.settings.animation.animating) {
            style = this.getAnimatingColor();
        } else if (this.isOriginNode()) {
            style = new Color(20, 255, 20);
        } else if (this.isGoalNode()) {
            style = new Color(255, 20, 20);
        } else if (this.map.astar.travelCost.has(this)) {
            style = new Color(100, 100, 255);
        } else if (this.navigable) {
            style = this.map.settings.color.untracked.copy();
        } else {
            style = new Color(0,0,0,0);
        }
        
        if (options.underMouse) {
            style.lighten(20);
            style.addBlue(20);
        }

        return style;
    }

    /**
     * Delegate method for calculating Node Color when the Node is currently being animated
     */
    getAnimatingColor() {
        const timeOffset = this.x + this.y;
        const animationElapsedTime = this.map.redrawTime - this.map.settings.animation.startTime;
        const maxOffset = this.map.nodes.length + this.map.nodes[0].length;
        const msPerOffset = this.map.settings.animation.duration/2 / maxOffset;
        let nodeElapsedTime =  animationElapsedTime - timeOffset * msPerOffset;
        
        const duration = this.map.settings.animation.duration;
        nodeElapsedTime = nodeElapsedTime < 0 ? 0 : nodeElapsedTime > duration ? duration : nodeElapsedTime;

        const alpha = nodeElapsedTime / duration;
        if (!alpha) return new Color(0,0,0,0);
        const base = this.map.settings.color.untracked;
        return new Color(base.r, base.g, base.b, alpha);
    }
}
