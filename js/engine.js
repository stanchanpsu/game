$(document).ready(function(){
   var $blockman = $('#blockman');
   var animatequeue;
  slide($blockman, animatequeue);
   jump($blockman, animatequeue);
});

function slide(character, queue){
    $(document).keypress(function(keypressed){
        var key = keypressed.which;
        if (key == 97 && !queue){
            queue = true;
            character.animate({width: '150px', height: '50px'}, 100).delay(500)
            .animate({width: '100px', height: '100px'}, 100);
            window.setTimeout(function(){queue = false}, 800);
        }
        else if(queue){
            return;
        }
    });
}

function jump(character, queue){
    $(document).keypress(function(keypressed){
        var key = keypressed.which;
        if (key == 32 && !queue){
            queue = true;
            character.animate({bottom: '300px'}, 100).delay(150)
            .animate({bottom: '60px'}, 150);
            window.setTimeout(function(){queue = false}, 300);
        }
        else if(queue){
            return;
        }
    });
}