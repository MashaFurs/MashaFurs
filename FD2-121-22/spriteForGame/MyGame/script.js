window.addEventListener("load", function () {
    const canvas=document.getElementById("canvas1");
    const ctx =canvas.getContext("2d");
    const CANVAS_WIDTH=canvas.width=window.innerWidth;
    const CANVAS_HEIGHT=canvas.height=window.innerHeight;
    let gameSpeed=5;
    let enemies= [];
    let coins=[];
    let score=0;
    let gameOver=false;
    let masha=false;
    let lives=3;
    
    const audioCoin=document.createElement("audio"); //Звук собирания монеты
    audioCoin.src="audioCoin.ogg";
   
    const audioBomb=document.createElement("audio"); //Звук бомбы
    audioBomb.src="audioBomb.mp3";

    const minusLive=document.createElement("audio"); //Звук минус одной жизни
    minusLive.src="minusLive.mp3";

    const police=document.createElement("audio"); //Звук столкновения с полицейским 
    police.src="police.mp3";

    const audioBombPol=document.createElement("audio"); //Звук, когда бомба попадает в полицейского
    audioBombPol.src="audioBombPol.mp3";


    const backgroundLayer1=new Image();
    backgroundLayer1.src= "img/back/layer-1.png";
    const backgroundLayer2=new Image();
    backgroundLayer2.src= "img/back/layer-2.png";
    const backgroundLayer3=new Image();
    backgroundLayer3.src= "img/back/layer-3.png";

    let iconLevel=document.getElementById("iconLevel");
        let livesArray=[ 
            {
                img:iconLevel,
                x: 130,
                y:20,
            },
            {
                img:iconLevel,
                x: 165,
                y:20,
            },
            {
                img:iconLevel,
                x: 200,
                y:20,
            },
        ]


    class Inputhandler { // Класс обработчика нажатых клавиш
        constructor() {
            this.keys=[]; //Массив, который будет содержать информацию о том, какие клавиши нажаты в данный момент
            window.addEventListener('keydown', e => {
                if( (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "ArrowLeft" || e.key === "ArrowRight")  && this.keys.indexOf(e.key) === -1) { // При нажатии на клавишу, если она "стрелка вниз" или "вверх", или "влево", или "вправо" и ее нет в массиве keys, то тогда добавляем ее туда
                    this.keys.push(e.key);
                }
            });

            window.addEventListener('keyup', e => {
                if(e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "ArrowLeft" || e.key === "ArrowRight") {  // При отпускании клавиши, если она "стрелка вниз" или "вверх", или "влево", или "вправо", находим ее индекс в массиве и удаляем  ее одну
                    this.keys.splice(this.keys.indexOf(e.key), 1);
                }
            });
        }
    }


    // let particlesArray=[];

    // class Particle {
    //     constructor(x,y,size, player) {
    //         this.x=x;
    //         this.y=y;
    //         this.size=size;
    //         this.weight= Math.random() *300;
    //         this.directionX= Math.random() *300;
    //     }

    //     update() {
    //         this.y =(player.y+120)-this.weight;
    //         this.x =player.x+ this.directionX;
    //         if (this.size >=0.3) { this.size -=0.2};
            
    //     }

    //     draw() {
    //         ctx.beginPath();
    //         ctx.arc(this.x-50, this.y+100, this.size, 0, Math.PI *2);
    //         ctx.fillStyle="#05050578";
    //         // ctx.fillStyle="#000000ad";
    //         ctx.fill();
    //         // ctx.globalCompositeOperation='xor';
    //     }
    // }

    // function handleParticles () {
    //     for(let i=0; i<particlesArray.length; i++) {
    //         particlesArray[i].update();
    //         particlesArray[i].draw();
    //         if(particlesArray[i].size <=1) {
    //             particlesArray.splice(i,1);
    //             i--;
    //         }
    //     }
    // }

    // function createParticle() {
    //     let size= Math.random() * 45+10;
    //     let x= Math.random() * player.x;
    //     let y= player.y;
    //     particlesArray.push(new Particle(player.x,player.y,size));
    // }


    class Player {
        constructor (gameWidth, gameHeight) {
            this.gameWidth= gameWidth;
            this.gameHeight=gameHeight;
            this.width=356;
            this.height=390;
            this.image= document.getElementById("playerImage");
            this.x=0;
            this.y= this.gameHeight-this.height;
            this.frameX=0;
            this.maxFrame=6;
            this.frameY=0;
            this.fps=10;
            this.frameTimer=0;
            this.frameInterval= 1000/this.fps;
            this.speed=0;
            this.vy=0;
            this.weight=1; // Сила гравитации

            window.addEventListener('keydown', e => {
                if (e.key === "Control") { 
                    this.image= document.getElementById("round");
                    this.width=200;
                    this.height=170;
                    this.maxFrame=6;
                    this.fps=20;
                    this.weight=0.5;  
                    // gameSpeed=gameSpeed+5;
                    masha=true;
                    audioBomb.play();
                    audioBomb.loop=true;
                }     
            });

            window.addEventListener('keyup', e => {
                if (e.key === "Control") {
                     this.image= document.getElementById("playerImage")
                     this.width=356;
                     this.height=390;
                     this.maxFrame=6;
                     this.fps=10;
                     this.weight=1;
                    //  gameSpeed=gameSpeed-5;
                     masha=false;
                     audioBomb.currentTime=0;
                     audioBomb.pause();
                }     
            });
        }

        draw(context) { 

            context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
        }

        update(input, deltaTime, enemies) {

            //Обнаружение столкновений c полицейским

            if(!masha) { //Если сталивается с полицейским вор
                for(let n=0; n<enemies.length;n++) {
                    const dx= (enemies[n].x+ enemies[n].width/3) - (this.x +this.width/3);
                    const dy= (enemies[n].y+ enemies[n].height/3) - (this.y + this.height/3);
                    const distance = Math.sqrt (dx*dx+dy*dy);
                    if (distance < enemies[n].width/2.5 + this.width/2.5) {
                        // alert("убили полицейского");
                        if(livesArray.length==0) {
                            gameOver = true;
                            police.play();
                        }
                        if(!enemies[n].counted&&livesArray.length!=0) {
                            enemies[n].counted = true;
                            livesArray.pop();
                            // lives=lives-1;
                            enemies.splice (n,1);
                            minusLive.play();


                        }
                    }
                }
               }
       

           if(masha) { //Если сталивается с полицейским бомба
            for(let k=0; k<enemies.length;k++) {
                const dx= (enemies[k].x+ enemies[k].width/3) - (this.x +this.width/3);
                const dy= (enemies[k].y+ enemies[k].height/3) - (this.y + this.height/3);
                const distance = Math.sqrt (dx*dx+dy*dy);
                if (distance < enemies[k].width/2.5 + this.width/2.5) {
                    // alert("убили полицейского");
                    if(!enemies[k].counted) {
                        // score=score+10;
                        enemies[k].counted = true;
                        enemies.splice (k,1);
                        audioBombPol.play();
                    }
                }
            }
           }
            
     
            //Обнаружение столкновений с монетой
            for(let i=0; i<coins.length;i++) {
                const dx= (coins[i].x+ coins[i].width/2) - (this.x +this.width/2);
                const dy= (coins[i].y+ coins[i].height/2) - (this.y + this.height/2);
                const distance = Math.sqrt (dx*dx+dy*dy);
                if (distance < coins[i].width/2 + this.width/2) {
                    if(!coins[i].counted && !masha) {
                        score ++;
                        coins[i].counted = true;
                        coins.splice (i,1);
                        audioCoin.play();   

                        if(Number.isInteger(score/20) ) {
                             gameSpeed=gameSpeed+ 5;
                        }   

                        if(score==50) {
                            enemyInterval=5000;
                       }   
                       if(score==100) {
                            enemyInterval=4500;
                       } 
                       if(score==150) {
                            enemyInterval=3000;
                       }     
                    }  
                }

            }

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
                this.speed = 10;
            } else if(input.keys.indexOf("ArrowLeft") > -1) {
                this.speed = -6;
            } else if(input.keys.indexOf("ArrowUp") > -1 && this.onGround ()) { //Если нажата стрелка вверх и персонаж находится на земле
                this.vy-=24;
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
                // this.frameY =1; //Меняется картинка на прыжок
            } else {
                this.vy=0;
                this.maxFrame=5;
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


    class Background { //Создание параллакса фона
        constructor(image,speedModifier) {
            this.x=0;
            this.y=0;
            this.width=window.innerWidth;
            this.height=window.innerHeight;
            this.x2=this.width;
            this.image= image;
            this.speedModifier= speedModifier;
            this.speed=gameSpeed*this.speedModifier;
        }
    
        update() {
            this.speed=gameSpeed*this.speedModifier;
            if (this.x<= -this.width) {
                this.x=this.width+this.x2-this.speed;
            }
            if(this.x2<= -this.width) {
                this.x2=this.width+this.x-this.speed; 
            }
            this.x= Math.floor(this.x-this.speed);
            this.x2=Math.floor(this.x2-this.speed);
        }
    
        draw() {
            ctx.drawImage( this.image, this.x, this.y, this.width, this.height);
            ctx.drawImage( this.image, this.x2, this.y, this.width, this.height);
        }
    }


    class Enemy {
        constructor (gameWidth, gameHeight) {
            this.gameWidth=gameWidth;
            this.gameHeight=gameHeight;
            this.width=215;
            this.height=375;
            this.image=document.getElementById("enemyImage");
            this.x=this.gameWidth;
            this.y=this.gameHeight - this.height;
            this.frameX=0;
            this.maxFrame=4;
            this.fps=3;
            this.frameTimer=0;
            this.frameInterval= 1000/this.fps;
            this.speed=2;
            this.markedForDeletion= false;
            this.counted = false;
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
    

    class Coin {
        constructor (gameWidth, gameHeight) {
            this.gameWidth=gameWidth; 
            this.gameHeight=gameHeight;
            this.width=84;
            this.height=84;
            this.image=document.getElementById("coin");
            this.x=this.gameWidth;
            this.y=this.gameHeight - randomDiap (100,700);
            this.frameX=0;
            this.maxFrame=5;
            this.fps=10;
            this.frameTimer=0;
            this.frameInterval= 1000/this.fps;
            this.speed=2;
            this.counted = false;
        }

        draw(context) {
            // context.fillStyle= "white";
            // context.fillRect(this.x, this.y, this.width, this.height);
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
            }  
        }
    }


    function handleCoin(deltaTime) {
        if (coinTimer > coinInterval + randomCoinInterval) {
            coins.push (new Coin (canvas.width, canvas.height));
            coinTimer=0;
        } else {
            coinTimer+=deltaTime;
        }
        coins.forEach( enemy => {
            enemy.draw(ctx);
            enemy.update(deltaTime);
        });
    }

    function displayStatustext(context) {
       
        for(let f=0; f<livesArray.length; f++) {
            context.drawImage(livesArray[f].img, livesArray[f].x, livesArray[f].y);
        }

        context.fillStyle="black";
        context.font = "40px Helvetica";
        context.fillText ("Lives:",20, 50);
        context.fillStyle= "brown";
        context.fillText ("Lives:",22, 52);

        context.fillStyle="black";
        context.font = "40px Helvetica";
        context.fillText ("Score: "+score,20, 100);
        context.fillStyle= "brown";
        context.fillText ("Score: "+score,22, 102);

        if( gameOver) {
            context.textAlign = "center";
            context.fillStyle= "black";
            context.fillText ("GAME OVER, try again!", canvas.width/2, 100);
            context.fillStyle= "black";
            context.fillText ("GAME OVER, try again!", canvas.width/2+2, 102);    
        }
    }


    function randomDiap (n,m) { //Функция определения случайного числа, чтоб монеты располагались на разном расстоянии
        return Math.floor (
            Math.random() * (m-n+1)
        ) + n;
    }

    const input= new Inputhandler();
    const player = new Player (canvas.width, canvas.height);
    const layer1=new Background (backgroundLayer1,0.2);
    const layer2=new Background (backgroundLayer2,0.4);
    const layer3=new Background(backgroundLayer3,1);
    
    const gameObjects= [layer1, layer2, layer3];

    let lastTime=0;
    let enemyTimer =0;
    let enemyInterval =8000;
    let randomEnemyInterval= Math.random() *1000 +500;
    let coinTimer=0; 
    let coinInterval=1000;
    let randomCoinInterval= Math.random() *1000 +300;
    

    function animate(timeStamp) {
        const deltaTime= timeStamp- lastTime;
        lastTime= timeStamp;
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        gameObjects.forEach( object => {
            object.update();
            object.draw();
        });
        handleCoin(deltaTime);
        handleEnemies(deltaTime);
        player.draw(ctx);
        player.update(input, deltaTime, enemies);
        displayStatustext(ctx);
        if (!gameOver) requestAnimationFrame(animate);
    }

    animate(0);

})