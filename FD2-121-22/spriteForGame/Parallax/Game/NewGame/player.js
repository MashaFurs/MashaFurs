export class Player {
    constructor(game) {
        this.game=game;
        this.width=200;
            this.height=200;
            this.x=0;
            this.y= 100;
    }
    update() {

    }

    draw(context) {
        context.fillRect (this.x, this.y, this.width, this.height);
    }
}