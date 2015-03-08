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

var topran;
var bottomran;
var topprob;
var bottomprob;
var coinprob;
var blockid = 0;
var coinrowid = 0;
var coinid = 0;
var $obstacle;
var $coin;
var $coinrow;
var numcoin;

//colors

var yellow = '#f3ff11';
var blue = '#11edff';
var green = '#23ff11';
var pink = '#e811ff';

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
//	genCoin();
	
	$(document).keyup(function(keypressed){
		if(keypressed.which === 32){
			grav = (grav + 1) % 2;
		}
	});
	
	Gravity($blockman);
	
	setInterval(function(){
		$('div.obstacle').each(function(){
			collide($blockman, $(this));			
        });
//		console.log(grav);
//		$('div.coin').each(function(){
//			if ($(this).position().left <0){
//				$(this).remove;
//			}
//		})
	}, 150);
});

function jump(){
    $(document).keyup(function(keypressed){
        var key = keypressed.which;
		
        if (!animatequeue && key == 38 && grav === 1){
            
			animatequeue = true;
			
            $blockman.animate({top: '-=300px', height: '100px', width: '90px'}, {duration: 200, ease: 'easeOutQuad', complete: function(){
				$blockman.animate({top: groundHeight - $blockman.height(), height: '100px', width: '100px'}, 0.8*groundHeight , 'easeInQuad', function(){
					animatequeue = false;
				});
			}
			});
			
        }
		
		else if (!animatequeue && key == 38 && grav === 0){
            
			animatequeue = true;
			
            $blockman.animate({top: '+=300px', height: '100px', width: '90px'}, {duration: 200, ease: 'easeOutQuad', complete: function(){
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
			color = (color + 1) % 4;
		}
		else if (key == 37){
			color = (color + 3) % 4;
		}
		switch(color){
			case 0:
				$blockman.animate({backgroundColor: blue}, {duration: 30, queue: false});
				$ground.animate({backgroundColor: blue}, {duration: 30, queue: false});
				$ceiling.animate({backgroundColor: blue}, {duration: 30, queue: false});
				break;
			case 1:
				$blockman.animate({backgroundColor: pink}, {duration: 30, queue: false});
				$ground.animate({backgroundColor: pink}, {duration: 30, queue: false});
				$ceiling.animate({backgroundColor: pink}, {duration: 30, queue: false});
				
				break;
			case 2:
				$blockman.animate({backgroundColor: yellow}, {duration: 30, queue: false});
				$ground.animate({backgroundColor: yellow}, {duration: 30, queue: false});
				$ceiling.animate({backgroundColor: yellow}, {duration: 30, queue: false});
				break;
			case 3:
				$blockman.animate({backgroundColor: green}, {duration: 30, queue: false});
				$ground.animate({backgroundColor: green}, {duration: 30, queue: false});
				$ceiling.animate({backgroundColor: green}, {duration: 30, queue: false});
				break;
		}
	});
}

function generateblock(){
    
    setInterval(function(){
		
		topran = Math.random();	
		bottomran = Math.random();
		coinprob = Math.random();
		grav === 1 ? (topprob = 0.5, bottomprob = 0.65) : (topprob = 0.65, bottomprob = 0.5);		
		
		//generate top blocks
        if (topran < topprob){
			$obstacle = $("<div>", {id: "upblock" + blockid, class: "obstacle"});
            $game.append($obstacle.css({'background-color': window.ranColor(), 'top': '133px'}));
            $obstacle.css('right', '-200px').animate({right: '100vw'}, 3000, 'linear', function(){
                $(this).remove();
            });
		blockid++;
			
		}
		
		else if (topran > topprob && coinprob > 0.3){
			
			numcoin = window.ranInt(3,6);

			for(i = 0; i < numcoin; i++){
				$coin = $("<div>", {id: "coin" + coinid, class: "coin"});
				$coin.css({'top': '133px', 'left': $('body').width() + 200 - i*66 + "px"}).appendTo($game).animate({left: 0 - i*66 + 'px'}, 3000, 'linear', function(){
				$(this).remove();	
				});
				
				coinid++;

			}
		}

	}, 400+Math.random()*1000);
	
	setInterval(function(){
		
		//generate bottom blocks
        if (bottomran < bottomprob){
			$obstacle = $("<div>", {id: "downblock" + blockid, class: "obstacle"});
            $game.append($obstacle.css({'background-color': window.ranColor(), 'bottom': '133px'}));
            $obstacle.css('right', '-200px').animate({right: '100vw'}, 3000, 'linear', function(){
              $(this).remove();  
            });
        }
		else{
			return;
		}

    }, 400+Math.random()*1000);
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

function ranInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function ranColor(){
	switch(Math.floor(Math.random() * 4)){
		case 0:
			return green;
			break;
		case 1:
			return blue;
			break;
		case 2:
			return yellow;
			break;
		default:
			return pink;
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

String.prototype.repeat = function( num )
{
    return new Array( num + 1 ).join( this );
}
//
//function howManyCoins(){
//	
//	numcoin = ranInt(3,6);
//	var coinarray = [];
//
//	for (i = 0; i < numcoin; i++){
//		$coin = $("<div>", {id: "coin" + coinid, class: "coin"});
//		coinarray.push($coin);
//		coinid++;
//	}
//	
//	return(coinarray);
//}