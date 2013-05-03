/*	Simple canvas demo

	HTML5 Tools Presentation, Develop Conference 2012
	Richard Hackett, Blitz Games Studios
*/


var simpleCanvas = {

	NUM_PLAYERS: 10,
	TURN_CHANCE: 0.01,
	player: [],	
	directions: [ {x: 1, y: 0}, {x: 0, y: 1}, {x: -1, y: 0}, {x: 0, y: -1} ],
	colours: [ '#ff0000', '#00ff00', '#0000ff', '#00ffff', '#ff00ff', '#ffff00', '#ffffff', '#ff7f00', '#7fff00', '#00ff7f', '#007ffff' ],
	
	width: 0,
	height: 0,

	
	// Initialise demo, called once on page load
	init: function () {
		// Add event to kick off script when slide becomes active
		document.addEventListener( 'demo-simplecanvas', this.activateEvent.bind(this), false );
	},

	
	// Callback for slide initialisation event
	activateEvent: function () {
		console.log('demo-simplecanvas event');
	
		// If slide has become active, initialise demo
		var canvas = document.getElementById('demo-simplecanvas');
		var slide = findElementSlide(canvas);
		if (isActiveSlide(slide)) {
			this.reset(canvas);
		}
	},

	
	// Reset demo when slide becomes active
	reset: function (canvas) {
		var p;
		
		console.log('demo-simplecanvas started');

		this.canvas = canvas;
		this.width = canvas.width;
		this.height = canvas.height;
		this.context = this.canvas.getContext("2d");
		this.slide = findElementSlide(this.canvas.parentElement);

		for (p = 0; p < this.NUM_PLAYERS; p++) {
			this.player[p] = {
				x: Math.random() * this.width, 
				y: Math.random() * this.height,
				direction: 0
			};
		}
	
		this.context.clearRect(0,0, this.width,this.height);
		this.context.fillStyle = 'rgba(0,0,0, 0.2)';
		this.context.fillRect(0,0, this.width,this.height);
		this.frame();
	},


	// Demo frame update 
	frame: function() {
//		console.log('demo-simplecanvas frame');

		var p, currentPlayer, nextPos;
	
		// Frame update
		
		for (p = 0; p < this.NUM_PLAYERS; p++) {
			currentPlayer = this.player[p];
			
			nextPos = {
				x: currentPlayer.x + this.directions[currentPlayer.direction].x * 2,
				y: currentPlayer.y + this.directions[currentPlayer.direction].y * 2
			};
			
			if ((Math.random() < this.TURN_CHANCE) || 
				(nextPos.x < 0) || (nextPos.x > this.width) ||
				(nextPos.y < 0) || (nextPos.y > this.height)) {
				currentPlayer.direction = (currentPlayer.direction + 1) % 4;
				nextPos = {
					x: currentPlayer.x + this.directions[currentPlayer.direction].x * 2,
					y: currentPlayer.y + this.directions[currentPlayer.direction].y * 2
				};
			}
			
			currentPlayer.x = nextPos.x;
			currentPlayer.y = nextPos.y;
		}
	
		// Frame render
//		this.context.clearRect(0,0, this.width,this.height);

		for (p = 0; p < this.NUM_PLAYERS; p++) {
			currentPlayer = this.player[p];
			this.context.fillStyle = this.colours[p];
			this.context.fillRect(currentPlayer.x,currentPlayer.y, 2,2);
		}
			
		// Queue next frame if slide still active
		if (isActiveSlide(this.slide)) {
			window.requestAnimationFrame(this.frame.bind(this), this.canvas);
		}
		else {
			console.log('demo-simplecanvas stopped');
		}
	}


};




