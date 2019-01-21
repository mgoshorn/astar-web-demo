/**
 * Settings related to Animation
 */
class AnimationSettings {
    constructor(animating = false, duration = 1000, startTime) {
        this.animating = animating;
        this.duration = duration;
        this.startTime = startTime;
    }

    startAnimation() {
        this.animating = true;
        this.startTime = new Date();
    }
}

/**
 * Settings related to Color
 */
class ColorSettings {
    constructor(untracked, unnavigable, start, end, minColor, maxColor, border) {
        this.untracked = untracked;
        this.unnavigable = unnavigable;
        this.start = start;
        this.end = end;
        this.minColor = minColor;
        this.maxColor = maxColor;
        this.border = border;
    }

    configure(configuration) {
        this.untracked = configuration.untracked || this.untracked;
        this.unnavigable = configuration.unnavigable || this.unnavigable;
        this.start = configuration.start || this.start;
        this.end = configuration.end || this.end;
        this.minColor = configuration.minColor || this.minColor;
        this.maxColor = configuration.maxColor || this.maxColor;
        this.border = configuration.border || this.border;
        return this;
    }
}

/**
 * Settings related to Layout
 */
class LayoutSettings {
    constructor(sizeStyle, nodeHeight, nodeWidth, nodeX, nodeY, margin,
                offsetX, offsetY, outerMarginX, outerMarginY) {
        this.sizeStyle = sizeStyle;
        this.nodeHeight = nodeHeight;
        this.nodeWidth = nodeWidth;
        this.nodeX = nodeX;
        this.nodeY = nodeY;
        this.margin = margin;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.outerMarginX = outerMarginX;
        this.outerMarginY = outerMarginY;
    }

    configure(configuration) {
        this.sizeStyle = configuration.sizeStyle || this.sizeStyle;
        this.nodeHeight = configuration.nodeHeight || this.nodeHeight;
        this.nodeWidth = configuration.nodeWidth || this.nodeWidth;
        this.nodeX = configuration.nodeX || this.nodeX;
        this.nodeY = configuration.nodeY || this.nodeY;
        this.margin = configuration.margin || this.margin;
        this.offsetX = configuration.offsetX || this.offsetX;
        this.offsetY = configuration.offsetY || this.offsetY;
        this.outerMarginX = configuration.outerMarginX || this.outerMarginX;
        this.outerMarginY = configuration.outerMarginY || this.outerMarginY;
        return this;
    }
}

/**
 * Top-Level settings Class
 */
class Settings {
    constructor(layoutSettings, animationSettings, colorSettings) {
        this.animation = animationSettings;
        this.layout = layoutSettings;
        this.color = colorSettings;
    }
}
