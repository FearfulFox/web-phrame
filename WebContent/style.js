var m = {};
var $ = PHRAME;
var $c = PHRAME.Core;

m.bodyStyle = new $.Style({
	backgroundColor: { color: { r: 80, g: 80, b: 80 } }
});

m.widgetStyle = new $.Style({
	margin: { size: 2 },
	border: { size: 1, style: 'solid', color: { r: 120, g: 120, b: 120 } },
	backgroundColor: { color: { r: 140, g: 140, b: 140 } }
});

m.widgetTitleStyle = new $.Style({
	borderTop: { size: 1, style: 'solid', color: { r: 100, g: 100, b: 100 } },
	borderLeft: { size: 1, style: 'solid', color: { r: 100, g: 100, b: 100 } },
	borderRight: { size: 1, style: 'solid', color: { r: 100, g: 100, b: 100 } },
	backgroundColor: { color: { r: 120, g: 120, b: 120 } }
});

m.widgetContentStyle = new $.Style({
	borderTop: { size: 1, style: 'solid', color: { r: 100, g: 100, b: 100 } },
	borderBottom: { size: 1, style: 'solid', color: { r: 100, g: 100, b: 100 } },
	borderLeft: { size: 1, style: 'solid', color: { r: 100, g: 100, b: 100 } },
	borderRight: { size: 1, style: 'solid', color: { r: 100, g: 100, b: 100 } }
});

$.Style.select(m.bodyStyle, { element: 'body' });
$.Style.select(m.widgetStyle, { object: 'Core.Widget' });
$.Style.select(m.widgetTitleStyle, { class: 'core-widget-title' });
$.Style.select(m.widgetContentStyle, { class: 'core-widget-content' });