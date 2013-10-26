var m = {};
// Use this area for testing.
window.onload = function(){
	
	var xc = PHRAME.Core;
	
	m.style = new x.Style({
		color : {r : 0, g : 255, b : 0},
		border : {size : 2, style : 'solid', color : {r : 0, g : 0, b : 255}}
	});
	
	m.style2 = new x.Style({
		color : {r : 0, g : 255, b : 0},
		border : {size : 2, style : 'solid', color : {r : 255, g : 0, b : 0}}
	});
	
	m.style3 = new x.Style({
		color : {r : 0, g : 255, b : 0},
		border : {size : 2, style : 'solid', color : {r : 0, g : 255, b : 0}}
	});
	
	m.style4 = new x.Style({
		height : {size : 10},
		width : {size : 10},
		borderTop : {size : 5, style : 'solid', style2 : 'transparent'},
		borderLeft : {size : 10, style : 'solid', color : {r : 0, g : 255, b : 0}},
		borderBottom : {size : 5, style : 'solid', style2 : 'transparent'}
	});
	
	m.body = new xc.Element({element: document.body});
	m.other = new xc.Element({element: 'div', name: 'other'});
	m.other.alignChildren('vertical');
	
	m.one = new xc.Element({element: 'div'});
	m.one.setHeight(200);
	m.two = new xc.Element({element: 'div'});
	m.three = new xc.Element({element: 'div'});
	m.four = new xc.Window();
	
	m.other.contain([m.one, m.two, m.three]);
	
	m.style.setElements([m.other]);
	m.style2.setElements([m.one, m.three]);
	m.style3.setElements([m.two]);
	
	x.write(m.other, m.body);
	
};