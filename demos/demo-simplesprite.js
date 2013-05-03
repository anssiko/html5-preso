/*	Simple sprite demo

	HTML5 Tools Presentation, Develop Conference 2012
	Richard Hackett, Blitz Games Studios
*/


var simpleSprite = {
	
	width: 0,
	height: 0,
	
	NUM_BALLS: 20,
	BALL_WIDTH: 100,
	BALL_FRAMES: 6,
	BALL_ANIMSPEED: 6,
	balls: [],
	ballWidth: 0,
	ballHeight: 0,

	
	// Initialise demo, called once on page load
	init: function () {
		// Add event to kick off script when slide becomes active
		document.addEventListener( 'demo-simplesprite', this.activateEvent.bind(this), false );
	},

	
	// Callback for slide initialisation event
	activateEvent: function () {
		console.log('demo-simplesprite event');
	
		// If slide has become active, initialise demo
		var canvas = document.getElementById('demo-simplesprite');
		var slide = findElementSlide(canvas);
		if (isActiveSlide(slide)) {
			this.reset(canvas);
		}
	},

	
	// Reset demo when slide becomes active
	reset: function (canvas) {
		var b, angle;
		
		console.log('demo-simplesprite started');

		this.canvas = canvas;
		this.width = canvas.width;
		this.height = canvas.height;
		this.context = this.canvas.getContext("2d");
		this.slide = findElementSlide(this.canvas.parentElement);
		this.ballSprite = document.getElementById('demo-sprite');
		this.ballWidth = this.BALL_WIDTH;
		this.ballHeight = this.ballSprite.height;

		for (b = 0; b < this.NUM_BALLS; b++) {
			angle = Math.random() * Math.PI * 2;
			this.balls[b] = {
				x: Math.random() * (this.width-this.ballWidth), 
				y: Math.random() * (this.height-this.ballHeight),
				frame: 0,
				animFrame: Math.floor(Math.random() * (this.BALL_FRAMES - 1))
			};
		}

		this.frame();
	},


	// Demo frame update 
	frame: function() {
//		console.log('demo-simplesprite frame');

		var b, currentBall, nextPos;
	
		// Frame update
		for (b = 0; b < this.NUM_BALLS; b++) {
			currentBall = this.balls[b];

			currentBall.x = (b * (this.width/this.NUM_BALLS) * 0.8);
			currentBall.y = this.height - ((this.height * 0.67) * Math.sin(((b/10)+(currentBall.frame/40))%Math.PI) ) - this.ballHeight;
			
			currentBall.frame += 1;
			if ((currentBall.frame % this.BALL_ANIMSPEED) == 0) {
				currentBall.animFrame = (currentBall.animFrame + 1) % this.BALL_FRAMES;
			}
		}

	
		// Frame render
		this.context.clearRect(0,0, this.width,this.height);
		this.context.fillStyle = 'rgba(0,0,0, 0.2)';
		this.context.fillRect(0,0, this.width,this.height);
		for (b = 0; b < this.NUM_BALLS; b++) {
			this.context.drawImage(this.ballSprite,
					       this.balls[b].animFrame * this.ballWidth, 0,
					       this.ballWidth, this.ballHeight,
					       this.balls[b].x, this.balls[b].y,
					       this.ballWidth, this.ballHeight);
		}
			
		// Queue next frame if slide still active
		if (isActiveSlide(this.slide)) {
			window.requestAnimationFrame(this.frame.bind(this), this.canvas);
		}
		else {
			console.log('demo-simplesprite stopped');
		}
	}


};


