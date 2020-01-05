// ***** ############## dom elements ############## ---------
let addelements = z => {
	z.tools.logmsg("z.score.dataset " + z.score.dataset);
	z.tools.logmsg("z.score.nshapes " + JSON.stringify(z.score.nshapes));
	if(z.score.dataset.includes("hr")) {
		let nshapes = z.score.nshapes["hr"] ? z.score.nshapes["hr"][z.score.versionj]: 2;
		z.elements["hr"] = []; 
		Array.from(Array(nshapes).keys()).forEach(  r => {
			z.elements["hr"][r] = { el: document.createElementNS("http://www.w3.org/2000/svg", "circle") };
			z.elements["hr"][r].el.setAttributeNS(null, "id", "hr_r"+r);
			z.elements["hr"][r].el.setAttributeNS(null, "class", "shape circle");
			z.elements["svg"].el.appendChild(z.elements["hr"][r].el);
		});
	}
	if(z.score.dataset.includes("temp")) {
		let nshapes = z.score.nshapes["temp"] ? z.score.nshapes["temp"][z.score.versionj]: 2;
		z.elements["temp"] = []; 
		Array.from(Array(nshapes).keys()).forEach(  r => {
			z.elements["temp"][r] = { el: document.createElementNS("http://www.w3.org/2000/svg", "line") };
			z.elements["temp"][r].el.setAttributeNS(null, "id", "temp_r"+r);
			z.elements["temp"][r].el.setAttributeNS(null, "class", "shape line");
			z.elements["svg"].el.appendChild(z.elements["temp"][r].el);
		});
	}
	if(z.score.dataset.includes("eda")) {
		let nshapes = z.score.nshapes["eda"] ? z.score.nshapes["eda"][z.score.versionj]: 6;
		z.elements["eda"] = []; 
		Array.from(Array(nshapes).keys()).forEach(  r => {
			z.elements["eda"][r] = { el: document.createElementNS("http://www.w3.org/2000/svg", "rect") };
			z.elements["eda"][r].el.setAttributeNS(null, "id", "eda_r"+r);
			z.elements["eda"][r].el.setAttributeNS(null, "class", "shape rect");
			z.elements["svg"].el.appendChild(z.elements["eda"][r].el);
		});
	}
	if(z.score.dataset.includes("bvp")) {
		let nshapes = z.score.nshapes["bvp"] ? z.score.nshapes["bvp"][z.score.versionj]: 16;
		z.elements["bvp"] = []; 
		z.elements["bvpyline"] = [];
		//create elements
		Array.from(Array(nshapes).keys()).forEach(  r => {
			z.elements["bvpyline"][r] = { el: document.createElementNS("http://www.w3.org/2000/svg", "line") };
			z.elements["bvpyline"][r].el.setAttributeNS(null, "id", "bvpyline"+r);
			z.elements["bvpyline"][r].el.setAttributeNS(null, "class", "shape line");
			z.elements["svg"].el.appendChild(z.elements["bvpyline"][r].el);
		});
		Array.from(Array(nshapes).keys()).forEach(  r => {
			z.elements["bvp"][r] = { el: document.createElementNS("http://www.w3.org/2000/svg", "circle") };
			z.elements["bvp"][r].el.setAttributeNS(null, "id", "bvp_r"+r);
			z.elements["bvp"][r].el.setAttributeNS(null, "class", "shape circle");
			z.elements["svg"].el.appendChild(z.elements["bvp"][r].el);
		});
	}
	if(z.score.dataset.includes("acc")) {
		let nshapes = z.score.nshapes["acc"] ? z.score.nshapes["acc"][z.score.versionj]: 3;
		z.elements["acc"] = []; 
		z.elements["accyline"] = [];
		z.elements["accxline"] = [];
		//create elements
		Array.from(Array(nshapes).keys()).forEach(  r => {
			z.elements["accyline"][r] = { el: document.createElementNS("http://www.w3.org/2000/svg", "line") };
			z.elements["accyline"][r].el.setAttributeNS(null, "id", "accyline"+r);
			z.elements["accyline"][r].el.setAttributeNS(null, "class", "shape line");
			z.elements["svg"].el.appendChild(z.elements["accyline"][r].el);

			z.elements["accxline"][r] = { el: document.createElementNS("http://www.w3.org/2000/svg", "line") };
			z.elements["accxline"][r].el.setAttributeNS(null, "id", "accyline"+r);
			z.elements["accxline"][r].el.setAttributeNS(null, "class", "shape line");
			z.elements["svg"].el.appendChild(z.elements["accxline"][r].el);
		});
		Array.from(Array(nshapes).keys()).forEach(  r => {
			z.elements["acc"][r] = { el: document.createElementNS("http://www.w3.org/2000/svg", "circle") };
			z.elements["acc"][r].el.setAttributeNS(null, "id", "acc_r"+r);
			z.elements["acc"][r].el.setAttributeNS(null, "class", "shape circle");
			z.elements["svg"].el.appendChild(z.elements["acc"][r].el);
		});
	}
}