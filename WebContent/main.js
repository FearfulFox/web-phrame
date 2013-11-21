
window.onload = function(){
	
	m.body = new $c.Element({element: document.body});
	
	m.main = new $c.Element({element: 'div'});
	
	m.other = new $c.Element({element: 'div', className: 'sample', align: 'v'});
	
	m.other2 = new $c.Element({element: 'div'});
	
	m.one = new $c.Widget({title: 'Widget <strong>ONE</strong>'});
	m.one.setProportion(50);
	m.two = new $c.Widget({title: 'Widget <strong>TWO</strong>' });
	m.three = new $c.Widget({ title: 'Widget <strong>THREE</strong>' });
	
	m.four = new $c.Widget({ title: 'Widget <strong>FOUR</strong>' });
	m.five = new $c.Widget({ title: 'Widget <strong>FIVE</strong>' });
	
	m.six = new $c.Widget({ title: 'Widget <strong>SIX</strong>' });
	m.seven = new $c.Widget({ title: 'Widget <strong>SEVEN</strong>' });
	
	m.other2.contain([m.four, m.five]);
	
	m.other.contain([m.one, m.two, m.three]);
	m.main.contain([m.other, m.other2]);
	
	$.write(m.main, m.body);
};