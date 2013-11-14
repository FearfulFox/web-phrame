var m = {};
var $c = PHRAME.Elements;
var $s = PHRAME.Styles;

m.bodyStyle = new $s.Style({
	backgroundColor: { color: { r: 120, g: 120, b: 120 } }
});

var dB = 20;
m.widgetStyle = new $s.Style({
	margin: { size: 2 },
	border: { size: 1, style: 'solid', color: { r: dB, g: dB, b: dB } },
	backgroundColor: { color: { r: 180, g: 180, b: 180 } },
	boxShadow: { size1: 0, size2: 0, size3: 1, color: { r: 45, g: 45, b: 45 } },
	borderRadius: { size: 4 }
});

m.widgetHeaderStyle = new $s.Style({
	backgroundColor: { color: { r: 60, g: 60, b: 60 } },
});

m.widgetMoveStyle = new $s.Style({
	borderTop: { size: 25, style: 'solid', color: { r: dB, g: dB, b: dB } },
	borderRight: { size: 25, style: 'solid', visibility: 'transparent' },
});

m.widgetTitleStyle = new $s.Style({
	color: { r: 245, g: 245, b: 245 },
	padding: { size1: 0, size2: 5, size3: 0, size4: 5 },
});

m.widgetMaximizeStyle = new $s.Style({
	color: { r: 245, g: 245, b: 245 },
	padding: { size1: 0, size2: 5, size3: 0, size4: 5 },
});

m.widgetContentStyle = new $s.Style({
	borderTop: { size: 1, style: 'solid', color: { r: dB, g: dB, b: dB } },
});

$s.select(m.bodyStyle, { element: 'body' });

$s.select(m.widgetStyle, { object: 'Elements.Widget' });
$s.select(m.widgetHeaderStyle, { className: 'elements-widget-header' });
$s.select(m.widgetMoveStyle, { className: 'elements-widget-move' });
$s.select(m.widgetTitleStyle, { className: 'elements-widget-title' });
$s.select(m.widgetContentStyle, { className: 'elements-widget-content' });