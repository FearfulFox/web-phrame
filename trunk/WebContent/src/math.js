(function(){
	
	// A 2D math vector
	$.Math.Vec2D = function(x, y){
		this.set = function(x, y){
			x = x ? x : 0;
			y = y ? y : 0;
			
			this.x = x;
			this.y = y;
		};
		
		this.set(x, y);
	};
	
	// A 3D math vector
	$.Math.Vec3D = function(x, y, z){
		
		this.set = function(x, y, z){
			x = x ? x : 0;
			y = y ? y : 0;
			z = z ? z : 0;
			
			this.x = x;
			this.y = y;
			this.z = z;
		};
		
		this.set(x, y, z);
	};
	
	
	// Eases a value to another value.
	// start (int, object): Starting value. Can be a first, second, or third dimensional vector.
	// end (int, object): Ending value to complete ease at. Must be the same dimension as "start".
	// duration (int): How long the it takes to ease from start to finish in milliseconds.
	// easin (bool): should the function ease in?
	// easeout (bool): should the function ease out?
	// type (enum): linear, quadratic, cubic, quartic, quintic, sinusoidal, exponential, or circular.
	$.Math.ease = function(start, end, duration, easein, easeout, type){
		var e = $.Math.ease;
		
		// assign ease properties.
		e.start = start;
		e.end = end;
		e.duration = typeof(duration) === 'number' ? duration : 0;
		e.easein = typeof(easein) === 'boolean' ? easein : true;
		e.easeout = typeof(easeout) === 'boolean' ? easeout : true;
		e.type = type >= 0 && type <=7 ? type : 0;
		
		e.interval = window.setInterval(e.quadratic, 1);
	};
	
	// Type of easing methods:
	// Ease Linear
	$.Math.ease.linear = function(){
		
	};
	// Ease Quadratic (pretty much using a free fall: like y = 16x^2)
	$.Math.ease.quadratic = function(){
		var e = $.Math.ease;
		window.clearInterval(e.interval);
	};
	
	$.Math.EASE = {
			Linear : 0,
			Quadratic : 1,
			Cubic : 2,
			Quartic : 3,
			Quintic : 4,
			Sinusoidal : 5,
			Exponential : 6,
			Circular : 7
	};
	
})();