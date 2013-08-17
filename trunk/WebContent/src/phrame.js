/*! PHRAME - v1.0.0 - 2013-07-08
* http://phoxden.com
* Copyright (2013) Eric Crowell
* Created by:
*    Arctic || PHOX || ArcticPHOX (aka Eric C.)
*/
// Declared main PHRAME namespace [Arctic] 
PHRAME = {};
// Declared Core namespace in PHRAME namespace [Arctic] 
PHRAME.Core = {};

// PHRAME Globals [Arctic]
PHG = {};
// Function to write an element into the body of the document. [Arctic]
PHG.write = function(e,b){
	
	// Write the element to the body
	b.contain([e]);
	
	b.fillSize();
	
	return(true);
};
