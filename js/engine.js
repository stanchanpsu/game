var animatequeue;
var color = 0;
var $body;
var $game;
var $ceiling;
var $ground;
var $blockman;
var bottom;
var grav = 1;

$(document).ready(function(){
	$body = $('body');
	$game = $('#game');
	$ceiling = $('#ceiling');
	$ground = $('#ground');
	$blockman = $('#blockman');

	//engine functions
	slide($blockman, animatequeue);
	jump($blockman, animatequeue);
	changecolor();
	generateblock();
	scrollBackground();
	
	$(document).keyup(function(keypressed){
		if(keypressed.which === 32){
			grav = (grav + 1) % 2;
		}
	});
	
	Gravity($blockman);
	
	setInterval(function(){
		$('div.obstacle').each(function(){
			leftcollide($blockman, $(this));
//			console.log($blockman.position().top);
			
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
			window.setTimeout(function(){queue = false;}, 800);
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
            character.animate({bottom: '+=200px', height: '110px', width: '80px'}, {duration: 200, ease: 'easeOutQuad'})
//            .animate({bottom: '58px', height: '100px', width: '100px'}, 250);
            window.setTimeout(function(){queue = false;}, 800);
        }
        else if(queue){
            return;
        }
    });
}

function changecolor(){
	$(document).keyup(function(keypressed){
		var key = keypressed.which;
		if ( key == 39){
			color = (color + 1) % 3;
		}
		else if (key == 37){
			color = (color + 2) % 3;
		}
		switch(color){
			case 0:
				$blockman.animate({backgroundColor: '#11edff'}, {duration: 30, queue: false});
				$ground.animate({backgroundColor: '#11edff'}, {duration: 30, queue: false});
				$ceiling.animate({backgroundColor: '#11edff'}, {duration: 30, queue: false});
				break;
			case 1:
				$blockman.animate({backgroundColor: '#8e00ac'}, {duration: 30, queue: false});
				$ground.animate({backgroundColor: '#8e00ac'}, {duration: 30, queue: false});
				$ceiling.animate({backgroundColor: '#8e00ac'}, {duration: 30, queue: false});
				
				break;
			case 2:
				$blockman.animate({backgroundColor: 'yellow'}, {duration: 30, queue: false});
				$ground.animate({backgroundColor: 'yellow'}, {duration: 30, queue: false});
				$ceiling.animate({backgroundColor: 'yellow'}, {duration: 30, queue: false});
		}
	});
}

function generateblock(){
    var ran;
	var blockid = 0;
    var $obstacle;
    
    setInterval(function(){
		ran = Math.random();
        if (ran < 0.33){
			$obstacle = $("<div>", {id: "block" + blockid, class: "obstacle jumpblock"});
            $game.append($obstacle.css('background-color', window.ranColor()));
            $obstacle.css('right', '-200px').animate({right: '100vw'}, 3000, 'linear', function(){
                $(this).remove();
            });
		blockid++;
        }
        else if (0.67 > ran && ran > 0.33){
			$obstacle = $("<div>", {id: "block" + blockid, class: "obstacle slideblock"});
            $game.append($obstacle.css('background-color', window.ranColor()));
            $obstacle.css('right', '-200px').animate({right: '100vw'}, 3000, 'linear', function(){
              $(this).remove();  
            });
        }
		else{
			return;
		}

    }, 700+Math.random()*1000);
}

function leftcollide(elem1, elem2){
    var pos1 = elem1.position();
    var pos2 = elem2.position();
    var width1 = elem1.width();
    var width2 = elem2.width();
    var height1 = elem1.height();
    var height2 = elem2.height();
    var bottomright1 = [pos1.left + width1, pos1.top + height1];
    
    
    if (bottomright1[0] > pos2.left && bottomright1[1] > pos2.top && bottomright1[0] < pos2.left + width2 && elem1.css('background-color') != elem2.css('background-color')){
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

function ranInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function ranColor(){
	switch(Math.floor(Math.random() * 3)){
		case 0:
			return '#11edff';
			break;
		case 1:
			return '#8e00ac';
			break;
		case 2:
			return 'yellow';
			break;
		default:
			return '#11edff';
	}
}

function Gravity(thing){
	var fallAccel = 1;
	var groundHeight;
	var ceilingHeight;
	
		
	window.setInterval(function(){
		
		bottom = thing.position().top + thing.height();	
		groundHeight = $ground.position().top;
		ceilingHeight = $ceiling.position().top + $ceiling.height();
		
		if(thing.queue().length === 0 && thing.position().top > ceilingHeight && grav === 0){
			thing.animate({top: ceilingHeight}, 1.1*groundHeight , 'easeInQuad', function(){
			});	
		}
		
		else if (thing.queue().length === 0 && bottom < groundHeight && grav === 1){
			thing.animate({top: groundHeight - thing.height()}, 1.1*groundHeight , 'easeInQuad', function(){
			});	
		}
		
	}, 1);
}