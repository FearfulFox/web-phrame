PHRAME.DOM.swap = function(element_1, element_2){
	var parent_1 = PHRAME.instances[element_1.parent]; // First parent.
	var childIndex_1 = element_1.childIndex; // First parent.
	var parent_2 = PHRAME.instances[element_2.parent]; // First parent.
	var childIndex_2 = element_2.childIndex; // First parent.
	
	// Escape from their parent Element
	element_1.escape();
	element_2.escape();
	
	// Insert into the other's parent.
	parent_2.contain([element_1], childIndex_2);
	parent_1.contain([element_2], childIndex_1);
};