/*! PHRAME - v1.0.0 - 2013-07-08
* http://phoxden.com
* Copyright 2013
* Created by:
*    Fox || Arctic || PHOX || ArcticPHOX || ArcticFox (aka Eric C.)
*/
// Created Element Class .
(function(){
	PHRAME.Class({name: 'Elements.Element',
		properties: {
			element:		null, // HTML Element object
			classes:		[], // Element's classes
			width:			null, // Width of this PHRAME.Element.
			height:			null, // Height of this PHRAME.Element.
			proportion:		null, // The size ratio this element should be when aligned with other siblings. (0-100)
			parent:			null, // PHRAME.Element Parent of this PHRAME.Element.
			siblings:		[], // PHRAME.Element Siblings to this PHRAME.Element.
			children:		[], // PHRAME.Element Children to this PHRAME.Element.
			childIndex:		null, // Index number of it's sorting within a parent PHRAME.Element.
			styles:			[], // Applied Styles to this PHRAME.Element.
			childAlignment:	true // Alignment of Child PHRAME.Elements (true = horizontal, false = vertical)
		},
		methods: {
			// Initialize is the constructor for the Element class.
			// Can define and element by name or node
			_construct: function(/*Object*/options){				
				// Default parameter
				options = typeof(options) === 'object' ? options : {};
				
				// Ensure the element is set
				this.$.setElement(options.element);
				if(options.className !== undefined){ this.$.setClass(options.className); }
				if(options.width !== undefined){ this.$.setWidth(options.width); }
				if(options.height !== undefined){ this.$.setHeight(options.height); }
				if(options.align !== undefined){ this.$.alignChildren(options.align); }
			},
			
			// set the element
			setElement: function(/*String/Object*/ele){
				// Create the element 
				switch(typeof(ele)){
					// If the element is a string, create the element based on that string. 
					case 'string': this.$.element = document.createElement(ele); break;
					// Otherwise, make it become (hopefully) an element object. 
					case 'object': this.$.element = ele; break;
					// If the element is any else, create a default div element. 
					default: this.$.element = document.createElement('div'); break;
				}
				
				// Apply an id to this element
				this.element.setAttribute('id',this.instanceID);
			},
			
			// Gets the element of this PHRAME.Element object.
			getElement: function(){
				return(this.$.element);
			},
			
			// sets the class names (clears the current class names and sets it the new values)
			setClass: function(classNames){
				classes = [];
				this.$.addClass(classNames);
			},
			
			// add element classes
			addClass: function(/*String/Array*/classNames){
				if(classNames == null){ return; }
				classNames = typeof(classNames) === 'object' ? classNames : [classNames];
				for(var i = 0; i < classNames.length; i++){
					this.$.classes.push(classNames[i]);
				}
			},
			
			// check if this element has a certain class name applied to it.
			hasClass: function(className){
				for(var i in this.$.classes){
					if(this.$.classes[i] === className){
						return(true);
					}
				}
				return(false);
			},
			
			// Sets the width of the element. Turn dW (Dynamic Width) off.
			setWidth: function(/*Integer*/value){
				// Set the width.
				this.$.width = value;
				// Recalculate the size.
				this.$._rPS();
			},
			
			// Sets the height of the element. Turn dH (Dynamic Height) off.
			setHeight: function(/*Integer*/value){
				// Set the height.
				this.$.height = value;
				// Recalculate the size.
				this.$._rPS();
			},
			
			// This function sets the size of the element.
			setSize: function(/*Object*/options){
				if(typeof(options) !== 'object'){ options = {}; }
				options.width = options.width ? options.width : null;
				options.height = options.height ? options.height : null;
				// If x is not null, set the width. 
				this.$.width = options.width;
				// If y is not null, set the height. 
				this.$.height = options.height;
				// Recalculate the size.
				this.$._rPS();
			},
			
			// Defines how much space this element should take up (percentage wise) among non-fixed sized
			// elements in its sibling list.
			setProportion: function(/*Number*/value){
				if(typeof(value) !== 'number'){ value = null; }
				if(value < 0){ value = 0; }
				if(value > 100){ value = 100; }
				this.$.proportion = value;
				// Recalculate the size.
				this.$._rPS();
			},
			
			// Fills itself in it's parent. 
			fillSize: function(/*Object*/options){
				
				// Option checks
				if(typeof(options) !== 'object'){ options = {}; }
				options.width = options.width != null ? options.width : true;
				options.height = options.height != null ? options.height : true;
				
				if(options.width === true){ this.$.width = null; } // Make sure the width resets to null when we make it dynamic.
				if(options.height === true){ this.$.height = null; } // Make sure the height resets to null when we make it dynamic.
				
				// Declare parent size variables 
				var pW = 0.0;
				var pH = 0.0;
				// Assign parent object to variable
				var p = PHRAME.instances[this.$.parent];
				//If a parent exists, set this element to that element's size. 
				if(p){
					pW = parseFloat(p.element.style.width) || 0.0;
					pH = parseFloat(p.element.style.height) || 0.0;
				// Otherwise match the size of the window. 
				}else{
					pW = window.innerWidth;
					pH = window.innerHeight;
					p = { childAlignment : true };
				}
				
				// Store the outside width and height of the element in a variable.
				var outsideWidth = this.$.getOutsideWidth();
				var outsideHeight = this.$.getOutsideHeight();
				
				// How much to reduce the width/height of the element depending on the number of siblings.
				var subSibWidth = 0;
				var subSibHeight = 0;
				// See how many and what kind of siblings this element has.
				// Then, space them out appropriately.
				if(p.childAlignment === true){ // If the parent's alignment is horizontal.
					var dynCount = 0; // Counts the number of siblings that do NOT have a defined with/height.
					var pixTotal = 0; // The sum with each sibling's size.
					var proportion = 0; // Proportion of this element.
					var sibProportion = 0;  // The proportion percent of each sibling.
					if(this.$.width === null){
						dynCount++;
					}else{
						var tmp = this.$.getWidth();
						pixTotal += isNaN(tmp) ? 0 : tmp;
					}
					for(var i=0; i<this.$.siblings.length; i++){
						var s = PHRAME.instances[this.$.siblings[i]];
						if(s.width === null){
							if(s.proportion === null){
								dynCount++;
							}else{
								sibProportion += s.proportion;
							}
						}else{
							var tmp = s.getWidth();
							pixTotal += isNaN(tmp) ? 0 : tmp;
						}
					}
					pW -= pixTotal; // Subtract the pixel total so we're just left with dynamic space.
					if(this.$.proportion !== null){
						proportion = this.$.proportion;
					}else{
						proportion = ( 100 - sibProportion ) / dynCount;
					}
					subSibWidth = (pW - (pW * (proportion/100) ));
				}else{ // If the parent's alignment is vertical.
					var dynCount = 0; // Counts the number of siblings that do NOT have a defined with/height.
					var pixTotal = 0; // The sum with each sibling's size.
					var proportion = 0; // Proportion of this element.
					var sibProportion = 0;  // The proportion percent of each sibling.
					if(this.$.height === null){
						dynCount++;
					}else{
						var tmp = this.$.getHeight();
						pixTotal += isNaN(tmp) ? 0 : tmp;
					}
					for(var i=0; i<this.$.siblings.length; i++){
						var s = PHRAME.instances[this.$.siblings[i]];
						if(s.height === null){
							if(s.proportion === null){
								dynCount++;
							}else{
								sibProportion += s.proportion;
							}
						}else{
							var tmp = s.getHeight();
							pixTotal += isNaN(tmp) ? 0 : tmp;
						}
					}
					pH -= pixTotal;
					if(this.$.proportion !== null){
						proportion = this.$.proportion;
					}else{
						proportion = ( 100 - sibProportion ) / dynCount;
					}
					subSibHeight = (pH - (pH * (proportion/100) ));
				}
				
				// Set the parent size as the size of the child 
				if(options.width){ // If the width is dynamic...
					var finalVal = ( pW - (outsideWidth + subSibWidth) );
					this.$.element.style.width = String( finalVal ) + 'px';
				}else{
					var finalVal = ( this.$.width - outsideWidth );
					this.$.element.style.width = String( finalVal ) + 'px';
				}
				if(options.height){
					var finalVal = ( pH - (outsideHeight + subSibHeight) );
					this.$.element.style.height = String( finalVal )+'px';
				}else{
					var finalVal = ( this.$.height - outsideHeight );
					this.$.element.style.height = String( finalVal ) + 'px';
				}
			},
			
			// Clears any size settings. 
			clearSize: function(){
				// Sets the element's width to null 
				this.$.width = null;
				// Sets the element's height to null 
				this.$.height = null;
			},
			
			// Automatically sets the width and height of the element. Takes into consideration
			// whether or not dynamic (dW, and dH) are true or false.
			autoSize: function(){
				// Basically just a smart sizer that will fill it's parent depending on dW and dH booleans
				this.$.fillSize({width: this.$.width===null?true:false, height: this.$.height===null?true:false});
			},
			
			// automatically decides the size of the element.
			// Recalculates the sizing of this element and its children
			recalcSize: function(){
				this.$.autoSize();
				// Loop through each child element and trigger the auto size.
				for(var i=0; i<this.$.children.length; i++){
					var c = this.$.children[i];
					PHRAME.instances[c].recalcSize();
				}
			},
			
			// Gets the width of the element. Always pixel value. Null if width is dynamic.
			getWidth: function(){
				return(this.$.width);
			},
			// Gets the height of the element. Always pixel value. Null if height is dynamic.
			getHeight: function(){
				return(this.$.height);
			},
			
			// Gets the width of the element's margins
			getMarginWidth: function(){
				var marginLeft = parseFloat(this.$.element.style.marginLeft);
				var marginRight = parseFloat(this.$.element.style.marginRight);
				var marginWidth = (marginLeft ? marginLeft : 0) + (marginRight ? marginRight : 0);
				return(marginWidth);
			},
			// Gets the height of the element's margins
			getMarginHeight: function(){
				var marginTop = parseFloat(this.$.element.style.marginTop);
				var marginBottom = parseFloat(this.$.element.style.marginBottom);
				var marginHeight = (marginTop ? marginTop : 0) + (marginBottom ? marginBottom : 0);
				return(marginHeight);
			},
			
			// Gets the width of the element's borders
			getBorderWidth: function(){
				var borderLeft = parseFloat(this.$.element.style.borderLeftWidth);
				var borderRight = parseFloat(this.$.element.style.borderRightWidth);
				var borderWidth = (borderLeft ? borderLeft : 0) + (borderRight ? borderRight : 0);
				return(borderWidth);
			},
			// Gets the height of the element's borders
			getBorderHeight: function(){
				var borderTop = parseFloat(this.$.element.style.borderTopWidth);
				var borderBottom = parseFloat(this.$.element.style.borderBottomWidth);
				var borderHeight = (borderTop ? borderTop : 0) + (borderBottom ? borderBottom : 0);
				return(borderHeight);
			},
			
			// Gets the width of the element's paddings
			getPaddingWidth: function(){
				var paddingLeft = parseFloat(this.$.element.style.paddingLeft);
				var paddingRight = parseFloat(this.$.element.style.paddingRight);
				var paddingWidth = (paddingLeft ? paddingLeft : 0) + (paddingRight ? paddingRight : 0);
				return(paddingWidth);
			},
			// Gets the height of the element's paddings
			getPaddingHeight: function(){
				var paddingTop = parseFloat(this.$.element.style.paddingTop);
				var paddingBottom = parseFloat(this.$.element.style.paddingBottom);
				var paddingHeight = (paddingTop ? paddingTop : 0) + (paddingBottom ? paddingBottom : 0);
				return(paddingHeight);
			},
			
			// Gets the width size of margins + borders + paddings.
			getOutsideWidth: function(){
				var outsideWidth = this.$.getMarginWidth() + this.$.getBorderWidth() + this.$.getPaddingWidth();
				
				return(outsideWidth);
			},
			
			// Gets the height size of margins + borders + paddings.
			getOutsideHeight: function(){
				var outsideHeight = this.$.getMarginHeight() + this.$.getBorderHeight() + this.$.getPaddingHeight();
				
				return(outsideHeight);
			},
			
			// Allows other elements to be contained into this one. 
			// contents must be an array. 
			contain: function(/*Array*/contents, /*Number*/index){
				if(contents===null){return;}
				if(!PHRAME.isArray(contents)){contents = [contents];}
				var tC = this.$.children; // Give a small name to this element's children array.
				index = typeof(index)==='number' ? index : tC.length; // Child Count
				if(index<0){index=0;}if(index>tC.length){index=tC.length;}
				// Initiate the loop.
				for(var i=0;i<contents.length;i++){
					var c = contents[i]; // use a more manageable name for the contents.
					if(c.parent !== null){c.escape();} // If the Element we're containing has a parent, escape it.
					var ii = (i+index); // i + the index where we want the new children to be placed.
					c.parent = this.$.instanceID; // assign the parent of the containing elements to this element.
					// Check if this index already exists in the children.
					if(tC[ii] == undefined){
						this.$.element.appendChild(c.element); // Add the child to this element node.
					}else{
						this.$.element.insertBefore(c.element, PHRAME.instances[tC[ii]].element); // Add the child to this element node.
					}
					tC.splice(ii,0,c.instanceID); // Add this to this element's children.
					c.autoSize(); // Format the sizing of the child in its new parent.
				}
				this.$._iCSI(); // Gives children elements their new information
				this.$.recalcSize(); // Recalculate the sizing for all Elements under this Element
			},
			
			// Releases all the elements contained in this tag. 
			release: function(contents){
				var tC = this.$.children; // Give a small name to this element's children array.
				var useIndexes = false;
				if(contents === null){
					contents = tC.slice(0);
					useIndexes = true;
				}else if(!PHRAME.isArray(contents)){
					contents = [contents];
				}
				var length = contents.length;
				// Loop for each child that needs to be removed. 
				for(var i=0;i<length;i++){
					var c = null; // Use a short name for child objects
					if(useIndexes===true){c = PHRAME.instances[contents[i]];}
					else{c = contents[i];}
					if(c.parent === this.$.instanceID){ // Ensure this Element has this child.
						c.parent = null; // Child no longer has a parent.
						c.siblings = []; // Child no longer has siblings.
						tC.splice(c.childIndex,1); // Splice it out of the array.
						this.$.element.removeChild(c.element); // Remove from the element node
					}
				}
				this.$._iCSI();
				this.$.recalcSize();
			},
			
			// Escapes from its parent.
			escape: function(){
				// get the parent object.
				var parent = PHRAME.instances[this.$.parent];
				// Make the parent release this Element
				parent.release([this.$]);
			},
			
			// Enters another PHRAME.Element as a child. Index specification optional.
			enter: function(/*PHRAME.Element*/parent, /*number*/index){
				if(typeof(parent) !== 'object'){ return(null); }
				// Make the parent contain this Element at the specified index.
				if(index === null){parent.contain([this.$]);}
				else{parent.contain([this.$],index);}
			},
			
			// Allows the change of child alignment
			alignChildren: function(alignment){
				if(alignment === true || alignment === 'h' || alignment === 'horizontal'){
					alignment = true;
				}else{
					alignment = false;
				}
				if(alignment === this.$.childAlignment){return;}
				this.$.childAlignment = alignment;
				
				for(var i = 0; i < this.$.children.length; i++){
					var c = PHRAME.instances[this.$.children[i]];
					var w = c.getWidth();
					var h = c.getHeight();
					c.setSize({width: h, height: w});
				}
				this.$.recalcSize();
			},
			
			// Sets the text for the element (HTML is permitted)
			setInnerHTML: function(html){
				text = typeof(html) === 'string' ? html : '';
				this.$.element.innerHTML = '<div>'+html+'</div>';
			},
			
			// Applies style objects to this element.
			setStyle: function(/*Array*/style){
				// Reset the attached elements array.
				this.$.styles = [];
				// Execute addElements method.
				this.$.addStyle(style);
			},
			
			// Adds elements to this styling "rule".
			addStyle: function(/*Array*/style){
				if(style == null){ return; }
				style = typeof(style) === 'object' ? style : [style];
				// Initiate the loop.
				for(var i=0;i<style.length;i++){
					// Use more manageable variable name.
					var s = style[i];
					// Make the style aware of this element.
					s.elements.pushUnique(this.$.instanceID);
					// Add the instance ID to this style object.
					// This way, our style instance is aware of what element instances it's modifying.
					this.$.styles.pushUnique(s.instanceID);
				}
				this.$.genStyles();
			},
			
			// Removes a certain style from this element.
			removeStyle: function(){
				
			},
			
			// Generates the CSS styling for this element.
			genStyles: function(){
				for(var i=0; i<this.$.styles.length; i++){
					var s = PHRAME.instances[this.$.styles[i]];
					for(prop in s.properties){
						this.$.element.style[prop] = s.style[prop];
						if(prop === 'width'){ this.$.setWidth(parseFloat(s.style[prop])); }
						if(prop === 'height'){ this.$.setHeight(parseFloat(s.style[prop])); }
					}
				}
				this.$.recalcSize();
			},
			
			// Generates the elements
			generate: function(){
				this.$.autoSize();
				for(var i=0; i<this.$.children.length; i++){
					var c = PHRAME.instances[this.$.children[i]];
					c.generate();
				}
			},
			
			// Installs sibling information to this Element's children 
			// iCSI = installChildSiblingInfo (short for processing reasons)
			_iCSI: function(){
				var cL = this.$.children.length; // Children length
				// Loop through each child.
				for(var i=0; i<cL; i++){
					var c = PHRAME.instances[this.$.children[i]];
					c.childIndex = i; // Allow the child to be aware of its placing in the parent.
					c.siblings = []; // Reset siblings array.
					// Loop through each child again
					for(var j=0; j<cL; j++){
						if(j!=i){c.siblings.push(this.$.children[j]);}
					}
				}
			},
			
			// Recalculate this instance's parent and it's children (which would include this).
			// rPS = recalcParentSizing
			_rPS: function(){
				if(this.$.parent != null){
					PHRAME.instances[this.$.parent].recalcSize();
				}
			}
		}
	});
})();