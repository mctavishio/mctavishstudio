module.exports = () => {
	const mapscodecode = ["code/velocity.min.js", "code/kefir201911.min.js", "code/tools.js", "code/data.js", "code/radio.js", "code/clock.js", "code/mapcoreelements.js", "code/drawp.js", "code/dashboard.js", "code/mapstart.js"];

	let paths = [
	{
		site: {
			title: 'mctavish.io',
			description: 'website for kathy mctavish',
			baseurl: "http://mctavish.io",
			basecss: [],
			basejavascript: [],
			sourcepath: 'source',
			outputpath: 'web',
			csspath: 'css',
			javascriptpath: 'code',
			datapath: 'data',
			startpathpoint: "swarm",
			home: {
						actuate: "onrequest", //onload, onrequest, searchembed
						type: "internal", //internal, external
						format: "html", //pdf,ejs,html,mp3,vimeo
						keywords: ["navigation", "home"], //ex: reference, next, navigation?
						title: "home",
						url: "swarm"
			},
			next: {
						actuate: "onrequest", //onload, onrequest, searchembed
						type: "internal", //internal, external
						format: "html", //pdf,ejs,html,mp3,vimeo
						keywords: ["navigation", "next"], //ex: reference, next, navigation?
						title: "next",
						url: "swarm"
			},
		},
		pathpoints: [
			{ 
				id: "1576970236172",
				uri: "swarm",
				title: "test example ::: swarm",
				keywords: ["about", "mctavish", "exhibit", "webpage"],
				description: "exhibit swarm",
				code:  [...mapscodecode, "code/map3elements.js", "code/map3astreams.js"],
				score: {soundplaylist: "map3", colorplaylist: "map3", nrows:[4,8], ncols:[4,8], m: [4,8] },
				links: [
					{ url: "swarmpress3", actuate: "onload", type: "internal", title: "swarm press 3", keywords: ["next"], format: "html" },
					{ url: "swarmpress", actuate: "onload", type: "internal", title: "swarm press", keywords: ["component"], format: "html" },
					{ url: "swarmpress2", actuate: "onload", type: "internal", title: "swarm press 2", keywords: ["next"], format: "html" },
					{ url: "map58", actuate: "onrequest", type: "internal", title: "map 58", keywords: ["next", "reference"], format: "html" },
					{ url: "map88", actuate: "onrequest", type: "internal", title: "map 88", keywords: ["next", "reference"], format: "html" }
				],
				content: 
				`
				<p>about the swarm exhibit</p>
				<p><i>"There is no such thing as repetition. Only insistance."
					― Gertrude Stein</i></p>
				<p><a><href="http://mctavish.io">mctavish.io</a></p>
				`
			},
			{ 
				id: "1576959636186",
				uri: "swarmpress",
				title: "swarm press",
				keywords: ["press", "mctavish", "exhibit", "links"],
				description: "press links for the exhibit swarm",
				links: [
					{
						title: "Sun Yung Shin catalogue essay",
						url: "http://blueboatfilms.com/text/swarm/FINALAOV10ShinEssay.pdf"
					},
					{
						title: "award announcement",
						url: "http://northern.lights.mn/platform/artist-on-the-verge-10/"
					}, 
				],
				content: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>'
			},
			{ 
				id: "1577751180938",
				uri: "swarmpress2",
				title: "swarm press 2",
				keywords: ["press", "mctavish", "exhibit", "links"],
				description: "press links for the exhibit swarm",
				links: [
					{
						title: "Sun Yung Shin catalogue essay",
						url: "http://blueboatfilms.com/text/swarm/FINALAOV10ShinEssay.pdf"
					},
					{
						title: "award announcement",
						url: "http://northern.lights.mn/platform/artist-on-the-verge-10/"
					}, 
				],
				content: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>'
			},
			{ 
				id: "1577767576515",
				uri: "swarmpress3",
				title: "swarm press 3",
				keywords: ["press", "mctavish", "exhibit", "links"],
				description: "press links for the exhibit swarm",
				links: [
					{
						title: "Sun Yung Shin catalogue essay",
						url: "http://blueboatfilms.com/text/swarm/FINALAOV10ShinEssay.pdf"
					},
					{
						title: "award announcement",
						url: "http://northern.lights.mn/platform/artist-on-the-verge-10/"
					}, 
				],
				content: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>'
			},
			{ 
				id: "1577816344977",
				uri: "countmappulsebreathe",
				title: "count map pulse breathe",
				keywords: ["about", "mctavish", "exhibit", "webpage"],
				description: "exhibit count map pulse breathe",
				code:  [...mapscodecode, "code/map3elements.js", "code/map3astreams.js"],
				score: {soundplaylist: "map3", colorplaylist: "map3", nrows:[4,8], ncols:[4,8], m: [4,8] },
				links: [
					{
						actuate: "onrequest", type: "internal", format: "html",
						keywords: ["next", "reference"],
						title: "map 58",
						url: "map58"
					},
					{
						actuate: "onrequest", type: "internal", format: "html",
						keywords: ["next", "reference"],
						title: "map 88",
						url: "map88"
					}
				],
				content: 
				`
				<p>links for count map pulse breathe</p>
				<p><i>"There is no such thing as repetition. Only insistance."
					― Gertrude Stein</i></p>
				<p><a><href="http://mctavish.io">mctavish.io</a></p>
				`
			},
		]
	},
	];

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
		{uri: "map3a", code: [...mapscodecode, "code/map3elements.js",  "code/map3astreams.js"], score: {soundplaylist: "map3", colorplaylist: "map3", nrows:[4,8], ncols:[4,8], m: [4,8] }, next: ["map3b", "map3c", "map54", "map58", "map88"]},
		{uri: "map3b", code: [...mapscodecode, "code/map3elements.js",  "code/map3bstreams.js"], score: {soundplaylist: "map3", colorplaylist: "map3", nrows:[4,8], ncols:[4,8], m: [4,8] }, next: ["map3c", "map3a", "map54", "map58", "map88"]},
		{uri: "map3c", code: [...mapscodecode, "code/map3elements.js",  "code/map3cstreams.js"], score: {soundplaylist: "map3", colorplaylist: "map3", nrows:[4,8], ncols:[4,8], m: [4,8] }, next: ["map54", "map58", "map88", "map3a", "map3b"]},
		{uri: "map54", code: [...mapscodecode, "code/map5elements.js",  "code/map5streams.js"], score: {soundplaylist: "map3", colorplaylist: "map3", nrows:[4,8], ncols:[4,8], m: [2,4] }, next: ["map58", "map88", "map3a", "map3b", "map3c"]},
		{uri: "map58", code: [...mapscodecode, "code/map5elements.js",  "code/map5streams.js"], score: {soundplaylist: "map3", colorplaylist: "map3", nrows:[4,8], ncols:[4,8], m: [4,8] }, next: ["map88", "map3a", "map3b", "map3c", "map54"]},
		{uri: "map88", code: [...mapscodecode, "code/map8elements.js",  "code/map8streams.js"], score: {soundplaylist: "map3", colorplaylist: "map3", nrows:[4,8], ncols:[4,8], m: [4,8] }, next: ["map3a", "map3b", "map3c", "map54", "map58"]},
	]
	points.forEach( ( p, j ) => {
		let text = texts[j%texts.length];
		let links = p.next.map( next => {
			return {
				actuate: "onrequest", type: "internal", //internal, external
				format: "html", keywords: ["next"],
				title: next, url: next
			}
		});
		// console.log(JSON.stringify(links,null,2));

		paths[0].pathpoints.push( {
			id: Date.now(), uri: p.uri, title: text.title, subtitle: p.uri, 
			content: text.content, 
			keywords: ["countmappulsebreathe", "exhibit", "webpage"],
			description: "text for map ::: " + p.uri, code: p.code, score: p.score,
			links: links
		});
	});
	// console.log(JSON.stringify(paths[0].pathpoints.map(p => p.uri),null,2));
	return paths[0];
};