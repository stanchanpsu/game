var animatequeue = false;
var color = 0;
var $body;
var $game;
var $ceiling;
var $ground;
var $blockman;
var bottom;
var grav = 1;

var groundHeight;
var ceilingHeight;

$(document).ready(function(){
	$body = $('body');
	$game = $('#game');
	$ceiling = $('#ceiling');
	$ground = $('#ground');
	$blockman = $('#blockman');

	//engine functions
	jump();
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
			collide($blockman, $(this));
//			console.log($blockman.position().top);
			
        });
	}, 150);
});
//
//function slide(character, queue){
//	$(document).keyup(function(keypressed){
//		var key = keypressed.which;
//		if (key == 40 && !queue){
//			queue = true;
//			character.animate({width: '120px', height: '50px'}, 100).delay(500)
//				.animate({width: '100px', height: '100px'}, 100);
//			window.setTimeout(function(){queue = false;}, 800);
//		}
//		else if(queue){
//			return;
//		}
//	});
//}

function jump(){
    $(document).keyup(function(keypressed){
        var key = keypressed.which;
		
        if (!animatequeue && key == 38 && grav === 1){
            
			animatequeue = true;
			
            $blockman.animate({top: '-=200px', height: '100px', width: '90px'}, {duration: 200, ease: 'easeOutQuad', complete: function(){
				$blockman.animate({top: groundHeight - $blockman.height(), height: '100px', width: '100px'}, 0.8*groundHeight , 'easeInQuad', function(){
					animatequeue = false;
				});
			}
			});
			
        }
		
		else if (!animatequeue && key == 38 && grav === 0){
            
			animatequeue = true;
			
            $blockman.animate({top: '+=200px', height: '100px', width: '90px'}, {duration: 200, ease: 'easeOutQuad', complete: function(){
				$blockman.animate({top: ceilingHeight, height: '100px', width: '100px'}, 0.8*groundHeight , 'easeInQuad', function(){
					animatequeue = false;
				});
			}
			});
			
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
	var prob;
	var blockid = 0;
    var $obstacle;
	var $coin;
    
    setInterval(function(){
		
		ran = Math.random();		
		grav === 1 ? prob = 0.4 : prob = 0.6;		
		
        if (ran < prob){
			$obstacle = $("<div>", {id: "upblock" + blockid, class: "obstacle"});
            $game.append($obstacle.css({'background-color': window.ranColor(), 'top': '133px'}));
            $obstacle.css('right', '-200px').animate({right: '100vw'}, 3000, 'linear', function(){
                $(this).remove();
            });
		blockid++;
			
		$coin = $('<div>', {id: "coin" + blockid, class: "coin"});
			$game.append($coin.css({'bottom': '133px'}));
			$coin.css('right', '-200px').animate({right: '100vw'}, 3000, 'linear', function(){
				$(this).remove();
			});
        }	
		
        if (ran > prob){
			$obstacle = $("<div>", {id: "downblock" + blockid, class: "obstacle"});
            $game.append($obstacle.css({'background-color': window.ranColor(), 'bottom': '133px'}));
            $obstacle.css('right', '-200px').animate({right: '100vw'}, 3000, 'linear', function(){
              $(this).remove();  
            });
        }
		else{
			return;
		}

    }, 700+Math.random()*1000);
}

function collide(elem1, elem2){
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
		
	window.setInterval(function(){
		
		blockbottom = thing.position().top + thing.height();	
		groundHeight = $ground.position().top;
		ceilingHeight = $ceiling.position().top + $ceiling.height();
		
		if(thing.queue().length === 0 && thing.position().top > ceilingHeight && grav === 0){
			thing.animate({top: ceilingHeight}, 0.8*groundHeight , 'easeInQuad');	
		}
		
		else if (thing.queue().length === 0 && blockbottom < groundHeight && grav === 1){
			thing.animate({top: groundHeight - thing.height()}, 0.8*groundHeight , 'easeInQuad');
		}
		
	}, 1);
}