var m = {};
var $ = PHRAME;
var $c = PHRAME.Elements;
var $s = PHRAME.Styles;

m.bodyStyle = new $s.Style({
	backgroundColor: { color: { r: 80, g: 80, b: 80 } }
});

m.widgetStyle = new $s.Style({
	margin: { size: 2 },
	border: { size: 1, style: 'solid', color: { r: 120, g: 120, b: 120 } },
	backgroundColor: { color: { r: 140, g: 140, b: 140 } }
});

m.widgetTitleStyle = new $s.Style({
	borderTop: { size: 1, style: 'solid', color: { r: 100, g: 100, b: 100 } },
	borderLeft: { size: 1, style: 'solid', color: { r: 100, g: 100, b: 100 } },
	borderRight: { size: 1, style: 'solid', color: { r: 100, g: 100, b: 100 } },
	backgroundColor: { color: { r: 120, g: 120, b: 120 } }
});

m.widgetContentStyle = new $s.Style({
	borderTop: { size: 1, style: 'solid', color: { r: 100, g: 100, b: 100 } },
	borderBottom: { size: 1, style: 'solid', color: { r: 100, g: 100, b: 100 } },
	borderLeft: { size: 1, style: 'solid', color: { r: 100, g: 100, b: 100 } },
	borderRight: { size: 1, style: 'solid', color: { r: 100, g: 100, b: 100 } }
});

$s.select(m.bodyStyle, { element: 'body' });
$s.select(m.widgetStyle, { object: 'Elements.Widget' });
$s.select(m.widgetTitleStyle, { className: 'core-widget-title' });
$s.select(m.widgetContentStyle, { className: 'core-widget-content' });