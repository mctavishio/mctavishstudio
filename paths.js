module.exports = () => {

	const mapscodecode = ["code/velocity.min.js", "code/kefir201911.min.js", "code/tools.js", "code/data.js", "code/radio.js", "code/clock.js", "code/drawp.js", "code/dashboard.js", "code/startmaps.js"];

	return {
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
				title: "swarm",
				keywords: ["about", "mctavish", "exhibit", "webpage"],
				description: "about the exhibit swarm",
				code:  [...mapscodecode, "code/map3elements.js", "code/map3astreams.js"],
				score: {soundplaylist: "map3", colorplaylist: "map3", nrows:[4,8], ncols:[4,8], m: [4,8] },
				links: [
					{
						actuate: "onload", //onload, onrequest, searchembed
						type: "internal", //internal, external
						format: "html", //pdf,ejs,html,mp3,vimeo
						keywords: ["component"], //ex: reference, next, navigation?
						title: "swarm press",
						url: "swarmpress"
					},
					{
						actuate: "onload", //onload, onrequest, searchembed
						type: "internal", //internal, external
						format: "html", //pdf,ejs,html,mp3,vimeo
						keywords: ["next"], //ex: reference, next, navigation?
						title: "swarm press 2",
						url: "swarmpress2"
					},
					{
						actuate: "onload", //onload, onrequest, searchembed
						type: "internal", //internal, external
						format: "html", //pdf,ejs,html,mp3,vimeo
						keywords: ["next"], //ex: reference, next, navigation?
						title: "swarm press 3",
						url: "swarmpress3"
					},
					{
						actuate: "onrequest", //onload, onrequest, searchembed
						type: "internal", //internal, external
						format: "html", //pdf,ejs,html,mp3,vimeo
						keywords: ["next", "reference"], //ex: reference, next, navigation?
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
				id: "1577680423993",
				uri: "map3a",
				title: "map3a",
				keywords: ["about", "mctavish", "exhibit", "webpage"],
				description: "about the exhibit swarm",
				code: [...mapscodecode, "code/map3elements.js",  "code/map3astreams.js"],
				score: {soundplaylist: "map3", colorplaylist: "map3", nrows:[4,8], ncols:[4,8], m: [4,8] },
				links: [
					{
						actuate: "onrequest", //onload, onrequest, searchembed
						type: "internal", //internal, external
						format: "html", //pdf,ejs,html,mp3,vimeo
						keywords: ["next"], //ex: reference, next, navigation?
						title: "map 3b",
						url: "map3b"
					},
					{
						actuate: "onrequest", //onload, onrequest, searchembed
						type: "external", //internal, external
						format: "html", //pdf,ejs,html,mp3,vimeo
						keywords: ["next"], //ex: reference, next, navigation?
						title: "map 3c",
						url: "http://datapoets.com/maps/map88.html"
					}
				],
				content: 
				`
				<p>count map pulse breathe</p>
				<p><i>map 3a</i></p>
				<p><a><href="http://mctavish.io">mctavish.io</a></p>
				`
			},
			{ 
				id: "1577682264068",
				uri: "map3b",
				title: "map3b",
				keywords: ["about", "mctavish", "exhibit", "webpage"],
				description: "count map pulse breathe ::: map 3b",
				code: [...mapscodecode, "code/map3elements.js", "code/map3bstreams.js"],
				score: {soundplaylist: "map3", colorplaylist: "map3", nrows:[4,8], ncols:[4,8], m: [4,8] },
				links: [
					{
						actuate: "onrequest", //onload, onrequest, searchembed
						type: "internal", //internal, external
						format: "html", //pdf,ejs,html,mp3,vimeo
						keywords: ["next"], //ex: reference, next, navigation?
						title: "map 3c",
						url: "map3b"
					},
					{
						actuate: "onrequest", //onload, onrequest, searchembed
						type: "internal", //internal, external
						format: "html", //pdf,ejs,html,mp3,vimeo
						keywords: ["next"], //ex: reference, next, navigation?
						title: "map 52",
						url: "map52"
					}
				],
				content: 
				`
				<p>count map pulse breathe</p>
				<p><i>map 3b</i></p>
				<p><a><href="http://mctavish.io">mctavish.io</a></p>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
				`
			},
			{ 
				id: "1577683506832",
				uri: "map3c",
				title: "map3c",
				keywords: ["about", "mctavish", "exhibit", "webpage"],
				description: "count map pulse breathe ::: map 3c",
				code: [...mapscodecode, "code/map3elements.js",  "code/map3cstreams.js"],
				score: {soundplaylist: "map3", colorplaylist: "map3", nrows:[4,8], ncols:[4,8], m: [4,8] },
				links: [
					{
						actuate: "onrequest", //onload, onrequest, searchembed
						type: "internal", //internal, external
						format: "html", //pdf,ejs,html,mp3,vimeo
						keywords: ["next"], //ex: reference, next, navigation?
						title: "map 3c",
						url: "map3b"
					},
					{
						actuate: "onrequest", //onload, onrequest, searchembed
						type: "internal", //internal, external
						format: "html", //pdf,ejs,html,mp3,vimeo
						keywords: ["next"], //ex: reference, next, navigation?
						title: "map 52",
						url: "map52"
					}
				],
				content: 
				`
				<p>count map pulse breathe</p>
				<p><i>map 3c</i></p>
				<p><a><href="http://mctavish.io">mctavish.io</a></p>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
				`
			},
			{ 
				id: "1577683506832",
				uri: "map52",
				title: "map 52",
				keywords: ["about", "mctavish", "exhibit", "webpage"],
				description: "count map pulse breathe ::: map 52",
				code: [...mapscodecode, "code/map5elements.js",  "code/map5streams.js"],
				score: {soundplaylist: "map3", colorplaylist: "map3", nrows:[4,8], ncols:[4,8], m: [2,2] },
				links: [
					{
						actuate: "onrequest", //onload, onrequest, searchembed
						type: "internal", //internal, external
						format: "html", //pdf,ejs,html,mp3,vimeo
						keywords: ["next"], //ex: reference, next, navigation?
						title: "map 54",
						url: "map54"
					},
					{
						actuate: "onrequest", //onload, onrequest, searchembed
						type: "internal", //internal, external
						format: "html", //pdf,ejs,html,mp3,vimeo
						keywords: ["next"], //ex: reference, next, navigation?
						title: "map 58",
						url: "map58"
					}
				],
				content: 
				`
				<p>count map pulse breathe</p>
				<p><i>map 3c</i></p>
				<p><a><href="http://mctavish.io">mctavish.io</a></p>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
				`
			},
			{ 
				id: "1577684079210",
				uri: "map54",
				title: "map 54",
				keywords: ["about", "mctavish", "exhibit", "webpage"],
				description: "count map pulse breathe ::: map 54",
				code: [...mapscodecode, "code/map5elements.js",  "code/map5streams.js"],
				score: {soundplaylist: "map3", colorplaylist: "map3", nrows:[4,8], ncols:[4,8], m: [2,4] },
				links: [
					{
						actuate: "onrequest", type: "internal", format: "html",
						keywords: ["next"],
						title: "map 58",
						url: "map52"
					},
					{
						actuate: "onrequest", type: "internal", format: "html",
						keywords: ["next"],
						title: "map 52",
						url: "map52"
					}
				],
				content: 
				`
				<p>count map pulse breathe</p>
				<p><i>map 54</i></p>
				<p><a><href="http://mctavish.io">mctavish.io</a></p>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
				`
			},
			{ 
				id: "1577684300788",
				uri: "map58",
				title: "map 58",
				keywords: ["about", "mctavish", "exhibit", "webpage"],
				description: "count map pulse breathe ::: map 58",
				code: [...mapscodecode, "code/map5elements.js",  "code/map5streams.js"],
				score: {soundplaylist: "map3", colorplaylist: "map3", nrows:[4,8], ncols:[4,8], m: [4,8] },
				links: [
					{
						actuate: "onrequest", type: "internal", format: "html",
						keywords: ["next"],
						title: "map 52",
						url: "map52"
					},
					{
						actuate: "onrequest", type: "internal", format: "html",
						keywords: ["next"],
						title: "map 88",
						url: "map88"
					}
				],
				content: 
				`
				<p>count map pulse breathe</p>
				<p><i>map 58</i></p>
				<p><a><href="http://mctavish.io">mctavish.io</a></p>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
				`
			},
			{ 
				id: "1577684820876",
				uri: "map88",
				title: "map 88",
				keywords: ["about", "mctavish", "exhibit", "webpage"],
				description: "count map pulse breathe ::: map 88",
				code: [...mapscodecode, "code/map8elements.js",  "code/map8streams.js"],
				score: {soundplaylist: "map3", colorplaylist: "map3", nrows:[4,8], ncols:[4,8], m: [4,8] },
				links: [
					{
						actuate: "onrequest", type: "internal", format: "html",
						keywords: ["next"],
						title: "map 54",
						url: "map54"
					},
					{
						actuate: "onrequest", type: "internal", format: "html",
						keywords: ["next"],
						title: "map 3a",
						url: "map3a"
					}
				],
				content: 
				`
				<p>the opacity continuum ::: old school films ::: light through celluloid ::: electrified pixels ::: glass .... textile drawings ::: 
				animations piling up on an opaque material ... light casting shadow ... illuminating texture ... physical dimensionality
				::: becoming object
				</p>
				<p>a machine rendering ... projector reeling ... stitch robot piling up drawings ... in space in time</p>
				<p>the difficult leap from frame to frame ... frameless drawing ... multiple layers of single-frame screens</p>
				<p><a><href="http://mctavish.io">mctavish.io</a></p>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
				`
			},
		]
	}
};