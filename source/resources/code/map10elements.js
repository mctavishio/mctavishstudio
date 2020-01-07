// ***** ############## dom elements ############## ---------
let addelements = z => {
	z.elements["squares"] = []; 

	Array.from(Array(z.score.m).keys()).forEach(  r => {
		z.elements["squares"].push({ el: document.createElementNS("http://www.w3.org/2000/svg", "rect") });
		z.elements["squares"][r].el.setAttributeNS(null, "id", "squares_r"+r);
		z.elements["squares"][r].el.setAttributeNS(null, "class", "shape square");
		z.elements["svg"].el.appendChild(z.elements["squares"][r].el);
	});
}