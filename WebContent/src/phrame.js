/*! PHRAME - v1.0.0 - 2013-07-08
* http://phoxden.com
* Copyright 2013
* Created by:
*    Fox || Arctic || PHOX || ArcticPHOX || ArcticFox (aka Eric C.)
*/

(function(){
	// Declared main PHRAME namespace
	var PHRAME = {};
	PHRAME.written = false; // Set to true if PHRAME.write() has been called.
	PHRAME.baseElement = null;
	PHRAME.instances = []; // Instances by ID.
	PHRAME.catInstances = {}; // Instances by PHRAME classes.
	PHRAME.pheInstances = []; // Instances that are only PHRAME.Elements
	
	// Function to write an element into the body of the document.
	PHRAME.write = function(e,b){
		b.autoSize();
		// Write the element to the body [Arctic]
		b.contain([e]);
		// Start the generation function
		b.generate();
		
		// Store the main base element.
		PHRAME.baseElement = b;
		
		// Set the 'written' flag to true;
		PHRAME.written = true;
		
		// Run the styling queue
		PHRAME.Style.runSelectQueue();
		
		return(true);
	};
	
	// Resize function. Ensure all elements are resized properly when the user changes the dimensions of the browser window.
	window.onresize = function(e){
		if(PHRAME.baseElement != null){
			PHRAME.baseElement.recalcSize();
		}
	};
	
	PHRAME.clone = function(obj){
		var rtnObj = {};
		for(var p in obj){
			switch(typeof(obj[p])){
				case 'undefined': rtnObj[p] = undefined; break;
				case 'boolean': rtnObj[p] = Boolean(obj[p]); break;
				case 'number': rtnObj[p] = Number(obj[p]); break;
				case 'string': rtnObj[p] = String(obj[p]); break;
				case 'object':
					if(Object.prototype.toString.call(obj[p]) === '[object Array]'){
						rtnObj[p] = obj[p].slice(0);
					}else if(obj[p] === null){
						rtnObj[p] = null;
					}else{
						rtnObj[p] = PHRAME.clone(obj[p]);
					}
				break;
			}
		}
		return(rtnObj);
	};
	
	PHRAME.cloneInto = function(inObj, fromObj){
		for(var p in fromObj){
			switch(typeof(fromObj[p])){
				case 'undefined': inObj[p] = undefined; break;
				case 'null': inObj[p] = null; break;
				case 'boolean': inObj[p] = Boolean(fromObj[p]); break;
				case 'number': inObj[p] = Number(fromObj[p]); break;
				case 'string': inObj[p] = String(fromObj[p]); break;
				case 'object':
					if(Object.prototype.toString.call(fromObj[p]) === '[object Array]'){
						inObj[p] = fromObj[p].slice(0);
					}else if(fromObj[p] === null){
						inObj[p] = null;
					}else{
						inObj[p] = PHRAME.clone(fromObj[p]);
					}
				break;
			}
		}
	};
	
	// Define the class extension function.
	// STRING name = Name of the class.
	// OBJECT object = the class object.
	PHRAME.Class = function(param){
		
		// Check for namespaces in the class name.
		var classPath = param.name.split('.');
		
		// Create constructor
		var constructFunc = function(options){
			
			this.$ = this;
			if(this._super != null){this._super.$ = this;}
			
			var cateName = this.classFullName;
			PHRAME.catInstances[cateName] = PHRAME.catInstances[cateName] || [];
			PHRAME.catInstances[cateName].push(this);
			
			if(this.className != 'Style'){
				PHRAME.pheInstances.push(this);
			}
			
			PHRAME.instances.push(this);
			this.instanceID = (PHRAME.instances.length - 1);
			
			// Create the properties if their defined for this "class"
			if(this._properties != null){
				 PHRAME.cloneInto(this, this._properties);
			}
			
			if(this._construct != null){
				if(options == null){options = {};}
				this._construct(options);
			}
		};
		
		// Store the PHRAME namespace as the "Current Namespace" (cN).
		// Every time we go further into the namespace, we push this out.
		// May be a bit confusing, but the comments in the loop should help.
		var cN = PHRAME;
		// This will be defined as the "Current Object" (cO).
		var cO = null;
		// Loop through the classPath and check/create namespaces and the object.
		for(var i=0; i < classPath.length; i++){
			// Store the current index into a more manageable name.
			var cP = classPath[i];
			// If this is the last item in the classPath array,
			// Let's now create the actual object
			if(i === (classPath.length-1)){
				// Now to create the object in the current working namespace.
				cN[cP] = constructFunc;
				// Define the prototype.
				cO = cN[cP].prototype;
				// Set class info
				cO.className = cP;
				cO.classFullName = param.name;
				cO._properties = {};
				break;
			}else{
				// Check if the namespace doesn't exist.
				if(typeof(cN[cP]) === 'undefined'){
					// Add the new namespace to the current one we're on.
					cN[cP] = {};
				}
				// This next line pretty much makes the next namespace our working one.
				cN = cN[cP];
			}
		}
		
		// Add the object properties
		if(typeof(param.properties) === 'object'){
			// Place the object from the parameter into an object (does that make sense? mmm)
			var obj = param.properties;
			// loop through the object and add the objects.
			for(var p in obj){
				// Add all properties and methods to the "class"
				cO._properties[p] = obj[p];
			}
		}
		
		// Add the object methods
		if(typeof(param.methods) === 'object'){
			// Place the object from the parameter into an object (again, does that make sense? mmm)
			var obj = param.methods;
			// loop through the object and add the objects.
			for(var p in obj){
				// Add all properties and methods to the "class"
				cO[p] = obj[p];
			}
		}
		
		// Check for extended PHRAME Classes
		if(param.extend == undefined){ return; }
		// Split the extended PHRAME Class path
		var path = param.extend.split('.');
		// Start the current namespace which will eventually be the object to extend.
		var ext = PHRAME;
		// Loop until we get our extended object.
		for(var i=0; i < path.length; i++){
			// More manageable name for the current path index.
			var p = path[i];
			// Loop to the next namespace.
			ext = ext[p];
		}
		
		// Ensure we found the function. Exit, otherwise.
		if(typeof(ext) !== 'function'){ return; }
		var eobj = ext.prototype;
		
		// Reset/Declare _super object.
		cO._super = {};
		// loop through the object and add the objects.
		for(var p in eobj){
			// Always add the extended object's properties to cO's super.
			cO._super[p] = eobj[p];
			// If the property doesn't already exist.
			if(cO[p] == undefined){
				// Add this property to the object.
				cO[p] = eobj[p];
			// If the property we're trying to copy are properties, clone them
			// into this new "class"
			}else if(p === '_properties'){
				PHRAME.cloneInto(cO[p], eobj[p]);
			}
		}
	};
	
	// Make the objects global. [Arctic]
	window.PHRAME = PHRAME;
	
	// Object Extensions
	Array.prototype.pushUnique = function(value){
		var found = false;
	    for(var i=0; i<this.length; i++){
	    	var a = this[i];
	    	if(a === value){
	    		found = true;
	    		break;
	    	}
	    }
	    
	    if(found === false){this.push(value);}
	};
	
}());
