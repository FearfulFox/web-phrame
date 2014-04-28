/*! $ - v1.0.0 - 2013-07-08
* http://phoxden.com
* Copyright 2013
* Created by:
*    Fox || Arctic || PHOX || ArcticPHOX || ArcticFox (aka Eric C.)
*/
(function(){
	$.Class({name: 'DOM.Widget', extend: 'DOM.Element',
		properties: {
			title:	''
		},
		methods: {
			_construct: function(options){
				var t = this.$;
				// Ensure this element type is always a divider.
				options.element = 'div';
				// Construct this $.Element child.
				t._super._construct(options);
				
				// Create inner Elements
				// Header area
				t.header = new $.DOM.Element({
					element: 'div',
					className: 'elements-widget-header',
					align: 'h'
				});
				t.header.setHeight(14);
				
				// Move icon 
				t.moveIcon = new $.DOM.Element({
					element: 'div',
					className: 'elements-widget-move',
					width: 25,
					height: 14
				});
				
				// Title area 
				t.title = new $.DOM.Element({
					element: 'div',
					className: 'elements-widget-title',
				});
				t.title.setInnerHTML('<span style="font-size:9px;">'+options.title+'</span>');
				
				
				// Content area
				t.content = new $.DOM.Element({
					element: 'div',
					className: 'elements-widget-content'
				});
				
				t.alignChildren('vertical');
				
				t.header.contain([this.$.moveIcon, this.$.title]);
				t._super.contain([this.$.header, this.$.content]);
			},
		
			// @Override
			contain: function(contents, index){
				this.$.content.contain(contents, index);
			}
		}
	});
})();