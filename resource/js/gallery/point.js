export class Point {
    constructor(index, x, y) {
        this.x = x;
        this.y = y;
        this.fixedY = y;
        this.speeid = 0.1;
        this.cur = index;
        this.max = Math.random() * 100 + 150;
    }

    update() {
        this.cur += this.speeid;
        this.y = this.fixedY + (Math.sin(this.cur) * this.max);
    }
}