/*! PHRAME - v1.0.0 - 2013-07-08
* http://phoxden.com
* Copyright 2013 phoxden.com
* Created by:
*    Arctic || PHOX || ArcticPHOX (aka Eric C.)
*/
// Created Element Class [Arctic].
(function(){
	PHRAME.Class({name: 'Core.Element',
		object: {
			// Initialize is the constructor for the Element class.
			// Can define and element by name or node
			_construct: function(/*Object*/options){
				// Create the element [Arctic]
				this.element;
				switch(typeof(options.element)){
					// If the element is a string, create the element based on that string. [Arctic]
					case 'string': this.element = document.createElement(options.element); break;
					// If the element is undefined, create a default div element. [Arctic]
					case 'undefined': this.element = document.createElement('div'); break;
					// Otherwise, make it become (hopefully) an element object. [Arctic]
					default: this.element = options.element; break;
				}
				
				this.name = '';
				if(options.name !== undefined){
					this.name = options.name;
					this.element.className = this.name;
				}
				
				// The parent instance index of this element. [Arctic]
				this.parent = null;
				
				// The siblings of this element (instance indexes). [Arctic]
				this.siblings = [];
				
				// An array of children nested within this element (instance indexes). [Arctic]
				this.children = [];
				
				// The styles applied to this elements (instance indexes).
				this.styles = [];
				
				// determines how this element's children should be aligned (horizontally or vertically).
				// TRUE = Horizontal, FALSE = Vertical
				this.cA = true;
				// This is the variable to stretch the element horizontally if no pixel width is defined. [Arctic]
				this.dW = true;
				// This is the variable to stretch the element vertically if no pixel height is defined. [Arctic]
				this.dH = true;
			},
			
			// This function automatically sets the size of the element. [Arctic]
			setSize: function(/*Object*/options){
				if(typeof(options) !== 'object'){ options = {}; }
				// If x is not null, set the width. [Arctic]
				if(options.width != null){this.element.style.width = String(options.width)+'px';this.dW = false;}
				// If y is not null, set the height. [Arctic]
				if(options.height != null){this.element.style.height = String(options.height)+'px';this.dH = false;}
			},
			
			// Fills itself in it's parent. [Arctic]
			fillSize: function(/*Object*/options){
				if(typeof(options) !== 'object'){ options = {}; }
				options.width = options.width != null ? options.width : true;
				options.height = options.height != null ? options.height : true;
				// Declare parent size variables [Arctic]
				var pW = null;
				var pH = null;
				//If a parent exists, set this element to that element's size. [Arctic]
				if(PHRAME.instances[this.parent]){
					pW = PHRAME.instances[this.parent].getWidth();
					pH = PHRAME.instances[this.parent].getHeight();
				// Otherwise match the size of the window. [Arctic]
				}else{
					pW = window.innerWidth;
					pH = window.innerHeight;
				}
		
				// Set the parent size as the size of the child [Arctic]
				if(options.width){
					this.element.style.width = String( (pW - this.getOutsideWidth()) )+'px';
					this.dW = true;
				}
				if(options.height){
					this.element.style.height = String( (pH - this.getOutsideHeight()) )+'px';
					this.dH = true;
				}
			},
			
			// Clears any size settings. [Arctic]
			clearSize: function(){
				// Sets the element's width styling to null [Arctic]
				this.element.style.width = null;
				// Sets the element's height styling to null [Arctic]
				this.element.style.height = null;
			},
			
			// Automatically sets the width and height of the element. Takes into consideration
			// whether or not dynamic (dW, and dH) are true or false.
			autoSize: function(){
				// Basically just a smart sizer that will fill it's parent depending on dW and dH booleans
				this.fillSize({width: this.dW, height: this.dH});
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
			
			// Gets the width of the element. Always pixel values. [Arctic]
			getWidth: function(){
				// Since the width styling is always a string (like '20px'),
				// we have to parse the string into an integer only.
				// example '20px' parses to 20. [Arctic]
				return(parseInt(this.element.style.width));
			},
			// Gets the height of the element. Always pixel values. [Arctic]
			getHeight: function(){
				// Since the height styling is always a string (like '20px'),
				// we have to parse the string into an integer only.
				// example '20px' parses to 20. [Arctic]
				return(parseInt(this.element.style.height));
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
			
			// Allows other elements to be contained into this one. [Arctic]
			// contents must be an array. [Arctic]
			contain: function(/*Array*/contents){
				// Initiate the loop. [Arctic]
				for(var i=0;i<contents.length;i++){
					var c = contents[i];
					// assign the parent of the containing elements to this element. [Arctic]
					c.parent = this.instanceID;
					// assign the siblings for the containing elements. [Arctic]
					for(var j=0;j<contents.length;j++){
						// Give this current child all known siblings and ensure it doesn't register itself as one.
						if(j!=i){ c.siblings.push(contents[j].instanceID); }
					}
					// Add the children to this element node. [Arctic]
					this.element.appendChild(c.element);
					// Automatically format the size of the child. [Arctic]
					c.autoSize();
					// Add this to this element's children. [Arctic]
					this.children.push(c.instanceID);
				}
			},
			
			// Releases all the elements contained in this tag. [Arctic]
			release: function(){
				// Loop for each child in this element. [Arctic]
				for(var i=0;i<children.length;i++){
					// Remove the parent of each element contained. [Arctic]
					contents[i].parent = null;
					// Reset the containing element siblings. [Arctic]
					contents[i].siblings = [];
					// Remove child node. [Arctic]
					this.element.removeChild(contents[i].element);
				}
				// Reset this element's children
				this.children = [];
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
				this.element.style.cssText = "";
				for(var i=0; i<this.styles.length; i++){
					var s = PHRAME.instances[this.styles[i]];
					this.element.style.cssText += s.style.cssText;
				}
			},
			
			// Generates the elements
			generate: function(){
				this.autoSize();
				for(var i=0; i<this.children.length; i++){
					var c = PHRAME.instances[this.children[i]];
					c.generate();
				}
			}
		}
	});
})();