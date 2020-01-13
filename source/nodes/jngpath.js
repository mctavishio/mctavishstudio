module.exports = () => {
	const mapcode = ["code/velocity.min.js", "code/kefir201911.min.js", "code/tools.js", "code/mapdata.js", "code/radio.js", "code/mapcoreelements.js", "code/mapdrawp.js", "code/mapdashboard.js", "code/mapstart.js"];
	const mapscore = {soundplaylist: "map3", colorplaylist: "map3", nrows:[4,8], ncols:[4,8], m: [2,4] };
	const name = "jng";

	let path = 
	{
		site: {
			id:  "id_"+ Date.now() + "_cmpb",
			uri: name,
			title: "JNG ::: count map pulse breathe",
			subtitle: `for the <a href="http://josephneasegallery.com">JNG</a> exhibit`, 
			keywords: ["count map pulse breathe", "index", "jng", "project", "webpage"],
			description: "index of count map pulse breathe ::: map3 sound", 
			code:  [...mapcode, "code/map5elements.js", "code/map5streams.js"],
			score: mapscore,
			content: `<p>count map pulse breathe with sound from map3 ::: used at the <a href="http://josephneasegallery.com">Joseph Nease Gallery</a> 12/2019 - 2/2020</p>`,
			links: [],
			css: [],
			index: "index",
			home: { actuate: "onrequest", type: "internal", format: "html", keywords: ["navigation", "home"], title: "home", url: name },
		},
		pathpoints: []
		
	};
	// const texts = [
	// 	{
	// 		title: "zip drive vial",
	// 		subtitle: "traces",
	// 		content: `<p><br/>data ::: zip drive from jules ::: tiny vial ::: traces ...<br/><br/>heart beat coordinates<br/>velocities<br/>heat<br/>the body's dimensions<br/>measures ::: movement<br/>change<br/>what it means to be human<br/>these numbers<br/>blood :::<br/>remembering AIDS<br/>epidemic performance<br/>(s)<br/>blood coursing spilled flung drawn tested<br/>the virus tentacular reaching filling expanding ...<br/>the body's battle :::<br/>::: still alive ::: still here ...<br/>cellular resistance street stage ::: performance / words / noise /<br/>life force :::<br/>the physics of life<br/>the contours of loss<br/><br/>time between heart beats (seconds)<br/><br/>flex pulse<br/>breathe`
	// 	},
	// 	{
	// 		title: "the sky ::: the cloud",
	// 		subtitle: "pours",
	// 		content: `<p>chance-infused, open systems ::: a pool ::: generative, networked, multichannel arterial flow :::</p>
	// 		<p>cross-sensory, polyphonic landscapes || the digital web || the sky ::: the cloud<br/>
	// 		pours through glassy screens into this room </p>`
	// 	},
	// 	{
	// 		title: "the infinite bendable between", subtitle: "",
	// 		content: `<p>multi-threaded, dynamical systems ::: chance-infused, emergent patterns</p>
	// 		<p>queer construct ::: personal story || myth &amp; the infinite, bendable between</p>`
	// 	},
	// 	{
	// 		title: "&amp; &amp; &amp;",
	// 		content: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>`
	// 	},
	// 	{
	// 		title: "humans &amp; machines", subtitle: "carbon cycle",
	// 		content: `<p>the porous, intimate boundaries between humans and machines ::: the erotic dynamics of tapping glass :::  the carbon cycle ::: the cyborg body ::: the fragile electric body ::: the resistance cyborg ::: the networked, digital hive mind ::: the swarm.</p>`
	// 	},
	// 	{
	// 		title: "the opacity continuum", subtitle: "film",
	// 		content: `
	// 			<p>the opacity continuum ::: old school films ::: light through celluloid ::: electrified pixels ::: glass .... textile drawings ::: 
	// 			animations piling up on an opaque material ... light casting shadow ... illuminating texture ... physical dimensionality
	// 			::: becoming object
	// 			</p>
	// 			<p>a machine rendering ... projector reeling ... stitch robot piling up drawings ... in space in time</p>
	// 			<p>the difficult leap from frame to frame ... frameless drawing ... multiple layers of single-frame screens</p>
	// 			<p><a><href="http://mctavish.io">mctavish.io</a></p>
	// 			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
	// 			`
	// 	}
	// ];
	const points = [
		{title: "map 3a", uri: "jngmap3a", code: [...mapcode, "code/map3elements.js",  "code/map3astreams.js"], score: {soundplaylist: mapscore.soundplaylist, colorplaylist: mapscore.colorplaylist, nrows:[4,8], ncols:[4,8], m: [4,8] }},
		{title: "map 3b", uri: "jngmap3b", code: [...mapcode, "code/map3elements.js",  "code/map3bstreams.js"], score: {soundplaylist: mapscore.soundplaylist, colorplaylist: mapscore.colorplaylist, nrows:[4,8], ncols:[4,8], m: [4,8] }},
		{title: "map 3c", uri: "jngmap3c", code: [...mapcode, "code/map3elements.js",  "code/map3cstreams.js"], score: {soundplaylist: mapscore.soundplaylist, colorplaylist: mapscore.colorplaylist, nrows:[4,8], ncols:[4,8], m: [4,8] }},
		{title: "map 54", uri: "jngmap54", code: [...mapcode, "code/map5elements.js",  "code/map5streams.js"], score: {soundplaylist: mapscore.soundplaylist, colorplaylist: mapscore.colorplaylist, nrows:[4,8], ncols:[4,8], m: [2,4] }},
		{title: "map 58", uri: "jngmap58", code: [...mapcode, "code/map5elements.js",  "code/map5streams.js"], score: {soundplaylist: mapscore.soundplaylist, colorplaylist: mapscore.colorplaylist, nrows:[4,8], ncols:[4,8], m: [4,8] }},
		{title: "map 88", uri: "jngmap88", code: [...mapcode, "code/map8elements.js",  "code/map8streams.js"], score: {soundplaylist: mapscore.soundplaylist, colorplaylist: mapscore.colorplaylist, nrows:[4,8], ncols:[4,8], m: [4,8] }},
	];

	points.forEach( ( point, j ) => {
		// let text = texts[j%texts.length];
		let herej = points.map( l => l.uri ).indexOf(point.uri);
		let nextj = (herej+1)%points.length;

		let pathlinks = points.map( ( p, k ) => {
			return {
				actuate: "onrequest", type: "internal", //internal, external
				format: "html", keywords: nextj===k ? ["path", "next"] : ["path"],
				title: p.title, url: p.uri
			}
		});
		// console.log("******" + JSON.stringify(pathlinks,null,2));

		path.pathpoints.push( {
			id:  "id_"+ Date.now() + "_" + j, 
			uri: point.uri,
			title: point.title, subtitle: point.uri, 
			content: `<p>count map pulse breathe with sound from map3 ::: used at the <a href="http://josephneasegallery.com">Joseph Nease Gallery</a> 12/2019 - 2/2020</p>`, 
			keywords: ["countmappulsebreathe", "jng", "exhibit", "webpage"],
			description: "count map pulse breathe ::: map ::: " + point.uri, 
			code: point.code, score: point.score,
			links: pathlinks
		});
		// console.log("******###" + JSON.stringify(path.pathpoints[j].links,null,2));
	});
	
	return path;
};