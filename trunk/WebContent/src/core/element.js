/*! PHRAME - v1.0.0 - 2013-07-08
* http://phoxden.com
* Copyright 2013
* Created by:
*    Fox || Arctic || PHOX || ArcticPHOX || ArcticFox (aka Eric C.)
*/
// Created Element Class .
(function(){
	PHRAME.Class({name: 'Core.Element',
		properties: {
			element:		null, // HTML Element object
			name:			null, // Name of this instance (sets as tag's class)
			width:			null, // Width of this PHRAME.Element.
			height:			null, // Height of this PHRAME.Element.
			parent:			null, // PHRAME.Element Parent of this PHRAME.Element.
			siblings:		[], // PHRAME.Element Siblings to this PHRAME.Element.
			children:		[], // PHRAME.Element Children to this PHRAME.Element.
			styles:			[], // Applied Styles to this PHRAME.Element.
			childAlignment:	true // Alignment of Child PHRAME.Elements (true = horizontal, false = vertical)
		},
		methods: {
			// Initialize is the constructor for the Element class.
			// Can define and element by name or node
			_construct: function(/*Object*/options){
				// Default parameter
				options = typeof(options) === 'object' ? options : {};
				// Create the element 
				switch(typeof(options.element)){
					// If the element is a string, create the element based on that string. 
					case 'string': this.element = document.createElement(options.element); break;
					// If the element is undefined, create a default div element. 
					case 'undefined': this.element = document.createElement('div'); break;
					// Otherwise, make it become (hopefully) an element object. 
					default: this.element = options.element; break;
				}
				
				// Set the name for this instance (optional)
				if(options.name !== undefined){
					this.name = options.name;
					this.element.className = this.name;
				}
			},
			
			// Sets the width of the element. Turn dW (Dynamic Width) off.
			setWidth: function(/*Integer*/value){
				// Set the width.
				this.width = value;
				// Recalculate the size.
				this._recalcParent();
			},
			
			// Sets the height of the element. Turn dH (Dynamic Height) off.
			setHeight: function(/*Integer*/value){
				// Set the height.
				this.height = value;
				// Recalculate the size.
				this._recalcParent();
			},
			
			// This function sets the size of the element.
			setSize: function(/*Object*/options){
				if(typeof(options) !== 'object'){ options = {}; }
				options.width = options.width ? options.width : null;
				options.height = options.height ? options.height : null;
				// If x is not null, set the width. 
				this.width = options.width;
				// If y is not null, set the height. 
				this.height = options.height;
				// Recalculate the size.
				this._recalcParent();
			},
			
			// Fills itself in it's parent. 
			fillSize: function(/*Object*/options){
				
				// Option checks
				if(typeof(options) !== 'object'){ options = {}; }
				options.width = options.width != null ? options.width : true;
				options.height = options.height != null ? options.height : true;
				
				if(options.width === true){ this.width = null; } // Make sure the width resets to null when we make it dynamic.
				if(options.height === true){ this.height = null; } // Make sure the height resets to null when we make it dynamic.
				
				// Declare parent size variables 
				var pW = 0;
				var pH = 0;
				// Assign parent object to variable
				var p = PHRAME.instances[this.parent];
				//If a parent exists, set this element to that element's size. 
				if(p){
					pW = parseInt(p.element.style.width) | 0;
					pH = parseInt(p.element.style.height) | 0;
				// Otherwise match the size of the window. 
				}else{
					pW = window.innerWidth;
					pH = window.innerHeight;
					p = { childAlignment : true };
				}
				
				// Store the outside width and height of the element in a variable.
				var outsideWidth = this.getOutsideWidth();
				var outsideHeight = this.getOutsideHeight();
				
				// How much to reduce the width/height of the element depending on the number of siblings.
				var subSibWidth = 0;
				var subSibHeight = 0;
				// See how many and what kind of siblings this element has.
				// Then, space them out appropriately.
				if(p.childAlignment === true){ // If the parent's alignment is horizontal.
					var dynCount = 0;
					var pixTotal = 0;
					if(this.width === null){
						dynCount++;
					}else{
						var tmp = this.getWidth();
						pixTotal += isNaN(tmp) ? 0 : tmp;
					}
					for(var i=0; i<this.siblings.length; i++){
						var s = PHRAME.instances[this.siblings[i]];
						if(s.width === null){
							dynCount++;
						}else{
							var tmp = s.getWidth();
							pixTotal += isNaN(tmp) ? 0 : tmp;
						}
					}
					pW -= pixTotal;
					subSibWidth = (pW - (pW / dynCount));
				}else{ // If the parent's alignment is vertical.
					var dynCount = 0;
					var pixTotal = 0;
					if(this.height === null){
						dynCount++;
					}else{
						var tmp = this.getHeight();
						pixTotal += isNaN(tmp) ? 0 : tmp;
					}
					for(var i=0; i<this.siblings.length; i++){
						var s = PHRAME.instances[this.siblings[i]];
						if(s.height === null){
							dynCount++;
						}else{
							var tmp = s.getHeight();
							pixTotal += isNaN(tmp) ? 0 : tmp;
						}
					}
					pH -= pixTotal;
					subSibHeight = (pH - (pH / dynCount));
				}
				
				// Set the parent size as the size of the child 
				if(options.width){ // If the width is dynamic...
					this.element.style.width = String( (pW - (outsideWidth + subSibWidth) ) ) + 'px';
				}else{
					this.element.style.width = String( (this.width - outsideWidth) ) + 'px';
				}
				if(options.height){
					this.element.style.height = String( (pH - (outsideHeight + subSibHeight) ) )+'px';
				}else{
					this.element.style.height = String( (this.height - outsideHeight) ) + 'px';
				}
			},
			
			// Clears any size settings. 
			clearSize: function(){
				// Sets the element's width to null 
				this.width = null;
				// Sets the element's height to null 
				this.height = null;
			},
			
			// Automatically sets the width and height of the element. Takes into consideration
			// whether or not dynamic (dW, and dH) are true or false.
			autoSize: function(){
				// Basically just a smart sizer that will fill it's parent depending on dW and dH booleans
				this.fillSize({width: this.width===null?true:false, height: this.height===null?true:false});
			},
			
			// automatically decides the size of the element.
			// Recalculates the sizing of this element and its children
			recalcSize: function(){
				this.autoSize();
				// Loop through each child element and trigger the auto size.
				for(var i=0; i<this.children.length; i++){
					var c = this.children[i];
					PHRAME.instances[c].recalcSize();
				}
			},
			
			// Gets the width of the element. Always pixel value. Null if width is dynamic.
			getWidth: function(){
				return(this.width);
			},
			// Gets the height of the element. Always pixel value. Null if height is dynamic.
			getHeight: function(){
				return(this.height);
			},
			
			// Gets the width of the element's margins
			getMarginWidth: function(){
				var marginLeft = parseInt(this.element.style.marginLeft);
				var marginRight = parseInt(this.element.style.marginRight);
				var marginWidth = (marginLeft ? marginLeft : 0) + (marginRight ? marginRight : 0);
				return(marginWidth);
			},
			// Gets the height of the element's margins
			getMarginHeight: function(){
				var marginTop = parseInt(this.element.style.marginTop);
				var marginBottom = parseInt(this.element.style.marginBottom);
				var marginHeight = (marginTop ? marginTop : 0) + (marginBottom ? marginBottom : 0);
				return(marginHeight);
			},
			
			// Gets the width of the element's borders
			getBorderWidth: function(){
				var borderLeft = parseInt(this.element.style.borderLeftWidth);
				var borderRight = parseInt(this.element.style.borderRightWidth);
				var borderWidth = (borderLeft ? borderLeft : 0) + (borderRight ? borderRight : 0);
				return(borderWidth);
			},
			// Gets the height of the element's borders
			getBorderHeight: function(){
				var borderTop = parseInt(this.element.style.borderTopWidth);
				var borderBottom = parseInt(this.element.style.borderBottomWidth);
				var borderHeight = (borderTop ? borderTop : 0) + (borderBottom ? borderBottom : 0);
				return(borderHeight);
			},
			
			// Gets the width of the element's paddings
			getPaddingWidth: function(){
				var paddingLeft = parseInt(this.element.style.paddingLeft);
				var paddingRight = parseInt(this.element.style.paddingRight);
				var paddingWidth = (paddingLeft ? paddingLeft : 0) + (paddingRight ? paddingRight : 0);
				return(paddingWidth);
			},
			// Gets the height of the element's paddings
			getPaddingHeight: function(){
				var paddingTop = parseInt(this.element.style.paddingTop);
				var paddingBottom = parseInt(this.element.style.paddingBottom);
				var paddingHeight = (paddingTop ? paddingTop : 0) + (paddingBottom ? paddingBottom : 0);
				return(paddingHeight);
			},
			
			// Gets the width size of margins + borders + paddings.
			getOutsideWidth: function(){
				var outsideWidth = this.getMarginWidth() + this.getBorderWidth() + this.getPaddingWidth();
				
				return(outsideWidth);
			},
			
			// Gets the height size of margins + borders + paddings.
			getOutsideHeight: function(){
				var outsideHeight = this.getMarginHeight() + this.getBorderHeight() + this.getPaddingHeight();
				
				return(outsideHeight);
			},
			
			// Allows other elements to be contained into this one. 
			// contents must be an array. 
			contain: function(/*Array*/contents){
				this.release();
				// Initiate the loop. 
				for(var i=0;i<contents.length;i++){
					var c = contents[i];
					// assign the parent of the containing elements to this element. 
					c.parent = this.instanceID;
					// assign the siblings for the containing elements. 
					for(var j=0;j<contents.length;j++){
						// Give this current child all known siblings and ensure it doesn't register itself as one.
						if(j!=i){ c.siblings.push(contents[j].instanceID); }
					}
					// Add the children to this element node. 
					this.element.appendChild(c.element);
					// Automatically format the size of the child. 
					c.autoSize();
					// Add this to this element's children. 
					this.children.push(c.instanceID);
				}
			},
			
			// Releases all the elements contained in this tag. 
			release: function(){
				// Loop for each child in this element. 
				for(var i=0;i<this.children.length;i++){
					var c = PHRAME.instances[this.children[i]];
					// Remove the parent of each element contained. 
					c.parent = null;
					// Reset the containing element siblings. 
					c.siblings = [];
					// Remove child node. 
					this.element.removeChild(c.element);
				}
				// Reset this element's children
				this.children = [];
			},
			
			// Allows the change of child alignment
			alignChildren: function(alignment){
				if(alignment === true || alignment === 'h' || alignment === 'horizontal'){
					this.childAlignment = true;
				}else{
					this.childAlignment = false;
				}
				this.recalcSize();
			},
			
			// Applies style objects to this element.
			setStyles: function(/*Array*/style){
				// Reset the attached elements array.
				this.styles = [];
				// Execute addElements method.
				this.addStyles(style);
			},
			
			// Adds elements to this styling "rule".
			addStyles: function(/*Array*/style){
				// Initiate the loop.
				for(var i=0;i<style.length;i++){
					// Use more manageable variable name.
					var s = style[i];
					// Make the style aware of this element.
					s.elements.pushUnique(this.instanceID);
					// Add the instance ID to this style object.
					// This way, our style instance is aware of what element instances it's modifying.
					this.styles.pushUnique(s.instanceID);
				}
				this.genStyles();
			},
			
			// Removes a certain style from this element.
			removeStyle: function(){
				
			},
			
			// Generates the CSS styling for this element.
			genStyles: function(){
				for(var i=0; i<this.styles.length; i++){
					var s = PHRAME.instances[this.styles[i]];
					for(prop in s.properties){
						this.element.style[prop] = s.style[prop];
						if(prop === 'width'){ this.setWidth(parseInt(s.style[prop])); }
						if(prop === 'height'){ this.setHeight(parseInt(s.style[prop])); }
					}
				}
				this.recalcSize();
			},
			
			// Generates the elements
			generate: function(){
				this.autoSize();
				for(var i=0; i<this.children.length; i++){
					var c = PHRAME.instances[this.children[i]];
					c.generate();
				}
			},
			
			// Recalculate this instance's Parent and it's children (which would include this).
			_recalcParent: function(){
				if(this.parent != null){
					PHRAME.instances[this.parent].recalcSize();
				}
			}
		}
	});
})();