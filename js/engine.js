var animatequeue;
var colorqueue;
var color = 0;
var $body;
var $game;


$(document).ready(function(){
    var $blockman = $('#blockman');
    $body = $('body');
    $game = $('#game');
   slide($blockman, animatequeue);
   jump($blockman, animatequeue);
   changecolor($blockman, colorqueue);
   generateblock();
    scrollBackground();
    
   setInterval(function(){
       $('div.obstacle').each(function(){
       leftcollide($blockman, $(this));
        });
    }, 150);
});

function slide(character, queue){
    $(document).keyup(function(keypressed){
        var key = keypressed.which;
        if (key == 40 && !queue){
            queue = true;
            character.animate({width: '120px', height: '50px'}, 100).delay(500)
            .animate({width: '100px', height: '100px'}, 100);
            window.setTimeout(function(){queue = false}, 800);
            
        }
        else if(queue){
            return;
        }
    });
}

function jump(character, queue){
    $(document).keyup(function(keypressed){
        var key = keypressed.which;
        if (key == 38 && !queue){
            queue = true;
            character.animate({bottom: '300px', height: '110px', width: '80px'}, 200).delay(300)
            .animate({bottom: '58px', height: '100px', width: '100px'}, 250);
            window.setTimeout(function(){queue = false}, 800);
        }
        else if(queue){
            return;
        }
    });
}

function changecolor(character, queue){
    $(document).keyup(function(keypressed){
        var key = keypressed.which;
        if (queue){
            return;
        }
        else if ( key == 39 && !queue){
            queue = true;
            color = (color + 1) % 3;
        }
        else if (key == 37 && !queue){
            queue = true;
            color = (color + 2) % 3;
        }
        switch(color){
            case 0:
                character.animate({backgroundColor: '#11edff'}, {duration: 30, queue: false});
                break;
            case 1:
                character.animate({backgroundColor: '#8e00ac'}, {duration: 30, queue: false});
                break;
            case 2:
                character.animate({backgroundColor: 'yellow'}, {duration: 30, queue: false});
            }
            window.setTimeout(function(){queue = false}, {duration: 30, queue: false});
    });
}

function generateblock(){
    var ran;
    var $jumpblock = $("<div>", {class: "obstacle jumpblock"});
    var $slideblock = $("<div>", {class: "obstacle slideblock"});
    
    setInterval(function(){
        ran = Math.random();
        if (ran < 0.33){
            $game.append($jumpblock);
            $jumpblock.css('right', '-200px').animate({right: '100vw'}, 3000, 'linear', function(){
                $(this).remove();
            });
        }
        else if (0.67 > ran && ran > 0.33){
            $game.append($slideblock);
            $slideblock.css('right', '-200px').animate({right: '100vw'}, 3000, 'linear', function(){
              $(this).remove();  
            });
        }

    }, 800+Math.random()*1000);
}

function leftcollide(elem1, elem2){
    var pos1 = elem1.position();
    var pos2 = elem2.position();
    var width1 = elem1.width();
    var width2 = elem2.width();
    var height1 = elem1.height();
    var height2 = elem2.height();
    var bottomright1 = [pos1.left + width1, pos1.top + height1];
    
    
    if (bottomright1[0] > pos2.left && bottomright1[1] > pos2.top && bottomright1[0] < pos2.left + width2){
        console.log("collision");
    }
}

function scrollBackground(){
    var x =0;
    window.setInterval(function(){
        $('#ground').css('backgroundPosition', x + 'px');
        x-=5;
    }, 10);
}