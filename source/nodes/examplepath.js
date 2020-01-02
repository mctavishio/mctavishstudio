module.exports = () => {
	const mapscode = ["code/velocity.min.js", "code/kefir201911.min.js", "code/tools.js", "code/data.js", "code/radio.js", "code/clock.js", "code/mapcoreelements.js", "code/drawp.js", "code/dashboard.js", "code/mapstart.js"];
	
	let path = 
	{
		site: {
			title: 'example path',
			description: 'example path with sine wave tones',
			baseurl: "http://mctavish.studio",
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
				code:  [...mapscode, "code/map3elements.js", "code/map3astreams.js"],
				score: {soundplaylist: "sinewavetones", colorplaylist: "map3", nrows:[4,8], ncols:[4,8], m: [4,8] },
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
				code:  [...mapscode, "code/map3elements.js", "code/map3astreams.js"],
				score: {soundplaylist: "sinewavetones", colorplaylist: "map3", nrows:[4,8], ncols:[4,8], m: [4,8] },
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
				code:  [...mapscode, "code/map3elements.js", "code/map3astreams.js"],
				score: {soundplaylist: "sinewavetones", colorplaylist: "map3", nrows:[4,8], ncols:[4,8], m: [4,8] },
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
				code:  [...mapscode, "code/map3elements.js", "code/map3astreams.js"],
				score: {soundplaylist: "sinewavetones", colorplaylist: "map3", nrows:[4,8], ncols:[4,8], m: [4,8] },
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
			
		]
	}
	console.log(JSON.stringify(path.pathpoints.map(p => p.uri),null,2));
	return path;
};