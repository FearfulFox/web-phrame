<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
	<meta http-equiv="X-UA-Compatible" content="IE=edge" >
	<title>PHRAME Demo</title>
	<link href="src/style.css" title="phrame" rel="stylesheet" type="text/css">
	<script type="text/javascript" src="src/phrame.js"></script>
	<script type="text/javascript" src="src/math.js"></script>
	<script type="text/javascript" src="src/style/style.js"></script>
	<script type="text/javascript" src="src/core/elements_global.js"></script>
	<script type="text/javascript" src="src/core/element.js"></script>
	<script type="text/javascript" src="src/core/widget.js"></script>
	
	<script type="text/javascript" src="doc/element.js"></script>

	<script>
		var m = {};
		
		// Styles
		m.widgetStyle = new $.CSO.Style({
			margin: { size: 2 },
			border: { size: 1, style: 'solid', color: { r: 20, g: 20, b: 20 } },
			backgroundColor: { color: { r: 200, g: 200, b: 200 } },
			boxShadow: { size1: 0, size2: 0, size3: 1, color: { r: 45, g: 45, b: 45 } },
			borderRadius: { size: 4 }
		});
		
		m.itemTitleStyle = new $.CSO.Style({
			paddingLeft: { size: 10 },
			fontSize: { size: 12 },
			fontWeight: { type: 'bold' },
		});
		
		m.itemStyle = new $.CSO.Style({
			paddingLeft: { size: 20 },
			fontSize: { size: 12 },
			fontWeight: { type: 'bold' },
		});
		
		$.CSO.select(m.widgetStyle, { className : 'widget' });
		$.CSO.select(m.itemTitleStyle, { className : 'itemTitle' });
		$.CSO.select(m.itemTitleStyle, { className : 'item' });
		
		// Start function
		window.onload = function(){
			// Some of the major elements
			m.main = new $.DOM.Element({e: 'div', a: 'h'});
			
			m.glossary = new $.DOM.Element({e: 'div', c: 'widget', w: 320, a: 'v'});
			m.content = new $.DOM.Element({e: 'div', c: 'widget'});
			
			// elements for items to be listed horizontally
			var elementDoc = $.DOC.Element;
			m.title = {}
			for(var prop in elementDoc){
				m.title[prop] = new $.DOM.Element({e: 'div', h: 20, c: 'itemTitle'});
				m.title[prop].setInnerHTML(prop);
				m.glossary.contain(m.title[prop]);
			}
			
			m.main.contain([m.glossary, m.content]);
			m.main.alignChildren('h');
			
			$.write(m.main);
		};
	</script>
</head>
<body>
</body>
</html>