<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
	<title>PHRAME Demo</title>
	<link href="src/style.css" title="phrame" rel="stylesheet" type="text/css">
	<script type="text/javascript" src="src/phrame.js"></script>
	<script type="text/javascript" src="src/core/element.js"></script>
	
	<script type="text/javascript">
		window.onload = function(){
			var xc = PHRAME.Core;
			
			var other = new xc.Element({element: 'div'});
			
			x.write(other, new xc.Element({element: document.body}));
			
		};
	</script>
	
</head>
<body>
</body>
</html>