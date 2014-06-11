(function(){
	
	// A 1D math vector
	$.Math.Vec1D = function(x){
		this.set = function(x){
			x = x ? x : 0;
			
			this.x = x;
		};
		
		this.set(x);
	};
	
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
	// start (int, object): Starting value. Can be a first, second, or third dimensional vector. (MUST BE VECTOR OBJECT)
	// end (int, object): Ending value to complete ease at. Must be the same dimension as "start".
	// duration (int): How long the it takes to ease from start to finish in milliseconds.
	// easin (bool): should the function ease in?
	// easeout (bool): should the function ease out?
	// type (enum): linear, quadratic, cubic, quartic, quintic, sinusoidal, exponential, or circular.
	$.Math.ease = function(start, end, duration, easein, easeout, type, method){
		var e = $.Math.ease;
		
		// assign ease properties.
		e.start = $.clone(start); // Start position
		e.current = $.clone(start); // Current position
		e.end = end; // End position
		e.duration = typeof(duration) === 'number' ? duration : 0; // The amount of time before until the interval should end.
		e.easein = typeof(easein) === 'boolean' ? easein : true; // Should we ease in?
		e.easeout = typeof(easeout) === 'boolean' ? easeout : true; // Should we ease out?
		e.type = type >= 0 && type <=7 ? type : 1; // Type of formula to use for easing
		e.delay = 10; // Millisecond delay for the interval
		e.time = 0; // Counts up the amount of time per interval.
		e.method = typeof(method) === 'function' ? method : function(){};
		
		// Ensure duration is evenly divisible by the delay.
		var dr = e.duration % e.delay; // duration remainder.
		if(dr !== 0){ // Check if remainder is not 0.
			// If so, round to the nearest delay multiple.
			e.duration = dr < (e.delay/2) ? e.duration - dr : e.duration + (e.delay-dr);
		}
		
		if(type === 1){
			// Define some repetitive math (eliminate some processing).
			e.quadratic.halfDistX = (e.end.x - e.start.x)/2;
			if(e.start.y !== null){ e.quadratic.halfDistY = (e.end.y - e.start.y)/2; }
			if(e.start.z !== null){ e.quadratic.halfDistZ = (e.end.z - e.start.z)/2; }
			e.interval = window.setInterval(e.quadratic, e.delay); // Start interval
		}
	};
	
	// TODO: Finish other ease equations. (Quadratic is good for now.)
	
	// Type of easing methods:
	// Ease Linear
	$.Math.ease.linear = function(){
		
	};
	// Ease Quadratic (pretty much using a free fall: like y = 16x^2)
	$.Math.ease.quadratic = function(){		
		var e = $.Math.ease;
		var eq = $.Math.ease.quadratic;
		e.time += e.delay;
		
		var pC = e.time/(e.duration/2); // percent changed.
		
		// Start ease calculation for vector values. (all vectors have x)
		// Acceleration:
		if(pC < 1){
			e.current.x = eq.halfDistX*(pC*pC) + e.start.x;
			if(e.current.y !== null){ e.current.y = eq.halfDistY*(pC*pC) + e.start.y; }
			if(e.current.z !== null){ e.current.z = eq.halfDistZ*(pC*pC) + e.start.z; }
		// Deceleration:
		}else{
			e.current.x = -eq.halfDistX*(pC-2)*(pC-2) + ((e.end.x - e.start.x) + e.start.x);
			if(e.current.y !== null){ e.current.y = -eq.halfDistY*(pC-2)*(pC-2) + ((e.end.y - e.start.y) + e.start.y); }
			if(e.current.z !== null){ e.current.z = -eq.halfDistZ*(pC-2)*(pC-2) + ((e.end.z - e.start.z) + e.start.z); }
		}
		
		// execute the optional interval method
		e.method(e.current, e.time);
		
		// End the interval if the duration has been reached.
		if(e.time >= e.duration){
			window.clearInterval(e.interval);
		}
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