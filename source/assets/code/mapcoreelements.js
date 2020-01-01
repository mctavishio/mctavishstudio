// ***** ############## dom elements ############## ---------
let addcoreelements = z => {
	z.elements["body"] = { el: document.querySelector("body") };
	z.elements["body"].el.setAttribute("id", "body");
	z.elements["clock"] = { el: document.querySelector("#clock") };
	z.elements["telegraph"] = { el: document.querySelector("#telegraph") };
	z.elements["contentframe"] = { el: document.querySelector("#contentframe") };
	z.elements["controls"] = { el: document.querySelector("#controls") };
	z.elements["nextlink"] = { el: document.querySelector("#next") };
	z.elements["homelink"] = { el: document.querySelector("#home") };
	z.elements["soundlink"] = { el: document.querySelector("#sound") };
	z.elements["aboutlink"] = { el: document.querySelector("#about") };
	z.elements["aboutmctavishlink"] = { el: document.querySelector("#aboutmctavish") };
	z.elements["hidelink"] = { el: document.querySelector("#hide") };
	z.elements["menulink"] = { el: document.querySelector("#menu") };
	z.elements["stage"] = { el: document.createElement("div") };
	z.elements["stage"].el.setAttribute("id", "stage");
	z.elements["stage"].el.setAttribute("class", "frame");
	z.elements["body"].el.appendChild(z.elements["stage"].el);
	z.elements["svg"] = { el: document.createElementNS("http://www.w3.org/2000/svg", "svg") };
	z.elements["svg"].el.setAttributeNS(null, "id", "svg");
	z.elements["svg"].el.setAttributeNS(null, "class", "frame");
	z.elements["svg"].el.setAttributeNS(null, "width", window.innerWidth);
	z.elements["svg"].el.setAttributeNS(null, "height", window.innerHeight);
	z.elements["box"] = { el: document.createElementNS("http://www.w3.org/2000/svg", "rect") };
	z.elements["box"].el.setAttributeNS(null, "id", "box");
	z.elements["box"].el.setAttributeNS(null, "class", "shape square");
	z.elements["svg"].el.appendChild(z.elements["box"].el);
	z.elements["stage"].el.appendChild(z.elements["svg"].el);
	z.elements["texts"] = [];
	let l = Math.max(1, Math.floor(z.m/2));
	Array.from(Array(z.m).keys()).forEach(  (r,j) => {
		z.elements["texts"][r] = { el: document.createElement("div") };
		z.elements["texts"][r].el.setAttribute("id", "text"+j);
		z.elements["texts"][r].el.setAttribute("class", "absolute large zhigh");
		z.elements["stage"].el.appendChild(z.elements["texts"][r].el);
	});
}