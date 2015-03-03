var animatequeue;
var colorqueue;
var color = 0;
var $body;
var collision = false;


$(document).ready(function(){
    var $blockman = $('#blockman');
    var dfromground;
   jump($blockman);
   changecolor($blockman, colorqueue);
   generateblock();
   setInterval(function(){
       $('div.jumpblock').each(function(){
       leftcollide($blockman, $(this));
        });
    }, 50);
    setInterval(function(){
        dfromground = $('#ground').position().top - ($blockman.position().top + $blockman.height());
        $body = $('body');
        if (dfromground  >  1 && !animatequeue){
            $blockman.stop(true).animate({bottom: '-=7px'}, {duration: 1, queue: true, easing: 'linear'});
        }
        else if (dfromground <= 10){
            $body.append($('<div>', {class: 'youlose'}));
        }
        else{
            return;
        }
    }, 1);
});


function jump(character){
    $(document).keyup(function(keypressed){
        var key = keypressed.which;
        if (key == 38 && character.position().top > 0){
            animatequeue = true;
            character.animate({bottom: '+=150px', }, {duration: 300, queue: false, easing: 'easeOutCubic'}, window.setTimeout(function(){animatequeue = false}, 300));
            
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
                character.animate({backgroundColor: 'blue'}, {duration: 30, queue: false});
                break;
            case 1:
                character.animate({backgroundColor: 'red'}, {duration: 30, queue: false});
                break;
            case 2:
                character.animate({backgroundColor: 'yellow'}, {duration: 30, queue: false});
            }
            window.setTimeout(function(){queue = false}, {duration: 30, queue: false});
    });
}

function generateblock(){
    setInterval(function(){
        if (Math.random() > 0.3){
            var $div = $("<div>", {class: "jumpblock"});
            $body.append($div);
            $div.css('right', '-200px').animate({right: '100vw'}, 3000, 'linear');
            window.setTimeout(function(){$div.remove(0)}, 3000);
        }
    }, 1300+Math.random()*1000);
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
        collision = true;
    }
}