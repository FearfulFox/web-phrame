/*! PHRAME - v1.0.0 - 2013-07-08
* http://phoxden.com
* Copyright (2013) Eric Crowell
* Created by:
*    Arctic || PHOX || ArcticPHOX (aka Eric C.)
*/

(function(){
	// Declared main PHRAME namespace
	var PHRAME = {};
	PHRAME.namespaces = [];
	PHRAME.classes = [];
	
	// Function to write an element into the body of the document.
	PHRAME.write = function(e,b){
		
		b.fillSize();
		// Write the element to the body [Arctic]
		b.contain([e]);
		
		return(true);
	};
	
	// Define the class extension function.
	// STRING name = Name of the class.
	// OBJECT object = the class object.
	PHRAME.Class = function(param){
		
		// Check for namespaces in the class name.
		var classPath = param.name.split(".");
		
		// Create constructor
		var constructFunc = function(options){
			if(this._construct != undefined){
				if(typeof(options) === 'undefined'){options = {};}
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
		
		// Add the object properties and methods
		if(typeof(param.object) === 'object'){
			// Place the object from the parameter into an object
			var obj = param.object;
			// loop through the object and add the objects.
			for(var p in obj){
				// Add all properties and methods to the "class"
				cO[p] = obj[p];
			}
		}
	};
	
	// Make the objects global. [Arctic]
	window.PHRAME = PHRAME;
	window.x = PHRAME;
}());
