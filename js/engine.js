var animatequeue = false;
var color = 0;
var coincount =0;
var counter;
var $game;
var $ceiling;
var $ground;
var $blockman;
var $counter;
var grav = 1;
var difficulty = 0;

var groundHeight;
var ceilingHeight;
var blockbottom;

var topran;
var bottomran;
var coinran;
var topprob;
var bottomprob;
var coinprob;
var blockid = 0;
var coinid = 0;
var $obstacle;
var $coin;
var numcoin;
var coin = 0;

//colors
var yellow = '#f3ff11';
var blue = '#11edff';
var green = '#23ff11';
var pink = '#e811ff';

var ar=new Array(33,34,35,36,37,38,39,40);

$(document).keydown(function(e) {
     var key = e.which;
      //console.log(key);
      //if(key==35 || key == 36 || key == 37 || key == 39)
      if($.inArray(key,ar) > -1) {
          e.preventDefault();
          return false;
      }
      return true;
});

$(document).ready(function(){
	$game = $('#game');
	$ceiling = $('#ceiling');
	$ground = $('#ground');
	$blockman = $('#blockman');
	$counter = $('#counter');

	//engine functions
	jump();
	changeColor();
	genBlocks();
	
	//switch gravity
	$(document).keyup(function(keypressed){
		if(keypressed.which === 32){
			grav = (grav + 1) % 2;
		}
	});	
	Gravity($blockman);
	
	//check for collisions with obstacles
	setInterval(function(){
		$('div.obstacle').each(function(){
			collide($blockman, $(this));			
        });
	}, 50);
	
	//check for collisions with coins
	setInterval(function(){  
		$('div.coin').each(function(){
			collide($blockman, $(this));
		});
	counter = new countUp("counter", coincount, coincount, 0, 10, {useGrouping: true, separator: ',',});
	counter.start();
	}, 50);
	
	setInterval(function(){
		if (difficulty <= 900){
		difficulty+=5;
		console.log(difficulty);
	}
	},10);
});

function jump(){
    $(document).keyup(function(keypressed){
        var key = keypressed.which;
		
		if (animatequeue){
			return;
		}
		
        if (!animatequeue && key == 38 && grav === 1){
            
			animatequeue = true;
			
            $blockman.animate({top: '-=120px'}, {duration: 120, ease: 'easeOutQuart', complete: function(){
				$blockman.delay(100).animate({top: groundHeight - 100}, 0.6*groundHeight , 'easeInQuad', function(){
					$(this).stop(true);
					animatequeue = false;
				});
			}
			});
			
        }
		
		else if (!animatequeue && key == 38 && grav === 0){
            
			animatequeue = true;
			
            $blockman.animate({top: '+=120px'}, {duration: 120, ease: 'easeOutQuart', complete: function(){
				$blockman.delay(100).animate({top: ceilingHeight}, 0.6*groundHeight , 'easeInQuad', function(){
					$(this).stop(true);
					animatequeue = false;
				});
			}
			});
			
        }
    });
}

function changeColor(){
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
				$counter.animate({color: blue}, {duration: 30, queue: false});
				break;
			case 1:
				$blockman.animate({backgroundColor: pink}, {duration: 30, queue: false});
				$ground.animate({backgroundColor: pink}, {duration: 30, queue: false});
				$ceiling.animate({backgroundColor: pink}, {duration: 30, queue: false});
				$counter.animate({color: pink}, {duration: 30, queue: false});
				
				break;
			case 2:
				$blockman.animate({backgroundColor: yellow}, {duration: 30, queue: false});
				$ground.animate({backgroundColor: yellow}, {duration: 30, queue: false});
				$ceiling.animate({backgroundColor: yellow}, {duration: 30, queue: false});
				$counter.animate({color: yellow}, {duration: 30, queue: false});
				break;
			case 3:
				$blockman.animate({backgroundColor: green}, {duration: 30, queue: false});
				$ground.animate({backgroundColor: green}, {duration: 30, queue: false});
				$ceiling.animate({backgroundColor: green}, {duration: 30, queue: false});
				$counter.animate({color: green}, {duration: 30, queue: false});
				break;
		}
	});
}

function genBlocks(){
    
	// generate top items
    setInterval(function(){
		
		topran = Math.random();	
		bottomran = Math.random();
		coinran = Math.random();
		grav === 1 ? (topprob = 0.5, bottomprob = 0.7, coinprob = 0.2) : (topprob = 0.7, bottomprob = 0.5, coinprob = 0.8);		
		
		//top obstacles
        if (topran < topprob){
			$obstacle = $("<div>", {id: "upblock" + blockid, class: "obstacle"});
            $game.append($obstacle.css({'background-color': window.ranColor(), 'top': '133px'}));
            $obstacle.css('right', '-200px').animate({right: '100vw'}, 3000, 'linear', function(){
                $(this).remove();
            });
		blockid++;
			
		}
		
		//top coins
		else if (topran > topprob && coinran > coinprob){
			
			numcoin = window.ranInt(3,6);

			for(var i = 0; i < numcoin; i++){
				$coin = $("<div>", {id: "coin" + coinid, class: "coin"});
				$coin.css({'top': '133px', 'left': $('body').width() + 200 - i*66 + "px"}).appendTo($game).animate({left: 0 - i*66 + 'px'}, 3000, 'linear', function(){
				$(this).remove();	
				});
				
				coinid++;

			}
		}

	}, 1000 - difficulty);
	
	//generate bottom items
	setInterval(function(){
		
		//bottom obstacles
        if (bottomran < bottomprob){
			$obstacle = $("<div>", {id: "downblock" + blockid, class: "obstacle"});
            $game.append($obstacle.css({'background-color': window.ranColor(), 'bottom': '133px'}));
            $obstacle.css('right', '-200px').animate({right: '100vw'}, 3000, 'linear', function(){
              $(this).remove();  
            });
        }
		
		else if (bottomran > bottomprob && coinran < coinprob){
			
			numcoin = window.ranInt(3,6);

			for(var i = 0; i < numcoin; i++){
				$coin = $("<div>", {id: "coin" + coinid, class: "coin"});
				$coin.css({'bottom': '133px', 'left': $('body').width() + 200 - i*66 + "px"}).appendTo($game).animate({left: 0 - i*66 + 'px'}, 3000, 'linear', function(){
				$(this).remove();	
				});
				
				coinid++;

			}
		}

    }, 1000 - difficulty);
}

function collide(elem1, elem2){
	
    var left1 = elem1.position().left;
    var right1 = left1 + elem1.width();
    var top1 = elem1.position().top;
    var bottom1 = top1 + elem1.height();
	var color1 = elem1.css('background-color');
	
	var left2 = elem2.position().left;
    // var right2 = left2 + elem2.width();
    var top2 = elem2.position().top;
    var bottom2 = top2 + elem2.height();
	var color2 = elem2.css('background-color');
   
    if (grav === 1 
		&& bottom1 > top2
		&& top1 < top2
		&& right1 > left2
		&& color1 != color2){
		
		if ( elem2.attr('class') === 'coin'){
			elem2.remove();
			coincount++;
		}
		
		else{
			elem2.remove();
		}
    }
	
	if (grav === 0 
			 && top1 < bottom2
			 && bottom1 > bottom2
			 && right1 > left2
			 && color1 != color2){
		
		if ( elem2.attr('class') === 'coin'){
			elem2.remove();
			coincount++;
		}
		
		else{
			elem2.remove();
		}
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
			thing.animate({top: ceilingHeight}, 0.6*groundHeight , 'easeInQuad');	
		}
		
		else if (thing.queue().length === 0 && blockbottom < groundHeight && grav === 1){
			thing.animate({top: groundHeight - thing.height()}, 0.6*groundHeight , 'easeInQuad');
		}
		
	}, 1);
}