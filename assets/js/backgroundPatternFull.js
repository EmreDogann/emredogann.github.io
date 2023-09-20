function wrap_children(el, wrapper, counter) {
	el.prepend(wrapper);
	if (!counter) {
		counter = el.childNodes.length;
	}
	for(i = 0; i < counter-1;  i++) {
		wrapper.appendChild( el.childNodes[1] );
	}
}

var span = document.getElementById('backgroundPattern');
var svg = span.getElementsByTagName('svg')[0];
var svg_bBox = svg.getBBox();

var patternElement = document.createElementNS("http://www.w3.org/2000/svg", 'pattern');
patternElement.setAttribute("id", "pattern");
patternElement.setAttribute("x", "0");
patternElement.setAttribute("y", "0");
patternElement.setAttribute("width", Math.round(svg_bBox.width));
patternElement.setAttribute("height", Math.round(svg_bBox.height));
patternElement.setAttribute("patternUnits", "userSpaceOnUse");
patternElement.setAttribute("patternTransform", `scale(${span.dataset.patternScale} ${span.dataset.patternScale})`);
wrap_children(svg, patternElement);

var defsElement = document.createElementNS("http://www.w3.org/2000/svg", 'defs');
svg.appendChild(defsElement);
defsElement.appendChild(patternElement);

var patternRectElement = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
patternRectElement.setAttribute("x", "0");
patternRectElement.setAttribute("y", "0");
patternRectElement.setAttribute("width", "100%");
patternRectElement.setAttribute("height", "100%");
patternRectElement.setAttribute("fill", "url(#pattern)");
svg.appendChild(patternRectElement);

if (span.hasAttribute("data-pattern-fade")) {
	var linGradElement = document.createElementNS("http://www.w3.org/2000/svg", 'linearGradient');
	linGradElement.setAttribute("id","fadeGrad");
	linGradElement.setAttribute("x1","0");
	linGradElement.setAttribute("y1","0");
	linGradElement.setAttribute("x2","0");
	linGradElement.setAttribute("y2","1");
	defsElement.appendChild(linGradElement);

	var stopElement = document.createElementNS("http://www.w3.org/2000/svg", 'stop');
	stopElement.setAttribute("offset", "patternFadeStart" in span.dataset ? span.dataset.patternFadeStart : "0.41");
	stopElement.setAttribute("stop-color", "white");
	stopElement.setAttribute("stop-opacity", "0");
	linGradElement.appendChild(stopElement);

	var stopElement2 = document.createElementNS("http://www.w3.org/2000/svg", 'stop');
	stopElement2.setAttribute("offset", "1");
	stopElement2.setAttribute("stop-color", "white");
	stopElement2.setAttribute("stop-opacity", "1");
	linGradElement.appendChild(stopElement2);

	var maskElement = document.createElementNS("http://www.w3.org/2000/svg", 'mask');
	maskElement.setAttribute("id", "fadeMask");
	defsElement.appendChild(maskElement);

	var maskRectElement = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
	maskRectElement.setAttribute("width", "100%");
	maskRectElement.setAttribute("height", "100%");
	maskRectElement.setAttribute("fill", "url(#fadeGrad)");
	maskElement.appendChild(maskRectElement);

	patternRectElement.setAttribute("mask", "url(#fadeMask)");
}

span.style.opacity = 1;

{/* HTML we are creating in the svg.
<defs>
	<pattern id="pattern" x="0" y="0" width="1024" height="1024" patternUnits="userSpaceOnUse" patternTransform="scale(0.3 0.3)">
	...
	</pattern>
	
	<linearGradient id="fadeGrad" x1="0" y1="0" x2="0" y2="1">
		<stop offset="0.6" stop-color="white" stop-opacity="0"/>
		<stop offset="1" stop-color="white" stop-opacity="1"/>
	</linearGradient>

	<mask id="fadeMask">
		<rect width="100%" height="100%" fill="url(#fadeGrad)"/>
	</mask>
</defs>
...
<rect x="0" y="0" width="100%" height="100%" fill="url(#pattern)" mask="url(#fadeMask)" />
*/ }