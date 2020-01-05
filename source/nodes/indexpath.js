module.exports = () => {
	const mapcode = ["code/velocity.min.js", "code/kefir201911.min.js", "code/tools.js", "code/mapdata.js", "code/radio.js", "code/mapcoreelements.js", "code/mapdrawp.js", "code/mapdashboard.js", "code/mapstart.js"];
	
	let path = 
	{
		site: {
			title: 'example path',
			description: 'example path with sine wave tones',
			baseurl: "http://mctavish.studio",
			basecss: ["css/draw.css"],
			basecode: mapcode,
			basescore: {soundplaylist: "sinewavetones", colorplaylist: "map3", nrows:[4,8], ncols:[4,8], m: [4,8] },
			sourcepath: 'source',
			archivepath: 'source/nodes/archive',
			resourcepath: 'source/resources',
			outputpath: 'web',
			csspath: 'css',
			codepath: 'code',
			datapath: 'data',
			path: ["swarm"],
			home: {
						actuate: "onrequest", //onload, onrequest, searchembed
						type: "internal", //internal, external
						format: "html", //pdf,ejs,html,mp3,vimeo
						keywords: ["navigation", "home"], //ex: reference, next, navigation?
						title: "home",
						url: "index"
			},
			next: {
						actuate: "onrequest", //onload, onrequest, searchembed
						type: "internal", //internal, external
						format: "html", //pdf,ejs,html,mp3,vimeo
						keywords: ["navigation", "next"], //ex: reference, next, navigation?
						title: "next",
						url: "countmappulsebreathe"
			},
		},
		pathpoints: [
			{ 
				id: "1577934251637",
				uri: "index",
				title: "mctavish studio links",
				keywords: ["about", "mctavish", "exhibit", "webpage"],
				description: "mctavish studio",
				code:  [...mapcode, "code/map3elements.js", "code/map3astreams.js"],
				score: {soundplaylist: "sinewavetones", colorplaylist: "map3", nrows:[4,8], ncols:[4,8], m: [4,8] },
				links: [
					{ url: "countmappulsebreathe", actuate: "onrequest", type: "internal", title: "count map pulse breathe", keywords: ["path"], format: "html" },
					{ url: "swarm", actuate: "onrequest", type: "internal", title: "swarm", keywords: ["path"], format: "html" }
				],
				content: 
				`
				<p><i>"There is no such thing as repetition. Only insistance."
					― Gertrude Stein</i></p>
				<p><a><href="http://mctavish.io">mctavish.io</a></p>
				`
			},
		]
	}
	console.log(JSON.stringify(path.pathpoints.map(p => p.uri),null,2));
	return path;
};