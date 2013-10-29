/*! PHRAME - v1.0.0 - 2013-07-08
* http://phoxden.com
* Copyright 2013
* Created by:
*    Fox || Arctic || PHOX || ArcticPHOX || ArcticFox (aka Eric C.)
*/
(function(){
	PHRAME.Class({name: 'Elements.Widget', extend: 'Elements.Element',
		properties: {
			title:	''
		},
		methods: {
			_construct: function(options){
				// Ensure this element name is always div.
				options.element = 'div';
				// Construct this PHRAME.Element child.
				this.$._super._construct(options);
				
				// Create inner Elements
				// Title area
				this.$.title = new PHRAME.Elements.Element({element: 'div', className: 'core-widget-title'});
				this.$.title.setHeight(20);
				// Content area
				this.$.content = new PHRAME.Elements.Element({element: 'div', className: 'core-widget-content'});
				
				this.$.alignChildren('vertical');
				this.$._super.contain([this.$.title, this.$.content]);
			}
		}
	});
})();