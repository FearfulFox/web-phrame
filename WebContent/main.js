
window.onload = function(){
	
	m.body = new $c.Element({element: document.body});
	
	m.main = new $c.Element({element: 'div'});
	
	m.other = new $c.Element({element: 'div', className: 'sample'});
	m.other.alignChildren('vertical');
	
	m.other2 = new $c.Element({element: 'div'});
	
	m.one = new $c.Widget({element: 'div'});
	m.one.setProportion(60);
	m.two = new $c.Widget({element: 'div', className: 'sample' });
	m.two.setProportion(20);
	m.three = new $c.Widget({element: 'div'});
	m.four = new $c.Widget({className: 'sample'});
	
	m.five = new $c.Widget({element: 'div'});
	m.six = new $c.Widget({element: 'div'});
	
	m.other2.contain([m.five, m.six]);
	
	m.other.contain([m.one, m.two, m.four]);
	m.main.contain([m.other, m.other2]);
	
	$.write(m.main, m.body);
};