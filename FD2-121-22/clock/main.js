function createWatch () {
            
    let widthBig=parseInt((document.querySelector('input[type="text"]')).value); //Положила значение инпута в переменную

    document.querySelector("input").style.display="none";//Отключаю инпут и ниже кнопку
    document.querySelector(".btn").style.display="none";

    let clock=document.createElement("div");//Создала див(тело часов)
    clock.className="clock";
    document.querySelector("body").appendChild(clock);
    clock.style.width=widthBig+"px"; //Сделала ширину тела часов такую же, как и введенное значение
    clock.style.height=widthBig+"px";

    let degr1=0; //Создала переменную для градусов дивов
    let degr2=360;//Создала переменную для градусов p

        for(let i=0; i<=11;i++) {  //Рисую циферблат. С помощью цикла создаю 12 дивов, куда буду записывать числа циферблата

            let div=document.createElement("div");
            div.className="circle";
            clock.appendChild(div);
            div.style.cssText=`transform: rotate(${degr1}deg)`; //Добавила каждому диву свойство трансформ ротейт, которое на каждой иттерации увеличивается на 30 градусов. 
            div.style.width=widthBig/10+"px"; //Установила ширину дива
            div.style.height=widthBig/10+"px";
            div.style.top=widthBig/50+"px";
            div.style.left=(widthBig/2)-(widthBig/20)+"px";
            div.style.fontSize=(widthBig/10)-10+"px";
            div.style.WebkitTransformOrigin = (widthBig/20-3)+"px"+" "+(widthBig/2-10)+"px";
            degr1+=30;//увеличиваю градусы на 30


            let p=document.createElement("p");
            div.appendChild(p);
            p.textContent=i;
                if(i==0) {  //чтоб на самой первой иттерации вместо цифры 0 было 12
                    p.textContent=12;
                }
            p.style.cssText=`transform: rotate(${degr2}deg)`;
            degr2-=30; //Уменьшаю градусы на 30
        }

//Создаю стрелки
    let arrows=document.createElement("div"); //Создала контейнер для стрелок
    arrows.className="arrows";
    clock.appendChild(arrows);

    let hour=document.createElement("div");//Создала стрелку часов
    hour.className="hour";
    arrows.appendChild(hour);
    hour.style.width=(widthBig/25)-5+"px";
    hour.style.height=(widthBig/4)+5+"px";

    let minutes=document.createElement("div");//Создала стрелку минут
    minutes.className="minutes";
    arrows.appendChild(minutes);
    minutes.style.width=widthBig/50+"px";
    minutes.style.height=(widthBig/2.9)+"px";

    let sec=document.createElement("div");//Создала стрелку секунд
    sec.className="sec";
    arrows.appendChild(sec);
    sec.style.width=widthBig/100+"px";
    sec.style.height=(widthBig/2)-50+"px";

//Создаю панель со временем на часах
    let panel=document.createElement("div");
    panel.className="panel";
    clock.appendChild(panel);
    panel.style.fontSize=(widthBig/10)+4+"px";
    panel.style.width=(widthBig/2)-50+"px";
    panel.style.height=widthBig/10+"px";

//Запускаю стрелки часов и табло
    let deg=6;
    setInterval( ()=>{
        let date= new Date();//Положила в переменную настоящую дату и время
        let h=date.getHours()*30; //Положила в переменную угол поворота часовой стрелки
        let m=date.getMinutes()*deg; //Положила в переменную угол поворота минутной стрелки
        let s=date.getSeconds()*deg; //Угол поворота стрелки

        hour.style.transform=`rotate(${(h)+(m/12)}deg)`; //Повернула часовую стрелку. Добавила(m/12),чтоб часовая стрелка постоянно изменялась(каждую минуту)
        minutes.style.transform=`rotate(${m}deg)`; //Повернула минутную стрелку
        sec.style.transform=`rotate(${s}deg)`; //Повернула минутную стрелку

        panel.innerHTML=(new Date()).toLocaleTimeString();//Установила в панели текущее время
    })
    }