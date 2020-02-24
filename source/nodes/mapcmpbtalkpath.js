module.exports = () => {
	const mapcode = ["code/velocity.min.js", "code/kefir201911.min.js", "code/tools.js", "code/mapdata.js", "code/radio.js", "code/mapcoreelements.js", "code/mapdrawp.js", "code/mapdashboard.js", "code/mapstart.js"];
	const mapscore = {soundplaylist: "cmpbtalk", colorplaylist: "industry", textplaylist: "cmpbtalk", nrows:[4,8], ncols:[4,8], m: [2,4], l: [2,4] };
	const name = "cmpbtalk";

	let path = 
	{
		site: {
			id:  "id_"+ Date.now() + "_cmpbtalk",
			uri: name, url: name + ".html",
			title: "count map pulse breathe ::: talks 2020.02",
			subtitle: ``, 
			keywords: ["count map pulse breathe", "index", "project", "webpage"],
			description: "index of cmpb talks 2020.02", 
			code:  [...mapcode, "code/mapcmpbtalkelements.js",  "code/mapcmpbtalkstreams.js"],
			score: mapscore,
			content: `<p>count map pulse breathe ::: talk 2020.20 (Lake Superior Design Retreat on February 28-29) </p>`,
			links: [],
			css: [],
			index: "studio",
			home: { actuate: "onrequest", type: "internal", format: "html", keywords: ["navigation", "home"], title: "home", uri: name, url: name + ".html" },
			access: "all"
		},
		pathpoints: []
		
	};
	const points = [
		{title: "cmpb talk 1", uri: "mapcmpbtalk1", code: [...mapcode, "code/mapcmpbtalkelements.js",  "code/mapcmpbtalkstreams.js"], score: {soundplaylist: mapscore.soundplaylist, colorplaylist: mapscore.colorplaylist, textplaylist: mapscore.textplaylist, nrows:[4,8], ncols:[4,8], m: [4,8], l: [2,4] }},
		{title: "cmpb talk 2", uri: "mapcmpbtalk2", code: [...mapcode, "code/mapcmpbtalkelements.js",  "code/mapcmpbtalkstreams.js"], score: {soundplaylist: mapscore.soundplaylist, colorplaylist: mapscore.colorplaylist, textplaylist: mapscore.textplaylist, nrows:[4,8], ncols:[4,8], m: [2,4], l: [1,2] }},
		{title: "cmpb talk 1: noun", uri: "mapcmpbtalk1noun", code: [...mapcode, "code/mapcmpbtalkelements.js",  "code/mapcmpbtalkstreams.js"], score: {soundplaylist: mapscore.soundplaylist, colorplaylist: mapscore.colorplaylist, textplaylist: mapscore.textplaylist+"noun", nrows:[4,8], ncols:[4,8], m: [4,8], l: [2,4] }},
		{title: "cmpb talk 1: verb", uri: "mapcmpbtalk1verb", code: [...mapcode, "code/mapcmpbtalkelements.js",  "code/mapcmpbtalkstreams.js"], score: {soundplaylist: mapscore.soundplaylist, colorplaylist: mapscore.colorplaylist, textplaylist: mapscore.textplaylist+"verb", nrows:[4,8], ncols:[4,8], m: [4,8], l: [2,4] }},
		{title: "cmpb talk 1: adj", uri: "mapcmpbtalk1adj", code: [...mapcode, "code/mapcmpbtalkelements.js",  "code/mapcmpbtalkstreams.js"], score: {soundplaylist: mapscore.soundplaylist, colorplaylist: mapscore.colorplaylist, textplaylist: mapscore.textplaylist+"adj", nrows:[4,8], ncols:[4,8], m: [4,8], l: [2,4] }},
		{title: "cmpb talk 1: symbol", uri: "mapcmpbtalk1symbol", code: [...mapcode, "code/mapcmpbtalkelements.js",  "code/mapcmpbtalkstreams.js"], score: {soundplaylist: mapscore.soundplaylist, colorplaylist: mapscore.colorplaylist, textplaylist: mapscore.textplaylist+"symbol", nrows:[4,8], ncols:[4,8], m: [4,8], l: [2,4] }}
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
			content: '', 
			keywords: ["countmappulsebreathe", "map", "exhibit", "webpage"],
			description: "text for map ::: " + point.uri, 
			code: point.code, score: point.score,
			links: pathlinks
		});
		// console.log("******###" + JSON.stringify(path.pathpoints[j].score,null,2));
	});
	
	return path;
};