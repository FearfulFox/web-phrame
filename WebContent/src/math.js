(function(){
	$.Math.Vec2D = function(x, y){
		this.set = function(x, y){
			x = x ? x : 0;
			y = y ? y : 0;
			
			this.x = x;
			this.y = y;
		};
		
		this.set(x, y);
	};
	
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
})();