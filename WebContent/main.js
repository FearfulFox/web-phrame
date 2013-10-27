
window.onload = function(){
	
	m.body = new $c.Element({element: document.body});
	
	m.main = new $c.Element({element: 'div'});
	
	m.other = new $c.Element({element: 'div', class: 'sample'});
	m.other.alignChildren('vertical');
	
	m.other2 = new $c.Element({element: 'div'});
	
	m.one = new $c.Element({element: 'div'});
	m.one.setHeight(200);
	m.two = new $c.Element({element: 'div', class: 'sample' });
	m.three = new $c.Element({element: 'div'});
	m.four = new $c.Widget({class: 'sample'});
	
	m.other.contain([m.one, m.two, m.four]);
	m.main.contain([m.other, m.other2]);
	
	m.style.setElement([m.other]);
	m.style2.setElement([m.one, m.three]);
	m.style3.setElement([m.two, m.other2]);
	
	$.write(m.main, m.body);	
};