/*! $ - v1.0.0 - 2013-07-08
* http://phoxden.com
* Copyright 2013
* Created by:
*    Fox || Arctic || PHOX || ArcticPHOX || ArcticFox (aka Eric C.)
*/
(function(){
	$.Class({name: 'Styles.Style',
		methods: {
			_construct: function(options){
				this.$.style = document.createElement('div').style; // An object that contains all possible styling for elements
				this.$.elements = []; // Array from referenced $.Elements using this style.
				this.$.properties = {}; // CSS Properties this $.Style object should have.
				this.$.set(options); // Set the options to this object.
				//this.$.setupStyle(options); // Setup the style object.
			},
			
			// This set function should follow the rules of the CSS (in object form).
			// For example, setting a new style rule would look like:
			// $.Style.set({
			//     color : {r : 255, g : 255, b : 255},
			//     border : { width: 5, style: 0, color: {r : 0, g : 0, b : 0}
			// });
			set: function(options){
				for(var param in options){
					this.$.properties[param] = options[param];
				}
				this.$.setupStyle(this.$.properties);
				this.$.genElementStyles();
			},
			
			// Returns the CSS styling format for color.
			genCSSColor: function(rgb){
				// ensure rgb is an object.
				if(typeof(rgb) !== 'object'){
					rgb = { r : 0, g : 0, b : 0};
				// Otherwise, Ensure the object has the correct properties set. 
				}else{
					if(rgb.r == null){ rgb.r = 0; }
					if(rgb.g == null){ rgb.g = 0; }
					if(rgb.b == null){ rgb.b = 0; }
				}
				// Return the color as CSS.
				return('rgb('+String(rgb.r)+','+String(rgb.g)+','+String(rgb.b)+')');
			},
			
			// This will generate the CSS string to be applied to the HTML's style attribute
			setupStyle: function(properties){
				// loop through each property assigned to this $.Style object.
				// End result should be formatted something like so...
				// [prop]: [cssVal]
				for(var prop in properties){
					// Check to make sure the parameter is a valid style.
					// If not, go immediately to the next loop.
					if(this.$.style[prop] === undefined){ continue; }
					// Create a string for the final CSS value
					var cssVal = '';
					// Determine the type of value and apply proper CSS
					switch(prop){
						case 'color':
							cssVal = this.$.genCSSColor(properties[prop]);
						break;
						default:
							// Loop through the css property name to get it's values.
							for(var val in properties[prop]){
								var temp = '';
								// Determine the type of value and apply proper CSS
								switch(val){
									// size value needed to have the unit 'px' applied to the number.
									case 'length': case 'size': case 'width': case 'height':
									case 'size1': case 'size2': case 'size3': case 'size4':
										temp = String(properties[prop][val])+'px';
									break;
									// color must be formatted correctly: 'rgb(r,g,b)'.
									case 'color':
										temp = this.$.genCSSColor(properties[prop][val]);
									break;
									// Default
									default:
										temp = properties[prop][val];
									break;
								}
								// Add the current value to the css value as a whole.
								cssVal += String(temp) + ' ';
							}
							// Strip off the trailing space.
							cssVal = cssVal.substring(0, cssVal.length - 1);
						break;
					}
					// Finally, apply the final result to the style object.
					this.$.style[prop] = (cssVal);
				}
			},
			
			// Get the current style.
			get: function(){
				return(this.$.style);
			},
			
			// Clear all elements attached to this style object.
			clearElements: function(){
				
			},
			
			// Applies styling to the selected elements.
			// parameter must be in the form of an array.
			setElement: function(eles){
				
				// Reset the attached elements array.
				this.$.elements = [];
				// Execute addElements method.
				this.$.addElement(eles);
			},
			
			// Adds elements to this styling "rule".
			addElement: function(eles){
				if(eles == null){ return; }
				eles = typeof(eles) === 'object' ? eles : [eles];
				// Initiate the loop.
				for(var i=0;i<eles.length;i++){
					// Use more manageable variable name.
					var e = eles[i];
					// Make the element aware of this style
					e.styles.pushUnique(this.$.instanceID);
					// Add the instance ID to this style object.
					// This way, our style instance is aware of what element instances it's modifying.
					this.$.elements.pushUnique(e.instanceID);
					// Re-generate the elements style CSS
					e.genStyles();
				}
			},
			
			// Regenerates element styles
			genElementStyles: function(){
				// Initiate the loop.
				for(var i=0;i<this.$.elements.length;i++){
					// Re-generate the elements style CSS
					$.instances[this.$.elements[i]].genStyles();
				}
			}
		}
	});
})();

// Styling rules queue
$.Styles.queue = [];

// Selects instances based on a selector and applies a styling to selected instances.
$.Styles.select = function(/*$.Style*/style, /*String*/selector){
	// Place the styling rules into a queue if the $ has yet to be written out.
	if($.written !== true){
		$.Styles.queue.push([style.instanceID, selector]);
		return;
	}
	
	// Search for all instances that satisfy the filter.
	var searchScope = $.Cache.pheInstances; // Set our current search scope (starts with all instances)
	for(var type in selector){
		if(type === 'object'){
			var tmpScope = [];
			for(var i = 0; i < searchScope.length; i++){
				if(searchScope[i].classFullName === selector[type]){
					tmpScope.push(searchScope[i]);
				}
			}
			searchScope = tmpScope;
		}else if(type === 'className'){
			var tmpScope = [];
			for(var i = 0; i < searchScope.length; i++){
				if(searchScope[i].hasClass(selector[type])){
					tmpScope.push(searchScope[i]);
				}
			}
			searchScope = tmpScope;
		}else if(type === 'element'){
			var tmpScope = [];
			for(var i = 0; i < searchScope.length; i++){
				if(searchScope[i].getElement().tagName === selector[type].toUpperCase()){
					tmpScope.push(searchScope[i]);
				}
			}
			searchScope = tmpScope;
		}
	}
	// Apply the styling to all instances that satisfy
	for(var i = 0; i < searchScope.length; i++){
		searchScope[i].addStyle([style]);
	}
};

// Applies the styling from the queue
$.Styles.runSelectQueue = function(){
	for(var i = 0; i < $.Styles.queue.length; i++){
		var q = $.Styles.queue[i];
		$.Styles.select($.instances[q[0]], q[1]);
	}
	$.Styles.queue = []; // Clear the queue
};