var m = {};
var $ = PHRAME;
var $c = PHRAME.Core;

m.bodyStyle = new $.Style({
	backgroundColor : { color : {r : 200, g : 200, b : 200} }
});

m.style = new $.Style({
		color : {r : 0, g : 255, b : 0},
		border : {size : 2, style : 'solid', color : {r : 0, g : 0, b : 255}}
});

m.style2 = new $.Style({
	color : {r : 0, g : 255, b : 0},
	border : {size : 2, style : 'solid', color : {r : 255, g : 0, b : 0}}
});

m.style3 = new $.Style({
	color : {r : 0, g : 255, b : 0},
	border : {size : 2, style : 'solid', color : {r : 0, g : 255, b : 0}}
});

m.style4 = new $.Style({
	height : {size : 10},
	width : {size : 10},
	borderTop : {size : 5, style : 'solid', style2 : 'transparent'},
	borderLeft : {size : 10, style : 'solid', color : {r : 0, g : 255, b : 0}},
	borderBottom : {size : 5, style : 'solid', style2 : 'transparent'}
});

$.Style.select(m.bodyStyle, { element: 'body'});
$.Style.select(m.style2, { object: 'Core.Widget', class: 'sample', element: 'div'});