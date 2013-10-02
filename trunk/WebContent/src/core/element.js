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
			_construct: function(options){
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
				
				// The parent of this element. [Arctic]
				this.parent;
				
				// The siblings of this element. [Arctic]
				this.siblings = [];
				
				// An array of children nested within this element. [Arctic]
				this.children = [];
				
				// determines how this element's children should be aligned (horizontally or vertically).
				// TRUE = Horizontal, FALSE = Vertical
				this.cA = true;
				// This is the variable to stretch the element horizontally if no pixel width is defined. [Arctic]
				this.dW = true;
				// This is the variable to stretch the element vertically if no pixel height is defined. [Arctic]
				this.dH = true;
			},
			
			// This function automatically sets the size of the element. [Arctic]
			setSize: function(options){
				if(typeof(options) !== 'object'){ options = {}; }
				// If x is not null, set the width. [Arctic]
				if(options.width != null){this.element.style.width = String(options.width)+'px';this.dW = false;}
				// If y is not null, set the height. [Arctic]
				if(options.height != null){this.element.style.height = String(options.height)+'px';this.dH = false;}
			},
			
			// Fills itself in it's parent. [Arctic]
			fillSize: function(options){
				if(typeof(options) !== 'object'){ options = {}; }
				options.width = options.width != null ? options.width : true;
				options.height = options.height != null ? options.height : true;
				// Declare parent size variables [Arctic]
				var pW = null;
				var pH = null;
				//If a parent exists, set this element to that element's size. [Arctic]
				if(this.parent){
					pW = this.parent.getWidth();
					pH = this.parent.getHeight();
				// Otherwise match the size of the window. [Arctic]
				}else{
					pW = window.innerWidth;
					pH = window.innerHeight;
				}
		
				// Set the parent size as the size of the child [Arctic]
				if(options.width){
					this.element.style.width = String(pW)+'px';
					this.dW = true;
				}
				if(options.height){
					this.element.style.height = String(pH)+'px';
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
					this.children[i].recalcSize();
				}
			},
			
			// Gets Horizontal Padding and Border sizes
			getPaddingWidth: function(){
				return(this.element.offsetWidth - this.getWidth());
			},
			
			// Gets Vertical Padding and Border sizes
			getPaddingHeight: function(){
				return(this.element.offsetHeight - this.getHeight());
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
			
			// Gets the offset Width. Includes Padding.
			getOffsetWidth: function(){
				return(this.element.offsetWidth);
			},
			
			// Gets the offset Height. Includes Padding.
			getOffsetHeight: function(){
				return(this.element.offsetHeight);
			},
			
			// Gets the inner Width. Includes Padding.
			getInnerWidth: function(){
				return(this.getWidth() - this.getPaddingWidth());
			},
			
			// Gets the inner Height. Includes Padding.
			getInnerHeight: function(){
				return(this.getHeight() - this.getPaddingHeight());
			},
			
			// Allows other elements to be contained into this one. [Arctic]
			// contents must be an array. [Arctic]
			contain: function(contents){
				// Initiate the loop. [Arctic]
				for(var i=0;i<contents.length;i++){
					var c = contents[i];
					// assign the parent of the containing elements to this element. [Arctic]
					c.parent = this;
					// assign the siblings for the containing elements. [Arctic]
					for(var j=0;j<contents.length;j++){
						// Give this current child all known siblings and ensure it doesn't register itself as one.
						if(j!=i){ c.siblings.push(contents[j]); }
					}
					// Add the children to this element node. [Arctic]
					this.element.appendChild(c.element);
					// Automatically format the size of the child. [Arctic]
					c.autoSize();
					// Add this to this element's children. [Arctic]
					this.children.push(c);
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
			}
		}
	});
})();