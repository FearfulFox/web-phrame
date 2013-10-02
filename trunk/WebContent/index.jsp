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
	<script type="text/javascript" src="src/style/style.js"></script>
	<script type="text/javascript" src="src/core/element.js"></script>
	
	<script type="text/javascript">
		var m = {};
		// Use this area for testing.
		window.onload = function(){
			var xc = PHRAME.Core;
			
			m.style = new PHRAME.Style({
				color : {r : 0, g : 255, b : 0},
				border : {width : 2, style : 'solid', color : {r : 255, g : 255, b : 0}}
			});
			
			m.body = new xc.Element({element: document.body});
			m.other = new xc.Element({element: 'div'});
			
			m.one = new xc.Element({element: 'div'});
			m.two = new xc.Element({element: 'div'});
			
			m.other.contain([m.one, m.two]);
			
			x.write(m.other, m.body);
			
		};
	</script>
	
</head>
<body>
</body>
</html>