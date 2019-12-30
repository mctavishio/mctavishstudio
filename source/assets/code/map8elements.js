// ***** ############## dom elements ############## ---------
let createelements = z => {
	let elements = {};
	elements["body"] = { el: document.querySelector("body") };
	elements["body"].el.setAttribute("id", "body");
	elements["clock"] = { el: document.querySelector("#clock") };
	elements["telegraph"] = { el: document.querySelector("#telegraph") };
	elements["stage"] = { el: document.createElement("div") };
	elements["stage"].el.setAttribute("id", "stage");
	elements["stage"].el.setAttribute("class", "frame");
	elements["stage"].el.setAttribute("style", "background-color: #191918");
	elements["body"].el.appendChild(elements["stage"].el);
	elements["text"] = { el: document.createElement("div") };
	elements["text"].el.setAttribute("id", "text");
	elements["text"].el.setAttribute("class", "absolute large");
	elements["stage"].el.appendChild(elements["text"].el);
	elements["svg"] = { el: document.createElementNS("http://www.w3.org/2000/svg", "svg") };
	elements["svg"].el.setAttributeNS(null, "id", "svg");
	elements["svg"].el.setAttributeNS(null, "class", "frame");
	elements["svg"].el.setAttributeNS(null, "width", window.innerWidth);
	elements["svg"].el.setAttributeNS(null, "height", window.innerHeight);
	elements["circles"] = []; 
	elements["squares"] = []; 
	elements["lines"] = [];
	Array.from(Array(z.nrows).keys()).forEach(  r => {
		elements["squares"][r] = []; 
		Array.from(Array(z.ncols).keys()).forEach(  c => {
			elements["squares"][r].push({ el: document.createElementNS("http://www.w3.org/2000/svg", "rect") });
			elements["squares"][r][c].el.setAttributeNS(null, "id", "squares_r"+r+"c"+c);
			elements["squares"][r][c].el.setAttributeNS(null, "class", "shape square");
			elements["svg"].el.appendChild(elements["squares"][r][c].el);
		})
	});
	Array.from(Array(z.m).keys()).forEach(  r => {
		elements["lines"][r] = []; 
		Array.from(Array(4).keys()).forEach(  c => {
			elements["lines"][r][c] = { el: document.createElementNS("http://www.w3.org/2000/svg", "line") };
			elements["lines"][r][c].el.setAttributeNS(null, "id", "lines_r"+r+"c"+c);
			elements["lines"][r][c].el.setAttributeNS(null, "class", "shape line");
			elements["svg"].el.appendChild(elements["lines"][r][c].el);
		})
	});
	Array.from(Array(z.m).keys()).forEach(  r => {
		elements["circles"][r] = []; 
		Array.from(Array(2).keys()).forEach(  c => {
			elements["circles"][r][c] = { el: document.createElementNS("http://www.w3.org/2000/svg", "circle") };
			elements["circles"][r][c].el.setAttributeNS(null, "id", "circles_r"+r+"c"+c);
			elements["circles"][r][c].el.setAttributeNS(null, "class", "shape circle");
			elements["svg"].el.appendChild(elements["circles"][r][c].el);
		})
	});
	elements["box"] = { el: document.createElementNS("http://www.w3.org/2000/svg", "rect") };
	elements["box"].el.setAttributeNS(null, "id", "box");
	elements["box"].el.setAttributeNS(null, "class", "shape square");
	elements["svg"].el.appendChild(elements["box"].el);
	elements["stage"].el.appendChild(elements["svg"].el);

	return elements;
}