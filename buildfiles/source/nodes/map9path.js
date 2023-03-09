module.exports = () => {
	const mapcode = ["code/velocity.min.js", "code/kefir201911.min.js", "code/tools.js", "code/mapdata.js", "code/radio.js", "code/mapcoreelements.js", "code/mapdrawp.js", "code/mapdashboard.js", "code/mapstart.js"];
	const mapscore = {soundplaylist: "map3", colorplaylist: "primary", nrows:[4,8], ncols:[4,8], m: [2,4] };
	const name = "map9";

	let path = 
	{
		site: {
			id:  "id_"+ Date.now() + "_map9",
			uri: name, url: name + ".html",
			title: "count map pulse breathe ::: map 9",
			subtitle: ``, 
			keywords: ["count map pulse breathe", "index", "project", "webpage"],
			description: "index of map 9 ::: map3 sound", 
			code:  [...mapcode, "code/map9elements.js", "code/map9streams.js"],
			score: mapscore,
			content: `<p>count map pulse breathe ::: map 9 film / sound work</p>`,
			links: [],
			css: [],
			index: "studio",
			home: { actuate: "onrequest", type: "internal", format: "html", keywords: ["navigation", "home"], title: "home", uri: name, url: name + ".html" },
			access: "all"
		},
		pathpoints: []
		
	};
	const texts = [
		{
			title: "zip drive vial",
			subtitle: "traces",
			content: `<p><br/>data ::: zip drive from jules ::: tiny vial ::: traces ...<br/><br/>heart beat coordinates<br/>velocities<br/>heat<br/>the body's dimensions<br/>measures ::: movement<br/>change<br/>what it means to be human<br/>these numbers<br/>blood :::<br/>remembering AIDS<br/>epidemic performance<br/>(s)<br/>blood coursing spilled flung drawn tested<br/>the virus tentacular reaching filling expanding ...<br/>the body's battle :::<br/>::: still alive ::: still here ...<br/>cellular resistance street stage ::: performance / words / noise /<br/>life force :::<br/>the physics of life<br/>the contours of loss<br/><br/>time between heart beats (seconds)<br/><br/>flex pulse<br/>breathe`
		},
		{
			title: "the sky ::: the cloud",
			subtitle: "pours",
			content: `<p>chance-infused, open systems ::: a pool ::: generative, networked, multichannel arterial flow :::</p>
			<p>cross-sensory, polyphonic landscapes || the digital web || the sky ::: the cloud<br/>
			pours through glassy screens into this room </p>`
		},
		{
			title: "the infinite bendable between", subtitle: "",
			content: `<p>multi-threaded, dynamical systems ::: chance-infused, emergent patterns</p>
			<p>queer construct ::: personal story || myth &amp; the infinite, bendable between</p>`
		},
		{
			title: "&amp; &amp; &amp;",
			content: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>`
		},
		{
			title: "humans &amp; machines", subtitle: "carbon cycle",
			content: `<p>the porous, intimate boundaries between humans and machines ::: the erotic dynamics of tapping glass :::  the carbon cycle ::: the cyborg body ::: the fragile electric body ::: the resistance cyborg ::: the networked, digital hive mind ::: the swarm.</p>`
		},
		{
			title: "the opacity continuum", subtitle: "film",
			content: `
				<p>the opacity continuum ::: old school films ::: light through celluloid ::: electrified pixels ::: glass .... textile drawings ::: 
				animations piling up on an opaque material ... light casting shadow ... illuminating texture ... physical dimensionality
				::: becoming object
				</p>
				<p>a machine rendering ... projector reeling ... stitch robot piling up drawings ... in space in time</p>
				<p>the difficult leap from frame to frame ... frameless drawing ... multiple layers of single-frame screens</p>
				<p><a><href="http://mctavish.io">mctavish.io</a></p>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
				`
		}
	];
	const points = [
		{title: "map 9a", uri: "map9a", code: [...mapcode, "code/map9elements.js",  "code/map9streams.js"], score: {soundplaylist: mapscore.soundplaylist, colorplaylist: mapscore.colorplaylist, nrows:[4,8], ncols:[4,8], m: [4,8], vimeo: "382957610" }},
		{title: "map 9b", uri: "map9b", code: [...mapcode, "code/map9elements.js",  "code/map9streams.js"], score: {soundplaylist: mapscore.soundplaylist, colorplaylist: mapscore.colorplaylist, nrows:[4,8], ncols:[4,8], m: [4,8], vimeo: "382957610" }},
		];

	points.forEach( ( point, j ) => {
		let text = texts[j%texts.length];
		let herej = points.map( l => l.uri ).indexOf(point.uri);
		let nextj = (herej+1)%points.length;

		let pathlinks = points.map( ( p, k ) => {
			return {
				actuate: "onrequest", type: "internal", //internal, external
				format: "html", keywords: nextj===k ? ["path", "next"] : ["path"],
				title: p.title, uri: p.uri, url: p.uri + ".html", action: "traverse"
			}
		});
		// console.log("******" + JSON.stringify(pathlinks,null,2));

		path.pathpoints.push( {
			id:  "id_"+ Date.now() + "_" + j, 
			uri: point.uri, url: point.uri + ".html",
			title: text.title, subtitle: point.uri, 
			content: text.content, 
			keywords: ["countmappulsebreathe", "exhibit", "webpage"],
			description: "text for map ::: " + point.uri, 
			code: point.code, score: point.score,
			links: pathlinks
		});
		// console.log("******###" + JSON.stringify(path.pathpoints[j].score,null,2));
	});
	
	return path;
};