"use strict";
//Паралакс главного меню
const canvas=document.getElementById('canvas1');
const ctx= canvas.getContext('2d');
const CANVAS_WIDTH=canvas.width=window.innerWidth;
const CANVAS_HEIGHT=canvas.height=window.innerHeight;
let gameSpeed=3;
let score;
let gameOver;

const mediaQuery = window.matchMedia('(max-width: 860px)');


const backgroundLayer1=new Image();
backgroundLayer1.src= "img/MainMenu/MainMenu1.png";
const backgroundLayer2=new Image();
backgroundLayer2.src= "img/MainMenu/MainMenu2.png";
const backgroundLayer3=new Image();
backgroundLayer3.src= "img/MainMenu/MainMenu3.png";

let udal=document.getElementById("city");



 function mainMenu() {
    class layer {
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
    
    const layer1=new layer(backgroundLayer1,0);
    const layer2=new layer(backgroundLayer2,0.5);
    const layer3=new layer(backgroundLayer3,0);
    
    
    const gameObjects= [layer1, layer2,layer3];
    
    function animate() {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        gameObjects.forEach( object => {
            object.update();
            object.draw();
        });
        requestAnimationFrame(animate);
    };
    animate();
    return;
};

//SPA

let IPage=document.getElementById("IPage");
//AJAX 
let firstname;
let sendBtn;
let userView;
let recordGame;

const URL='https://fe.it-academy.by/AjaxStringStorage2.php';
const NAME='FURS_07041995';

const REQUEST_TYPE={
    READ:'READ',
    LOCKGET:'LOCKGET',
    UPDATE:'UPDATE',
    INSERT:'INSERT',
};

    window.onhashchange = switchToStateFromURLHash;

    var SPAState = {};

    function switchToStateFromURLHash() {
        var URLHash = window.location.hash;

        var stateStr = URLHash.substring(1);
        console.log(stateStr);

        var pageHTML = "";

        let startGame=document.getElementById("start");
        let rulesGame=document.getElementById("rules");
        recordGame=document.getElementById("record");

        if(stateStr=="Main") {
            gameOver = true;
            mainMenu();
        }

        if(stateStr=="") {
            mainMenu();
            startGame.style.cssText=" display: block";
            rulesGame.style.cssText="  display: block";
            recordGame.style.cssText="  display: block";
        }

        if(stateStr=="Start") {
            gameArea();
        }


        switch (stateStr) {

            case 'Main':
                startGame.style.cssText=" display: block";
                rulesGame.style.cssText="  display: block";
                recordGame.style.cssText="  display: block";
                break;

            case 'Start':
                pageHTML+="<a class='btn' id='main1' onclick='switchToMainPage()'>Main</a>";
                startGame.style.cssText=" display: none";
                rulesGame.style.cssText=" display: none";
                recordGame.style.cssText=" display: none";
                break;

            case 'Rules':
                pageHTML += "<div class='wrapper'><div class='box'><p>Собирай монеты! Каждые 20 монет увеличивают скорость. Клавиша &#8593; прыжок вверх, &#8594; идешь направо, &#8592; налево.</p></div><div class='box'><p>Ускользай от полиции. Клавиша Ctrl-переход в состояние бомбы (убивает копов).Бомбой можно управлять. </p></div><div class='box'><p>У тебя 4 жизни. Если потратишь все-сядешь в тюрьму.</p></div></div>";
                pageHTML+="<a class='btn' id='main2' onclick='switchToMainPage()'>Главная</a>";
                startGame.style.cssText=" display: none";
                rulesGame.style.cssText=" display: none";
                recordGame.style.cssText=" display: none";
                break;

            case 'Record':
            pageHTML +="<div class='record'><div class='board'></div></div>"
            pageHTML+="<a class='btn' id='main3' onclick='switchToMainPage()'>Главная</a>";
            startGame.style.cssText=" display: none";
            rulesGame.style.cssText=" display: none";
            recordGame.style.cssText=" display: none";
            break;
        }
    document.getElementById('IPage').innerHTML = pageHTML;
    userView=document.querySelector(".board");
   
    }

    function switchToState(newState) {
        var stateStr = newState.pagename;
        location.hash = stateStr;
    }

    function switchToMainPage() {
        switchToState({ pagename: 'Main' });
    }
    function switchToStartPage() {
        switchToState({ pagename: 'Start' });
    }
    function switchToRulesPage() {
        switchToState({ pagename: 'Rules' });
    }
    function switchToRecordPage() {
        switchToState({ pagename: 'Record' });
    }

    switchToStateFromURLHash();

//Продолжение Ajax
//read
recordGame.addEventListener('click', async () => {
    const users = await request (REQUEST_TYPE.READ,NAME);
    users.sort(compareScore);
    console.log(users)
    render (users);
    console.log(users)
});

async function request (func,name,pass,val) {
    let sp=new URLSearchParams();
    sp.append('f', func);
    sp.append('n', name);
    pass && sp.append('p', pass);
    val && sp.append('v', val);

    try {
        const response= await fetch ( URL, { method:'POST', body: sp });
        const data = await response.json();

        if (data.result === 'OK') {
            document.location.reload();

            return;
        }
        return JSON.parse(data.result);
    } catch (err) {
        alert (err);
    }
}


function compareScore(a,b) {  //Отсортровали по убыванию
    return b.score-a.score;
}
function render (users) { //Вывели на доску
        let strLI='<h1>Топ-7 игроков:</h1>';
    
        users.forEach (user => {
            strLI+= `
            <p>Имя: ${user.firstName}-${user.score}</p>`
        });
        userView.innerHTML=strLI;
    }

    
function gameArea () {
    const canvas=document.getElementById("canvas1");
    const ctx =canvas.getContext("2d");
    const CANVAS_WIDTH=canvas.width=window.innerWidth;
    const CANVAS_HEIGHT=canvas.height=window.innerHeight;
    let gameSpeed=5;
    let enemies= [];
    let coins=[];
    score=0;
    gameOver=false;
    let masha=false;
    let lives=3;
    
    const audioCoin=document.createElement("audio"); //Звук собирания монеты
    audioCoin.src="audio/audioCoin.ogg";
   
    const audioBomb=document.createElement("audio"); //Звук бомбы
    audioBomb.src="audio/audioBomb.mp3";

    const minusLive=document.createElement("audio"); //Звук минус одной жизни
    minusLive.src="audio/minusLive.mp3";

    const police=document.createElement("audio"); //Звук столкновения с полицейским 
    police.src="audio/police.mp3";

    const audioBombPol=document.createElement("audio"); //Звук, когда бомба попадает в полицейского
    audioBombPol.src="audio/audioBombPol.mp3";


    const backgroundLayer1=new Image();
    backgroundLayer1.src= "img/GameArea/layer-1.png";
    const backgroundLayer2=new Image();
    backgroundLayer2.src= "img/GameArea/layer-2.png";
    const backgroundLayer3=new Image();
    backgroundLayer3.src= "img/GameArea/layer-3.png";

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
            this.touchY='';
            this.touchX='';
            this.touchTreshold =30; //Чтоб начальная точка и конечная находились на расстоянии не менее 30px друг от друга
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

            window.addEventListener('touchstart', e => {
                this.touchY= e.changedTouches[0].pageY;
                this.touchX= e.changedTouches[0].pageX; 
            });
            window.addEventListener('touchmove', e => {
                const swipeDistance=e.changedTouches[0].pageY -this.touchY;
                if( swipeDistance < -this.touchTreshold && this.keys.indexOf('swipe up') ===-1) { this.keys.push('swipe up')}
                else if(swipeDistance > this.touchTreshold && this.keys.indexOf('swipe down') ===-1) { this.keys.push('swipe down')} 

                const swipeDistanceX=e.changedTouches[0].pageX -this.touchX;
                if( swipeDistanceX < -this.touchTreshold && this.keys.indexOf('swipe right') ===-1) { this.keys.push('swipe right')}
                else if(swipeDistanceX > this.touchTreshold && this.keys.indexOf('swipe left') ===-1) { this.keys.push('swipe left')}
            });
            window.addEventListener('touchend', e => {
                // console.log(this.keys);
                this.keys.splice(this.keys.indexOf('swipe up') ,1);
                this.keys.splice(this.keys.indexOf('swipe down') ,1);

                this.keys.splice(this.keys.indexOf('swipe right') ,1);
                this.keys.splice(this.keys.indexOf('swipe left') ,1);
            });
        }
    }

    class Player {
        constructor (gameWidth, gameHeight, context) {
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

            if(mediaQuery.matches) {
                this.width=178;
                this.height=195; 
                this.image= document.getElementById("playerImageMedia"); 
                this.weight=1.8;
            }

            window.addEventListener('keydown', e => {
                if (e.key === "Control") { 
                    if(mediaQuery.matches) {
                        this.image= document.getElementById("roundMedia"); 
                        this.width=98;
                        this.height=85; 
                        this.weight=1;  
                    } else {
                        this.image= document.getElementById("round");
                        this.width=200;
                        this.height=170; 
                        this.weight=0.5;   
                    }
                    this.maxFrame=6;
                    this.fps=20;
                    masha=true;
                    audioBomb.play();
                    audioBomb.loop=true;
                }     
            });

            window.addEventListener('keyup', e => {
                if (e.key === "Control") {
                    if(mediaQuery.matches) {
                    this.width=178;
                    this.height=195; 
                    this.image= document.getElementById("playerImageMedia"); 
                    this.weight=1.8;
                    } else{
                    this.image= document.getElementById("playerImage")
                     this.width=356;
                     this.height=390;
                     this.weight=1;
                    }

                     this.maxFrame=6;
                     this.fps=10;
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
                        // if(livesArray.length==0) {
                        //     gameOver = true;
                        //     police.play();
                        //     gameEnd();

                            
                        // }
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
            } else if(input.keys.indexOf("swipe left") > -1){

                player.image= document.getElementById("roundMedia"); 
                player.width=98;
                player.height=85; 
                player.weight=1;
                player.maxFrame=6;
                player.fps=20;
                masha=true;
                audioBomb.play();
                audioBomb.loop=true;

            }else if(input.keys.indexOf("swipe right") > -1){

                player.image= document.getElementById("playerImageMedia"); 
                player.width=178;
                player.height=195; 
                player.weight=1.8;
                player.maxFrame=6;
                player.fps=10;
                masha=false;
                audioBomb.currentTime=0;
                audioBomb.pause();

            }else if((input.keys.indexOf("ArrowUp") > -1 || input.keys.indexOf("swipe up") > -1) && this.onGround ()) { //Если нажата стрелка вверх и персонаж находится на земле
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

    function gameEnd() {
        let divEnd=document.createElement("div");
        divEnd.className="divEnd";
        IPage.appendChild(divEnd);
        divEnd.innerHTML="<div class='bt' id='oneB'><a>Сохранить результат</a></div><div class='bt' id='twoB'><a>Начать заново</a></div>";
        let divEnd2=document.createElement("div");
        divEnd2.className="divEnd2";
        divEnd.appendChild(divEnd2);
        divEnd2.innerHTML=`<p>Ваш счет</p><p>${score}</p>`;

        let twoB=document.getElementById("twoB");
        twoB.addEventListener("click", () => {document.location.reload();}, false)

        let oneB=document.getElementById("oneB");
        oneB.addEventListener("click", () => { let saveHTML = "";
        saveHTML+="<div class='box2'><div class='divSaveWrap'><div class='saveInput'> <input type='text' name='firstname'></div><a id='registr'ф><span class='one'></span><span class='two'></span><span class='three'></span><span class='four'></span>Зарегистрироваться</a></div></div>"
        document.getElementById('IPage').innerHTML = saveHTML;
    
        firstname=document.querySelector('[name="firstname"]');
        sendBtn=document.getElementById('registr');
    
        let box2=document.querySelector(".box2");

        //update
    sendBtn.addEventListener('click', async () =>{
    const { value: firstName} = firstname;

    const user = {
        firstName,
        score
    };

    const updatePassword=Math.random ();
    const requestUsers=await request ( REQUEST_TYPE.READ, NAME);

    if(!requestUsers) {
        const res = [{...user}];

        await request (REQUEST_TYPE.LOCKGET, NAME, updatePassword);
        await request (REQUEST_TYPE.UPDATE, NAME, updatePassword, JSON.stringify(res));
    }
    else {
        requestUsers.push(user);
        await request ( REQUEST_TYPE.LOCKGET, NAME,updatePassword);
        await request(REQUEST_TYPE.UPDATE,NAME,updatePassword, JSON.stringify(requestUsers));
    }
});
        }, false)
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

            if(mediaQuery.matches) {
                this.width=108;
                this.height=188; 
                this.image= document.getElementById("enemyImageMedia"); 
                this.y=gameHeight-188;
            }
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

            if(mediaQuery.matches) {
                this.width=42;
                this.height=42; 
                this.image= document.getElementById("coinMedia"); 
                this.y=this.gameHeight - randomDiap (50,400);
            }
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



    //Медиаусловия

    // if(mediaQuery.matches) {
    //     player.width=178;
    //     player.height=195; 
    //     player.image= document.getElementById("playerImageMedia"); 

    // }

    

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
    return;
}

