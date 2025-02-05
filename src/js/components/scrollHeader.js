import $ from 'jquery';

export function scrollHeader() {
    
    $(window).scroll(function(){
        if($(window).scrollTop() > 54) {
            setTimeout(function(){
                $(".header__topline").addClass("hidden");
            },300)
            
        }else if($(window).scrollTop() < 30){
            setTimeout(function(){
                $(".header__topline").removeClass("hidden");
            },300)
            
        }
    });
}
scrollHeader();
