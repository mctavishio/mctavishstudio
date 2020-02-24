// ***** ############## dom elements ############## ---------
let addelements = z => {
	z.elements["circles"] = []; 
	z.elements["lines"] = [];

	Array.from(Array(z.score.m).keys()).forEach(  r => {
		z.elements["lines"][r] = []; 
		Array.from(Array(4).keys()).forEach(  c => {
			z.elements["lines"][r][c] = { el: document.createElementNS("http://www.w3.org/2000/svg", "line") };
			z.elements["lines"][r][c].el.setAttributeNS(null, "id", "lines_r"+r+"c"+c);
			z.elements["lines"][r][c].el.setAttributeNS(null, "class", "shape line");
			z.elements["svg"].el.appendChild(z.elements["lines"][r][c].el);
		})
	});
	Array.from(Array(z.score.m).keys()).forEach(  r => {
		z.elements["circles"][r] = []; 
		Array.from(Array(2).keys()).forEach(  c => {
			z.elements["circles"][r][c] = { el: document.createElementNS("http://www.w3.org/2000/svg", "circle") };
			z.elements["circles"][r][c].el.setAttributeNS(null, "id", "circles_r"+r+"c"+c);
			z.elements["circles"][r][c].el.setAttributeNS(null, "class", "shape circle");
			z.elements["svg"].el.appendChild(z.elements["circles"][r][c].el);
		})
	});
}