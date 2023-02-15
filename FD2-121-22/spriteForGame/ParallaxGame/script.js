
const canvas=document.getElementById('canvas1');
const ctx= canvas.getContext('2d');
const CANVAS_WIDTH=canvas.width=window.innerWidth;
const CANVAS_HEIGHT=canvas.height=window.innerHeight;
let gameSpeed=3;


const backgroundLayer1=new Image();
backgroundLayer1.src= "layer-1.png";
const backgroundLayer2=new Image();
backgroundLayer2.src= "layer-2.png";
const backgroundLayer3=new Image();
backgroundLayer3.src= "layer-3.png";

window.addEventListener("load", function() {
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
    
    const layer1=new layer(backgroundLayer1,0.2);
    const layer2=new layer(backgroundLayer2,0.4);
    const layer3=new layer(backgroundLayer3,1);
    
    const gameObjects= [layer1, layer2, layer3];
    
    function animate() {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        gameObjects.forEach( object => {
            object.update();
            object.draw();
        });
        requestAnimationFrame(animate);
    };
    animate();
    
});


