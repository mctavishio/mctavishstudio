module.exports = {
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
					keywords: ["navigation"], //ex: reference, next, navigation?
					title: "home",
					url: "swarm"
		},
		next: {
					actuate: "onrequest", //onload, onrequest, searchembed
					type: "internal", //internal, external
					format: "html", //pdf,ejs,html,mp3,vimeo
					keywords: ["navigation"], //ex: reference, next, navigation?
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
			code: ["code/map54draw.js", "code/start0.js"],
			score: {soundplaylist: "map3", colorplaylist: "map3"},
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
					actuate: "onrequest", //onload, onrequest, searchembed
					type: "internal", //internal, external
					format: "html", //pdf,ejs,html,mp3,vimeo
					keywords: ["component"], //ex: reference, next, navigation?
					title: "**swarm press",
					url: "swarmpress"
				},
				{
					actuate: "onrequest", //onload, onrequest, searchembed
					type: "external", //internal, external
					format: "html", //pdf,ejs,html,mp3,vimeo
					keywords: ["next"], //ex: reference, next, navigation?
					title: "map 58",
					url: "http://datapoets.com/maps/map58.html"
				},
				{
					actuate: "onrequest", //onload, onrequest, searchembed
					type: "external", //internal, external
					format: "html", //pdf,ejs,html,mp3,vimeo
					keywords: ["next"], //ex: reference, next, navigation?
					title: "map 88",
					url: "http://datapoets.com/maps/map88.html"
				}
			],
			content: 
			`
			<p>about the swarm exhibit</p>
			<p><i>test test</i></p>
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
			id: "1577680423993",
			uri: "map3a",
			title: "map3a",
			keywords: ["about", "mctavish", "exhibit", "webpage"],
			description: "about the exhibit swarm",
			code: ["code/map3elements.js", "code/map3astreams.js", "code/startmaps.js"],
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
					title: "map 88",
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
			code: ["code/map3elements.js", "code/map3bstreams.js", "code/startmaps.js"],
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
					title: "map 88",
					url: "http://datapoets.com/maps/map88.html"
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
			code: ["code/map3elements.js", "code/map3bstreams.js", "code/startmaps.js"],
			score: {soundplaylist: "map3", colorplaylist: "map3", nrows:[4,8], ncols:[4,8], m: [4,8] },
			links: [
				{
					actuate: "onrequest", //onload, onrequest, searchembed
					type: "internal", //internal, external
					format: "html", //pdf,ejs,html,mp3,vimeo
					keywords: ["next"], //ex: reference, next, navigation?
					title: "map 3a",
					url: "map3a"
				},
				{
					actuate: "onrequest", //onload, onrequest, searchembed
					type: "external", //internal, external
					format: "html", //pdf,ejs,html,mp3,vimeo
					keywords: ["next"], //ex: reference, next, navigation?
					title: "map 88",
					url: "http://datapoets.com/maps/map88.html"
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
			code: ["code/map5elements.js", "code/map5streams.js", "code/startmaps.js"],
			score: {soundplaylist: "map3", colorplaylist: "map3", nrows:[4,8], ncols:[4,8], m: [2,2] },
			links: [
				{
					actuate: "onrequest", //onload, onrequest, searchembed
					type: "internal", //internal, external
					format: "html", //pdf,ejs,html,mp3,vimeo
					keywords: ["next"], //ex: reference, next, navigation?
					title: "map 3a",
					url: "map3a"
				},
				{
					actuate: "onrequest", //onload, onrequest, searchembed
					type: "external", //internal, external
					format: "html", //pdf,ejs,html,mp3,vimeo
					keywords: ["next"], //ex: reference, next, navigation?
					title: "map 88",
					url: "http://datapoets.com/maps/map88.html"
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
			code: ["code/map5elements.js", "code/map5streams.js", "code/startmaps.js"],
			score: {soundplaylist: "map3", colorplaylist: "map3", nrows:[4,8], ncols:[4,8], m: [2,4] },
			links: [
				{
					actuate: "onrequest", //onload, onrequest, searchembed
					type: "internal", //internal, external
					format: "html", //pdf,ejs,html,mp3,vimeo
					keywords: ["next"], //ex: reference, next, navigation?
					title: "map 52",
					url: "map52"
				},
				{
					actuate: "onrequest", //onload, onrequest, searchembed
					type: "external", //internal, external
					format: "html", //pdf,ejs,html,mp3,vimeo
					keywords: ["next"], //ex: reference, next, navigation?
					title: "map 88",
					url: "http://datapoets.com/maps/map88.html"
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
			code: ["code/map5elements.js", "code/map5streams.js", "code/startmaps.js"],
			score: {soundplaylist: "map3", colorplaylist: "map3", nrows:[4,8], ncols:[4,8], m: [4,8] },
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
					type: "external", //internal, external
					format: "html", //pdf,ejs,html,mp3,vimeo
					keywords: ["next"], //ex: reference, next, navigation?
					title: "map 88",
					url: "http://datapoets.com/maps/map88.html"
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
			code: ["code/map8elements.js", "code/map8streams.js", "code/startmaps.js"],
			score: {soundplaylist: "map3", colorplaylist: "map3", nrows:[4,8], ncols:[4,8], m: [4,8] },
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
					type: "external", //internal, external
					format: "html", //pdf,ejs,html,mp3,vimeo
					keywords: ["next"], //ex: reference, next, navigation?
					title: "map 88",
					url: "http://datapoets.com/maps/map88.html"
				}
			],
			content: 
			`
			<p>count map pulse breathe</p>
			<p><i>map 88</i></p>
			<p><a><href="http://mctavish.io">mctavish.io</a></p>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
			`
		},
	],
};