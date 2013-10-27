/*! PHRAME - v1.0.0 - 2013-07-08
* http://phoxden.com
* Copyright 2013
* Created by:
*    Fox || Arctic || PHOX || ArcticPHOX || ArcticFox (aka Eric C.)
*/
(function(){
	PHRAME.Class({name: 'Core.Widget', extend: 'Core.Element',
		properties: {
			
		},
		methods: {
			_construct: function(options){
				// Ensure this element name is always div.
				options.element = 'div';
				// Construct this PHRAME.Element child.
				this.$._super._construct(options);
			}
		}
	});
})();