$(document).ready(function(){
    $('.slider').slick({
        slidesToShow: 3,
        responsive: [
            {
                breakpoint:715,
                settings:{
                    slidesToShow: 1,   
                }
            }
        ]
  
    });

    $('.menu-btn').on('click', function(e){
        e.preventDefault;
        $(this).toggleClass('menu-btn_active');
        $('.menu-nav').toggleClass('menu-nav_active');
    });


    const cards = document.querySelectorAll('.card');

for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    card.addEventListener('mousemove', startRotate);
    card.addEventListener('mouseout', stopRotate);
    
}


function startRotate(event) {
    const cardItem = this.querySelector('.photo-items');
    const halfHeight = cardItem.offsetHeight / 2;
    const halfWidth = cardItem.offsetWidth / 2;
    cardItem.style.transform = 'rotateX(' + - (event.offsetY - halfHeight) / 5 + 'deg) rotateY(' + (event.offsetX - halfWidth) / 5 + 'deg)';
}

function stopRotate(event) {
    const cardItem = this.querySelector('.photo-items');    
    cardItem.style.transform = 'rotate(0)';
}
        
    });
