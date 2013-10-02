/*! PHRAME - v1.0.0 - 2013-07-08
* http://phoxden.com
* Copyright 2013 phoxden.com
* Created by:
*    Arctic || PHOX || ArcticPHOX (aka Eric C.)
*/
(function(){
	PHRAME.Class({name: 'Style',
		object: {
			_construct: function(options){
				this.style = document.createElement('div').style; // An object that contains all possible styling for elements
				this.attachedElements = []; // Array from referenced PHRAME.Elements using this style.
				this.properties = {}; // CSS Properties this PHRAME.Style object should have.
				this.set(options); // Set the options to this object.
				this.setupStyle(); // Setup the style object.
			},
			
			// This set function should follow the rules of the CSS (in object form).
			// For example, setting a new style rule would look like:
			// PHRAME.Style.set({
			//     color : {r : 255, g : 255, b : 255},
			//     border : { width: 5, style: 0, color: {r : 0, g : 0, b : 0}
			// });
			set: function(options){
				for(var param in options){
					this.properties[param] = options[param];
				}
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
			setupStyle: function(){
				// loop through each property assigned to this PHRAME.Style object.
				// End result should be formatted something like so...
				// [prop]: [cssVal]
				for(var prop in this.properties){
					// Check to make sure the parameter is a valid style.
					// If not, go immediately to the next loop.
					if(this.style[prop] == null){ continue; }
					// Create a string for the final CSS value
					var cssVal = '';
					// Determine the type of value and apply proper CSS
					switch(prop){
						case 'color':
							cssVal = this.genCSSColor(this.properties[prop]);
						break;
						default:
							// Loop through the css property name to get it's values.
							for(var val in this.properties[prop]){
								// Determine the type of value and apply proper CSS
								switch(val){
									// width or height values need to have the unit 'px' applied to the number.
									case 'width':case 'height':
										this.properties[prop][val] = String(this.properties[prop][val])+'px';
									break;
									// color must be formatted correctly: 'rgb(r,g,b)'.
									case 'color':
										this.properties[prop][val] = this.genCSSColor(this.properties[prop][val]);
									break;
								}
								// Add the current value to the css value as a whole.
								cssVal += String(this.properties[prop][val]) + ' ';
							}
							cssVal = cssVal.substring(0, cssVal.length - 1);
						break;
					}
					// Finally, apply the final result to the style object.
					this.style[prop] = (cssVal);
				}
			},
			
			// Get the current style.
			get: function(){
				return(this.style);
			}
		}
	});
})();