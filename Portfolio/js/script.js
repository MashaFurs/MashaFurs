
gsap.registerPlugin(ScrollTrigger, ScrollSmoother)




if (window.matchMedia("(min-width:769px)").matches) {

    let masha = window.innerWidth;
    console.log(masha)

    gsap.fromTo('.content', { opacity: 1 }, {
		opacity: 0,
		scrollTrigger: {
			trigger: '.content',
			start: 'center',
			end: window.innerWidth <= 1083 ? '1000' : '600',
			scrub: true
		}
	})

    gsap.fromTo('.education', { opacity: 1 }, {
		opacity: 0,
		scrollTrigger: {
			trigger: '.education',
			start: 'center',
			end: '740',
			scrub: true
		}
	})


    const tl = gsap.timeline()

    tl.fromTo ( 
        '.hero_name',
        {
            x: -150,
            opacity: 0,
        },
        {
            x: 0,
            opacity: 1,
            duration: 1,
        }).fromTo(
            '.hero_describe',
        {
            y: 50,
            opacity: 0,
        },
        {
            y: 0,
            opacity: 1,
            duration: 0.7,
        },
        0.6
        ).fromTo(
            '.btnCV',
        {
            y: 20,
            opacity: 0,
        },
        {
            y: 0,
            opacity: 1,
            duration: 1,
        },
        1.1
        ).fromTo(
            '.star',
        {
            scale: 0,
            opacity: 0,
        },
        {
            scale: 1,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
        },
        1
        )

    //Hero scroll animation


    gsap.to('.content', {
        scrollTrigger: {
            trigger:'.main',
            start: 'top top',
            scrub: true,
        },
        y:200,
    })

    gsap.to('.content-text', {
        scrollTrigger: {
            trigger:'.main',
            start: 'top top',
            scrub: true,
        },
        y:100,
    })

    //Анимация блока skills

    gsap.from('.variant', {
        scrollTrigger: {
            trigger: '.skills one',
            start: 'top top',
            
        },
        scale: 0,
        transformOrigin: 'top center',
        ease: 'none',
        stagger:0.6,
    })

     //Анимация education

     gsap.to( '.education-foto', {
        scrollTrigger: {
            trigger: '.education-foto',
            start: 'top top',
            scrub: true,
        },
        y: 150,
     })

     gsap.to( '.education-blocks', {
        scrollTrigger: {
            trigger: '.education-blocks',
            start: 'top top',
            scrub: true,
        },
        y: -200,
     })


    
}


function submitForm() {
    
    let form = document.getElementById('form');
    let inputs = document.querySelectorAll('._req');
    let isValid = true;

    for( let i=0; i<inputs.length; i++) {
        let input= inputs[i];

        if( input.type === "text" && !/\S+/.test(input.value) ||
            input.type === "email" && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(input.value) ||
            input.type === "textarea" && !/\S+/.test(input.value)) {
                input.classList.add('_error');
                isValid = false;
            } else {
                input.classList.remove('_error');
            }
    }

    if (!isValid) {
            return;
           }


    //Отправка формы через Formspare
     let xhr = new XMLHttpRequest();
     xhr.open(form.method, form.action);
     xhr.setRequestHeader("Accept", "application/json");
     xhr.onreadystatechange = function () {
        if (xhr.readyState !== XMLHttpRequest.DONE) return;
        if (xhr.status === 200) {
            form.submit();
            form.reset();
        } else {
            console.error('Произошла ошибка');
        }
     }
     xhr.send( new FormData(form));
}


function changeMapLanguage() {
    const mapIframe = document.querySelector('iframe');
    mapIframe.contentWindow.postMessage('{"event":"command","func":"setOptions","args":[{"language":"en"}]}', '*');
}
window.addEventListener('load', changeMapLanguage);


const menu = document.querySelector('.menu_body');
const menuBtn = document.querySelector('.menu_icon');
const socialBurger = document.querySelector('.social_burger');
const borderBurger = document.querySelector('.points');
const circleBurgOne = document.querySelector('.circleBurgOne');
const circleBurgTwo = document.querySelector('.circleBurgTwo');

const body = document.body;

if (menu && menuBtn) {

    menuBtn.addEventListener('click', () => {
        menu.classList.toggle('active');
        menuBtn.classList.toggle('active');
        socialBurger.classList.toggle('active');
        borderBurger.classList.toggle('active');
        circleBurgOne.classList.toggle('active');
        circleBurgTwo.classList.toggle('active');

        body.classList.toggle('lock');
    })

    menu.querySelectorAll('.menu_link').forEach( link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
            menuBtn.classList.remove('active');
            socialBurger.classList.remove('active');
            borderBurger.classList.remove('active');
            circleBurgOne.classList.remove('active');
            circleBurgTwo.classList.remove('active');

            body.classList.remove('lock');
        })
    })
}
