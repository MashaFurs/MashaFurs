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
        
    });
