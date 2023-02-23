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
        }
        update() {

        }
        draw(context) {
            this.player.draw(context);
        }
    }
    



    let enemies= [];
    let score=0;
    let gameOver=false;
    let debug = true;
    


    class Inputhandler { // Класс обработчика нажатых клавиш
        constructor() {
            this.keys=[]; //Массив, который будет содержать информацию о том, какие клавиши нажаты в данный момент
            window.addEventListener('keydown', e => {
                if( (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "ArrowLeft" || e.key === "ArrowRight" || e.key === "Enter")  && this.keys.indexOf(e.key) === -1) { // При нажатии на клавишу, если она "стрелка вниз" или "вверх", или "влево", или "вправо" и ее нет в массиве keys, то тогда добавляем ее туда
                    this.keys.push(e.key);
                } ;
            });

            window.addEventListener('keyup', e => {
                if(e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "ArrowLeft" || e.key === "ArrowRight" || e.key === "Enter") {  // При отпускании клавиши, если она "стрелка вниз" или "вверх", или "влево", или "вправо", находим ее индекс в массиве и удаляем  ее одну
                    this.keys.splice(this.keys.indexOf(e.key), 1);
                }
            });
        }
    }


    class Player {
        constructor (game) {
            this.game=game;
            this.width=200;
            this.height=200;
            this.x=0;
            this.y= this.game.height-this.height;
            this.image= document.getElementById("playerImage");
            this.frameX=0;
            this.maxFrame=8;
            this.frameY=0;
            this.fps=20;
            this.frameTimer=0;
            this.frameInterval= 1000/this.fps;
            this.speed=0;
            this.vy=0;
            this.weight=1; // Сила гравитации
            
        }
        draw(context) {
            context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
        }

        update(input, deltaTime, enemies) {
            //Обнаружение столкновений
            enemies.forEach( enemy => {
                const dx= (enemy.x+ enemy.width/2) - (this.x +this.width/2);
                const dy= (enemy.y+ enemy.height/2) - (this.y + this.height/2);
                const distance = Math.sqrt (dx*dx+dy*dy);
                if (distance < enemy.width/2 + this.width/2) {
                    gameOver = true;
                }
            })

            //Анимация спрайта
            if (this.frameTimer > this.frameInterval) {
                if( this.frameX >= this.maxFrame) {
                    this.frameX=0;
                } else {
                    this.frameX++;
                    this.frameTimer=0;
                }
            } else {
                this.frameTimer+= deltaTime;
            }
            //Управление кнопками
            if (input.keys.indexOf("ArrowRight") > -1) {
                this.speed = 5;
            } else if(input.keys.indexOf("ArrowLeft") > -1) {
                this.speed = -5;
            } else if(input.keys.indexOf("ArrowUp") > -1 && this.onGround ()) { //Если нажата стрелка вверх и персонаж находится на земле
                this.vy-=32;
            } else {
                this.speed=0;
            }
            //Горизонтальное движение
            this.x += this.speed;
            if(this.x<0) { this.x=0;}
            else if( this.x> this.gameWidth-this.width) { this.x= this.gameWidth - this.width; }

            //Вертикальное движение
            this.y += this.vy;
            if (! this.onGround()) { //Если персонаж не на земле, а в воздухе
                this.vy +=this.weight;
                this.maxFrame=5;
                this.frameY =1; //Меняется картинка на прыжок
            } else {
                this.vy=0;
                this.maxFrame=8;
                this.frameY =0;
            }
            if (this.y > this.gameHeight - this.height) { // Чтоб персонаж никогда не проваливался ниже отметки игры
                this.y=this.gameHeight-this.height;
            }

        }

        onGround() { //Метод для проверки находится ли персонаж в воздухе или на земле. Если true, то на земле. False-в воздухе.
            return this.y >= this.gameHeight - this.height;
        }
    }


    class Background {
        constructor(gameWidth, gameHeight) {
            this.gameWidth= gameWidth;
            this.gameHeight= gameHeight;
            this.image= document.getElementById ('backgroundImage');
            this.x=0;
            this.y=0;
            this.width=2400;
            this.height=720;
            this.speed=7;
        }

        draw(context) {
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
            context.drawImage(this.image, this.x+this.width-this.speed, this.y, this.width, this.height);
        }

        update() {
            this.x-=this.speed;
            if (this.x < 0 -this.width) this.x=0;
        }
    }


    class Enemy {
        constructor (gameWidth, gameHeight) {
            this.gameWidth=gameWidth;
            this.gameHeight=gameHeight;
            this.width=160;
            this.height=119;
            this.image=document.getElementById("enemyImage");
            this.x=this.gameWidth;
            this.y=this.gameHeight - this.height;
            this.frameX=0;
            this.maxFrame=5;
            this.fps=20;
            this.frameTimer=0;
            this.frameInterval= 1000/this.fps;
            this.speed=8;
            this.markedForDeletion= false;
        }

        draw(context) {

            context.drawImage(this.image, this.frameX * this.width, 0 , this.width, this.height, this.x, this.y,this.width, this.height);
        }

        update(deltaTime) {
            if (this.frameTimer > this.frameInterval) {
                if (this.frameX >= this.maxFrame) { this.frameX=0;}
                else {this.frameX++;
                      this.frameTimer=0;}
            } else {
                this.frameTimer+=deltaTime;
            }
            this.x-=this.speed;
            if (this.x <0 -this.width) {
                this.markedForDeletion=true;
                score++;
            }
           
        }
    }

    
    function handleEnemies(deltaTime) {
            if (enemyTimer > enemyInterval + randomEnemyInterval) {
                enemies.push (new Enemy (canvas.width, canvas.height));
                enemyTimer=0;
            } else {
                enemyTimer+=deltaTime;
            }
            enemies.forEach( enemy => {
                enemy.draw(ctx);
                enemy.update(deltaTime);
            });
            enemies=enemies.filter (enemy => !enemy.markedForDeletion);
    }

    function displayStatustext(context) {
        context.fillStyle="black";
        context.font = "40px Helvetica";
        context.fillText ("Score: "+score,20, 50);
        if( gameOver) {
            context.textAlign = "center";
            context.fillStyle= "black";
            context.fillText ("GAME OVER, try again!", canvas.width/2, 200);
            context.fillStyle= "white";
            context.fillText ("GAME OVER, try again!", canvas.width/2+2, 202);
            
        }
    }

    const input= new Inputhandler();
    const player = new Player (canvas.width, canvas.height);
    const background = new Background ( canvas.width, canvas.height);

    let lastTime=0;
    let enemyTimer =0;
    let enemyInterval =1000;
    let randomEnemyInterval= Math.random() *1000 +500;
    const game= new Game(canvas.width, canvas.height);
    
    function animate(timeStamp) {
        const deltaTime= timeStamp- lastTime;
        lastTime= timeStamp;
        ctx.clearRect (0, 0, canvas.width, canvas.height);
        background.draw(ctx); //Сначала нарисовала фон
        player.draw(ctx);
        // background.update();
        player.update(input, deltaTime, enemies);
        handleEnemies(deltaTime);
        displayStatustext(ctx);
        if (!gameOver) requestAnimationFrame(animate);
    }
    animate(0);

})