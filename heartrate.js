window.onkeyup = function(e) {
  // e.stopPropagation();
  e.preventDefault();
  tick();
};

var	heartMonitor = function() {
	// Private vars
	var lastTickAt = 0;
	var deltas = [];

	var	now	= function() {
		return (new Date()).getTime(); 
	}; 
 
	// Public methods
	this.tick = function() {
    if (lastTickAt == 0) { lastTickAt = now(); return; }  // first click
    var delta = now() - lastTickAt; 
    // check if this delta is too different from last delta; if so restart
    var fudgefactor = 3
    var lastDelta = deltas[deltas.length-1]
    if ( Math.abs(delta - lastDelta) > fudgefactor * Math.min(delta, lastDelta) ) { 
    	deltas = []; 
    	lastTickAt = now();
    	return;
    }
    lastTickAt = now();
    deltas.push(delta);
    if (deltas.length > 10) deltas.shift();
	  // console.log(deltas);
	};

	this.rate = function() {
		if (deltas.length == 0) { return '--'; };
		var sum = deltas.reduce(function(a, b) { return a + b; });
    var avg = sum / deltas.length;
		return Math.round(60 * 1000 / avg) + " bpm";
	}
};

var monitor = new heartMonitor();

function init() {
	$rate = document.getElementById('rate');
}

function tick() {
	monitor.tick();
	$rate.innerHTML = monitor.rate();
}
