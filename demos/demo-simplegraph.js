/*	Simple graph demo

	HTML5 Tools Presentation, Develop Conference 2012
	Richard Hackett, Blitz Games Studios
*/


var simpleGraph = {

	frameCount: 0,
	
	lineValues: [],
	d2: [[0, 3], [4, 8], [8, 5], [9, 13]],
	
	barSourceValues: [ [0,4.4], [0.5,5.0], [1,2.2], [1.5,3.4], [2,3.2], [2.5,2.5], [3,9.9], [3.5,4.2], [4,3.0],
			   [4.5,7.7], [5,4.4], [5.5,6.2], [6,6.1], [6.5,5.9], [7,2.3], [7.5,5.6], [8,5.3], [8.5,1.0] ],
	barValues: [],

	
	width: 0,
	height: 0,

	
	// Initialise demo, called once on page load
	init: function () {
		// Add event to kick off script when slide becomes active
		document.addEventListener( 'demo-simplegraph', this.activateEvent.bind(this), false );
	},

	
	// Callback for slide initialisation event
	activateEvent: function () {
		console.log('demo-simplegraph event');
	
		// If slide has become active, initialise demo
		var div = document.getElementById('demo-simplegraph');
		var slide = findElementSlide(div);
		if (isActiveSlide(slide)) {
			this.reset(div);
		}
	},

	
	// Reset demo when slide becomes active
	reset: function (div) {
		console.log('demo-simplegraph started');

		this.div = div;
		this.width = div.width;
		this.height = div.height;
		this.slide = findElementSlide(this.div);

		this.frameCount = 0;
		this.lineValues = [];
		this.barValues = [];
		
		this.frame();
	},


	// Demo frame update 
	frame: function() {
//		console.log('demo-simplecanvas frame');
	
		// Frame update
		for (var i = 0; i < 20; i += 1)
		    this.lineValues[i] = [i/2, 4.0 * Math.sin(i/2) + 5.0];
		
		if (this.barValues.length < this.barSourceValues.length) {
			this.barValues.push(this.barSourceValues[this.barValues.length]);
		}
		
		this.frameCount += 1;
	
		// Frame render
		$.plot($("#demo-simplegraph"), [ { data: this.lineValues, points: { show: true }, lines: { show: true }, label: "Audience Interest" },
						 { data: this.d2, label: "Content Value" },
						 { data: this.barValues, bars: { show: true, barWidth: 0.5 }, label: "Buzzwords" }
						] );

			
		// Queue next frame if slide still active
		if (isActiveSlide(this.slide)) {
			window.setTimeout(this.frame.bind(this), 100);
		}
		else {
			console.log('demo-simplegraph stopped');
		}
	}

};


