window.PHRAME = window.PHRAME ? window.PHRAME : {};
window.PHRAME.DOC = window.PHRAME.DOC ? window.PHRAME.DOC : {};

window.PHRAME.DOC.Element = {
		Properties : [
			{
				name : 'element',
				type : 'object',
				desc : 'The DOM Element object type. Reference for this object can be found on MDN: https://developer.mozilla.org/en-US/docs/Web/API/Element.'
			},
			
			{
				name : 'classes',
				type : 'array',
				desc : 'An array of style class names. Pretty much an array of anything you want to put in the class attribute. ["x", "y"] applies class="x y" to the processed DOM-Element.'
			},
			
			{
				name : 'width',
				type : 'number',
				desc : 'A number that represents the width this element should be in pixels. A null value will make the width automatically valued to fit within its parent.'
			},
			
			{
				name : 'height',
				type : 'number',
				desc : 'A number that represents the height this element should be in pixels. A null value will make the height automatically valued to fit within its parent.'
			},
			
			{
				name : 'x',
				type : 'number',
				desc : 'The relative x-value, to its parent, the element should be positioned. Only works if the PHRAME-Element is floating. Pretty much applies style="left:x;" to the DOM-Element.'
			},
			
			{
				name : 'y',
				type : 'number',
				desc : 'The relative y-value, to its parent, the element should be positioned. Only works if the PHRAME-Element is floating. Pretty much applies style="top:y;" to the DOM-Element.'
			},
			
			{
				name : 'marginW',
				type : 'number',
				desc : 'Stores the total margin width applied to this element through styling.'
			},
			
			{
				name : 'marginH',
				type : 'number',
				desc : 'Stores the total margin height applied to this element through styling.'
			},
			
			{
				name : 'borderW',
				type : 'number',
				desc : 'Stores the total border width applied to this element through styling.'
			},
			
			{
				name : 'borderH',
				type : 'number',
				desc : 'Stores the total border height applied to this element through styling.'
			},
			
			{
				name : 'paddingW',
				type : 'number',
				desc : 'Stores the total padding width applied to this element through styling.'
			},
			
			{
				name : 'paddingH',
				type : 'number',
				desc : 'Stores the total padding height applied to this element through styling.'
			},
			
			{
				name : 'offW',
				type : 'number',
				desc : 'Stores the total non-traditional (margin + border + padding) width.'
			},
			
			{
				name : 'offH',
				type : 'number',
				desc : 'Stores the total non-traditional (margin + border + padding) height.'
			},
			
			{
				name : 'proportion',
				type : 'number',
				desc : 'The size ratio this element should be when aligned with other siblings. Range: [0, 100].'
			},
			
			{
				name : 'parent',
				type : 'number',
				desc : 'The instance ID of this object\'s PHRAME-Element parent.'
			},
			
			{
				name : 'overlay',
				type : 'number',
				desc : 'The instance ID of this object\'s PHRAME-Element that is layered on top of it.'
			},
			
			{
				name : 'siblings',
				type : 'array',
				desc : 'Array of PHRAME-Element instance IDs that are sibling to this object. (siblings of its DOM-Element)'
			},
			
			{
				name : 'children',
				type : 'array',
				desc : 'Array of PHRAME-Element instance IDs that are this object\'s children (nested within its DOM-Element).'
			},
			
			{
				name : 'childIndex',
				type : 'number',
				desc : 'The index value of where this PHRAME-Element is located within its parent. It specifies the order it should be in against its siblings.'
			},
			
			{
				name : 'styles',
				type : 'array',
				desc : 'Array of PHRAME-Style instance IDs that are to be applied to this object.'
			},
			
			{
				name : 'floating',
				type : 'boolean',
				desc : 'Determines if the PHRAME-Element is floating within its parent or not. (true = Is floating; false = Not floating)'
			},
			
			{
				name : 'maximized',
				type : 'boolean',
				desc : 'Determines if the PHRAME-Element is maximized within its parent or not. (true = Is maximized; false = Not maximized)'
			},
			
			{
				name : 'childAlignment',
				type : 'boolean',
				desc : 'The alignment this object should align its children in. (true = Horizontal; false = Vertical)'
			},
			
			{
				name : 'events',
				type : 'object',
				desc : 'An object that stores the type of event with an array of functions that should be triggers upon its invoke.'
			},
			
			{
				name : 'fRestoreData',
				type : 'object',
				desc : 'Temporary storage of this object\'s properties before floating, so that it may be restored back to its original settings.'
			}
		],
		Functions : {
			
		}
};