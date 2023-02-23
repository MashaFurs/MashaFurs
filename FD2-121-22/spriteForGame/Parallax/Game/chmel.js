window.addEventListener("load", function () {
    const canvas=document.getElementById("canvas1");
    const ctx =canvas.getContext("2d");
    canvas.width=800;
    canvas.height=720;
    let enemies= [];
    let score=0;
    let gameOver=false;
    let debug = true;
    let masha=false;
    

    


    class Inputhandler { // Класс обработчика нажатых клавиш
        constructor() {
            this.keys=[]; //Массив, который будет содержать информацию о том, какие клавиши нажаты в данный момент
            window.addEventListener('keydown', e => {
                
                if( (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "ArrowLeft" || e.key === "ArrowRight")  && this.keys.indexOf(e.key) === -1) { // При нажатии на клавишу, если она "стрелка вниз" или "вверх", или "влево", или "вправо" и ее нет в массиве keys, то тогда добавляем ее туда
                    this.keys.push(e.key);
                } 
                else if (e.key ==="d") { console.log(debug=!debug)}
                // if( e.key === 'Enter' ) {console.log('enter was pressed')};
            });

            window.addEventListener('keyup', e => {
                if(e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "ArrowLeft" || e.key === "ArrowRight") {  // При отпускании клавиши, если она "стрелка вниз" или "вверх", или "влево", или "вправо", находим ее индекс в массиве и удаляем  ее одну
                    this.keys.splice(this.keys.indexOf(e.key), 1);
                }
            });
        }
    }


    let particlesArray=[];

    class Particle {
        constructor(x,y,size) {
            this.x=x;
            this.y=y;
            this.size=size;
            this.weight= Math.random() *1.5+1.5;
            this.directionX= Math.random() *2;
        }

        update() {
            this.y -=this.weight;
            this.x += this.directionX;
            if (this.size >=0.3) { this.size -=0.2};
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI *2);
            ctx.fillStyle="#000000ad";
            ctx.fill();
            // ctx.globalCompositeOperation='xor';
        }
    }

    function handleParticles () {
        for(let i=0; i<particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
            if(particlesArray[i].size <=1) {
                particlesArray.splice(i,1);
                i--;
            }
        }
    }

    function createParticle() {
        let size= Math.random() * 40+10;
        let x= Math.random() * 200;
        let y= 170+40;
        particlesArray.push(new Particle(x,y,size));
    }

    // function animate2() {
    //     const deltaTime= timeStamp- lastTime;
    //     lastTime= timeStamp;
    //     ctx.clearRect (0, 0, canvas.width, canvas.height);
    //     background.draw(ctx); //Сначала нарисовала фон
    //     player.draw(ctx);
    //     createParticle();
    //     handleParticles();
    //     if (masha) requestAnimationFrame(animate2);
    // }
    
    
    class Player {
        constructor (gameWidth, gameHeight) {
            this.gameWidth= gameWidth;
            this.gameHeight=gameHeight;
            this.width=200;
            this.height=200;
            this.x=0;
            this.y= this.gameHeight-this.height;
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
            // this.states=[];
            // this.currentState=this.states[0];
            // let particles= [];

            window.addEventListener('keydown', e => {
                if (e.key === "Control") { 
                    this.image= document.getElementById("round");
                    this.width=200;
                    this.height=170;
                    this.maxFrame=6;
                    this.fps=20;
                    this.weight=0.95;
                    masha=true;
                    // animate2();
                    // console.log("даа")
                    
                    
                }     
            });

            window.addEventListener('keyup', e => {
                if (e.key === "Control") {
                     this.image= document.getElementById("playerImage")
                     this.width=200;
                     this.height=200;
                     this.maxFrame=8;
                     this.fps=20;
                     this.weight=1;
                     masha=false;

                     
                     
                }     
            });
            
        }
        

        draw(context) {
            if (debug) { context.strokeRect (this.x, this.y, this.width, this.height);} 
            context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
        }

        update(input, deltaTime, enemies) {
            this.checkCollision();
            // //Обнаружение столкновений
            // enemies.forEach( enemy => {
            //     const dx= (enemy.x+ enemy.width/2) - (this.x +this.width/2);
            //     const dy= (enemy.y+ enemy.height/2) - (this.y + this.height/2);
            //     const distance = Math.sqrt (dx*dx+dy*dy);
            //     if (distance < enemy.width/2 + this.width/2) {
            //         gameOver = true;
            //     }
            // })

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
            } else {
                this.vy=0;
            }
            if (this.y > this.gameHeight - this.height) { // Чтоб персонаж никогда не проваливался ниже отметки игры
                this.y=this.gameHeight-this.height;
            }

        }

        onGround() { //Метод для проверки находится ли персонаж в воздухе или на земле. Если true, то на земле. False-в воздухе.
            return this.y >= this.gameHeight - this.height;
        }

        checkCollision(){
            enemies.forEach( enemy => {
                if (
                    enemy.x < this.x + this.width &&
                    enemy.x + enemy.width > this.x &&
                    enemy.y < this.y + this.height &&
                    enemy.y +enemy.height > this.y
                ) {
                    enemy.markedForDeletion = true;
                    score++;
                }
            })
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
            if (debug) { context.strokeRect (this.x, this.y, this.width, this.height);}
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
    let enem= new Enemy( canvas.width, canvas.height);

    let lastTime=0;
    let enemyTimer =0;
    let enemyInterval =1000;
    let randomEnemyInterval= Math.random() *1000 +500;
    
    function animate(timeStamp) {
        const deltaTime= timeStamp- lastTime;
        lastTime= timeStamp;
        ctx.clearRect (0, 0, canvas.width, canvas.height);
        background.draw(ctx); //Сначала нарисовала фон
        if (masha) {
            // requestAnimationFrame(animate)
            createParticle();
            handleParticles();
            
        };
        player.draw(ctx);
        // background.update();
        player.update(input, deltaTime, enemies);
        handleEnemies(deltaTime);
        displayStatustext(ctx);
        if (!gameOver) requestAnimationFrame(animate);
        // if (masha) {
        //     // requestAnimationFrame(animate)
        //     createParticle();
        //     handleParticles();
            
        // };
    }
    animate(0);

    // function animate2(timeStamp) {
    //     const deltaTime= timeStamp- lastTime;
    //     lastTime= timeStamp;
    //     ctx.clearRect (0, 0, canvas.width, canvas.height);
    //     background.draw(ctx); //Сначала нарисовала фон
    //     player.draw(ctx);
    //     createParticle();
    //     handleParticles();
    //     if (masha) requestAnimationFrame(animate2);
    // }

})