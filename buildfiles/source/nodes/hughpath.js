module.exports = () => {
	const mapcode = ["code/velocity.min.js", "code/kefir201911.min.js", "code/tools.js", "code/mapdata.js", "code/radio.js", "code/mapcoreelements.js", "code/mapdrawp.js", "code/mapdashboard.js", "code/mapstart.js"];
	const mapscore = {soundplaylist: "map3", colorplaylist: "map3", nrows:[4,8], ncols:[4,8], m: [2,4] };
	const name = "hugh";

	let path = 
	{
		site: {
			id:  "id_"+ Date.now() + "_cmpb",
			uri: name, url: name + ".html",
			title: "for Hugh ::: count map pulse breathe",
			subtitle: `for the JNG exhibit`, 
			keywords: ["count map pulse breathe", "index", "hugh", "project", "webpage"],
			description: "Hugh index of count map pulse breathe ::: map3 sound", 
			code:  [...mapcode, "code/map5elements.js", "code/map5streams.js"],
			score: mapscore,
			content: `<p>count map pulse breathe with sound from map3 ::: used at the Joseph Nease Gallery 12/2019 - 2/2020</p>`,
			links: [],
			css: [],
			index: "hive",
			home: { actuate: "onrequest", type: "internal", format: "html", keywords: ["navigation", "home"], title: "home", uri: name },
		},
		pathpoints: []
		
	};
	
	const points = [
		{title: "map 3a", uri: "hughmap3a", code: [...mapcode, "code/map3elements.js",  "code/map3astreams.js"], score: {soundplaylist: mapscore.soundplaylist, colorplaylist: mapscore.colorplaylist, nrows:[4,8], ncols:[4,8], m: [4,8] }},
		{title: "map 3b", uri: "hughmap3b", code: [...mapcode, "code/map3elements.js",  "code/map3bstreams.js"], score: {soundplaylist: mapscore.soundplaylist, colorplaylist: mapscore.colorplaylist, nrows:[4,8], ncols:[4,8], m: [4,8] }},
		{title: "map 3c", uri: "hughmap3c", code: [...mapcode, "code/map3elements.js",  "code/map3cstreams.js"], score: {soundplaylist: mapscore.soundplaylist, colorplaylist: mapscore.colorplaylist, nrows:[4,8], ncols:[4,8], m: [4,8] }},
		{title: "map 54", uri: "hughmap54", code: [...mapcode, "code/map5elements.js",  "code/map5streams.js"], score: {soundplaylist: mapscore.soundplaylist, colorplaylist: mapscore.colorplaylist, nrows:[4,8], ncols:[4,8], m: [2,4] }},
		{title: "map 58", uri: "hughmap58", code: [...mapcode, "code/map5elements.js",  "code/map5streams.js"], score: {soundplaylist: mapscore.soundplaylist, colorplaylist: mapscore.colorplaylist, nrows:[4,8], ncols:[4,8], m: [4,8] }},
		{title: "map 88", uri: "hughmap88", code: [...mapcode, "code/map8elements.js",  "code/map8streams.js"], score: {soundplaylist: mapscore.soundplaylist, colorplaylist: mapscore.colorplaylist, nrows:[4,8], ncols:[4,8], m: [4,8] }},
	];

	points.forEach( ( point, j ) => {
		// let text = texts[j%texts.length];
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
			title: point.title, subtitle: point.uri, 
			content: `<p>count map pulse breathe with sound from map3 ::: used at the Joseph Nease Gallery 12/2019 - 2/2020</p>`, 
			keywords: ["countmappulsebreathe", "hugh", "exhibit", "webpage"],
			description: "count map pulse breathe ::: map ::: " + point.uri, 
			code: point.code, score: point.score,
			links: pathlinks
		});
		// console.log("******###" + JSON.stringify(path.pathpoints[j].links,null,2));
	});
	
	return path;
};