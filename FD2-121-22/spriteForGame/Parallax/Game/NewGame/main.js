
window.addEventListener("load", function () {
    const canvas=document.getElementById("canvas1");
    const ctx =canvas.getContext("2d");
    canvas.width=800;
    canvas.height=720;

    class Game {
        constructor(width, height) {
            this.width=width;
            this.height = height;
            this.player = new Player (this);
            this.input = new Inputhandler();
        }
        update() {
            this.player.update(this.input.keys);
        }
        draw(context) {
            this.player.draw(context);
        }
    }


    class Player {
        constructor(game) {
            this.game=game;
            this.width=200;
                this.height=200;
                this.x=0;
                this.y= this.game.height-this.height;
                this.image= document.getElementById("playerImage");
        }
        update(input) {
            //Управление кнопками
            if (input.includes ("ArrowRight")) {
                this.x ++;
            } else if(input.includes("ArrowLeft")) {
                this.x--;
            } 
        }
    
        draw(context) {
            
            context.drawImage(this.image, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height);
        }
    }

    class Inputhandler { // Класс обработчика нажатых клавиш
        constructor() {
            this.keys=[]; //Массив, который будет содержать информацию о том, какие клавиши нажаты в данный момент
            window.addEventListener('keydown', e => {
                if( (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "ArrowLeft" || e.key === "ArrowRight" || e.key === "Enter")  && this.keys.indexOf(e.key) === -1) { // При нажатии на клавишу, если она "стрелка вниз" или "вверх", или "влево", или "вправо" и ее нет в массиве keys, то тогда добавляем ее туда
                    this.keys.push(e.key);
                };
            });

            window.addEventListener('keyup', e => {
                if(e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "ArrowLeft" || e.key === "ArrowRight" || e.key === "Enter") {  // При отпускании клавиши, если она "стрелка вниз" или "вверх", или "влево", или "вправо", находим ее индекс в массиве и удаляем  ее одну
                    this.keys.splice(this.keys.indexOf(e.key), 1);
                }
            });
        }
    }

    const game= new Game(canvas.width, canvas.height);
    
    function animate() {
        ctx.clearRect (0, 0, canvas.width, canvas.height);
        game.update();
        game.draw(ctx);
        requestAnimationFrame(animate);
    }
    animate();
});
