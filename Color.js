class Color {
    constructor(r, g, b, a) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }

    getColor() {
        if (this.a) {
            return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
        }
        return `rgb(${this.r}, ${this.g}, ${this.b})`;
    }

    lighten(val) {
        this.r = Math.min(this.r + val, 255);
        this.g = Math.min(this.g + val, 255);
        this.b = Math.min(this.b + val, 255);
    }

    darken(val) {
        this.r = Math.max(this.r - val, 0);
        this.g = Math.max(this.g - val, 0);
        this.b = Math.max(this.b - val, 0);
    }

    addBlue(val) {
        this.b = Math.min(this.b + val, 255);
    }

    copy() {
        return new Color(this.r, this.g, this.b, this.a);
    }
}