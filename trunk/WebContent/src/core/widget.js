/*! $ - v1.0.0 - 2013-07-08
* http://phoxden.com
* Copyright 2013
* Created by:
*    Fox || Arctic || PHOX || ArcticPHOX || ArcticFox (aka Eric C.)
*/
(function(){
	$.Class({name: 'Elements.Widget', extend: 'Elements.Element',
		properties: {
			title:	''
		},
		methods: {
			_construct: function(options){
				// Ensure this element name is always div.
				options.element = 'div';
				// Construct this $.Element child.
				this.$._super._construct(options);
				
				// Create inner Elements
				// Header area
				this.$.header = new $.Elements.Element({
					element: 'div',
					className: 'elements-widget-header',
					align: 'h'
				});
				this.$.header.setHeight(14);
				
				// Move icon 
				this.$.moveIcon = new $.Elements.Element({
					element: 'div',
					className: 'elements-widget-move',
					width: 25,
					height: 14
				});
				
				// Title area 
				this.$.title = new $.Elements.Element({
					element: 'div',
					className: 'elements-widget-title',
				});
				this.$.title.setInnerHTML('<span style="font-size:9px;">'+options.title+'</span>');
				
				
				// Content area
				this.$.content = new $.Elements.Element({
					element: 'div',
					className: 'elements-widget-content'
				});
				
				this.$.alignChildren('vertical');
				
				this.$.header.contain([this.$.moveIcon, this.$.title]);
				this.$._super.contain([this.$.header, this.$.content]);
			},
		
			// @Override
			contain: function(contents, index){
				this.$.content.contain(contents, index);
			}
		}
	});
})();