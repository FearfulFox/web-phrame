/*! PHRAME - v1.0.0 - 2013-07-08
* http://phoxden.com
* Copyright 2013 phoxden.com
* Created by:
*    Arctic || PHOX || ArcticPHOX (aka Eric C.)
*/
// Created Element Class [Arctic].
PHRAME.Core.Element = Class.extend({
	// Initialize is the constructor for the Element class.
	// Can define and element by name or node
	init: function(element){
		
		// Create the element [Arctic]
		this.element;
		switch(typeof(element)){
			// If the element is a string, create the element based on that string. [Arctic]
			case 'string': this.element = document.createElement(element); break;
			// Otherwise, make it become (hopefully) an element object. [Arctic]
			default: this.element = element; break;
		}
		
		// The parent of this element. [Arctic]
		this.parent;
		
		// The siblings of this element. [Arctic]
		this.siblings = new Array();
		
		// An array of children nested within this element. [Arctic]
		this.children = new Array();
		
		// This is the variable to stretch the element horizontally if no pixel width is defined. [Arctic]
		this.sH = true; 
		// This is the variable to stretch the element vertically if no pixel height is defined. [Arctic]
		this.sV = true; 
	},
	
	// This function automatically sets the size of the element. [Arctic]
	sizeSet: function(x,y){
		// If x is not null, set the width. [Arctic]
		if(x){this.element.style.width = String(x)+'px';}
		// If y is not null, set the height. [Arctic]
		if(y){this.element.style.height = String(y)+'px';}
	},
	// Fills itself in it's parent. [Arctic]
	sizeFill: function(override){
		// Declare parent size variables [Arctic]
		pW = null;
		pH = null;
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
		this.setSize(pW,pH);
	},
	// Clears any size settings. [Arctic]
	sizeClear: function(){
		// Sets the element's width styling to null [Arctic]
		this.element.style.width = null;
		// Sets the element's height styling to null [Arctic]
		this.element.style.height = null;
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
	
	// Allows other elements to be contained into this one. [Arctic]
	// contents must be an array. [Arctic]
	contain: function(contents){
		// Initiate the loop. [Arctic]
		for(var i=0;i<contents.length;i++){
			// assign the parent of the containing elements to this element. [Arctic]
			contents[i].parent = this;
			// assign the siblings for the containing elements. [Arctic]
			for(var j=0;j<contents.length;j++){
				if(j!=i){contents[i].siblings.push(contents[j]);}
			}
			// Add the children to this element node. [Arctic]
			this.element.appendChild(contents[i].element);
			// Add this to this element's children. [Arctic]
			this.children.push(contents[i]);
		}
	},
	// Releases all the elements contained in this tag. [Arctic]
	release: function(){
		// Loop for each child in this element. [Arctic]
		for(var i=0;i<children.length;i++){
			// Remove the parent of each element contained. [Arctic]
			contents[i].parent = null;
			// Reset the containing element siblings. [Arctic]
			contents[i].siblings = new Array();
			// Remove child node. [Arctic]
			this.element.removeChild(contents[i].element);
		}
		// Reset this element's children
		this.children = new Array();
	}
});