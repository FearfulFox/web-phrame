(function(){
	// Main canvas class
	$.Class({name: 'DOM.Canvas2D', extend: 'DOM.Element',
		properties: {
			context:	null // Container for the context object.
		},
		methods: {
			_construct: function(options){
				var t = this.$;
				// Construct this PHRAME element as a canvas
				t._super._construct('canvas');
				// Create the 2D context object
				t.context = t.element.getContext('2d');
			},	
		}
	});
	
	// Polygon (doesn't have to be a plane; can be a single point or line as well)
	$.Class({name: 'DOM.Canvas2D.Polygon', extend: 'DOM.Element',
		properties: {
			points:	[] // Array of PHRAME.Math.Vec2D object defining the two points of this line.
		},
		methods: {
			_construct: function(options){
				var t = this.$;
				// Construct this PHRAME element as a canvas
				t._super._construct('canvas');
				// Create the 2D context object
				t.context = t.element.getContext('2d');
			},	
		}
		
	});
})();