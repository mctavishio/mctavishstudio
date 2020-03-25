module.exports = () => {
	const mapcode = ["code/velocity.min.js", "code/kefir201911.min.js", "code/tools.js", "code/mapdata.js", "code/radio.js", "code/mapcoreelements.js", "code/mapdrawp.js", "code/mapdashboard.js", "code/mapstart.js"];
	const mapscore = {soundplaylist: "howana", colorplaylist: "industry", textplaylist: "hawonalines", nrows:[4,8], ncols:[4,8], m: [2,4], l: [2,4] };
	const name = "nlhowl";

	let path = 
	{
		site: {
			id:  "id_"+ Date.now() + "_nlhowl",
			uri: name, url: name + ".html",
			title: "northern lights howl ::: 2020.04",
			subtitle: ``, 
			keywords: ["northern lights", "hawona", "howl","index", "project", "webpage"],
			description: "index of cmpb talks 2020.02", 
			code:  [...mapcode, "code/mapnlhowlelements.js",  "code/mapnlhowlstreams.js"],
			score: mapscore,
			content: `<p>Northern Lights.mn howl fundraiser ::: 2020.04 ::: text by Hawona Sullivan Janzen </p>`,
			links: [],
			css: [],
			index: "swarm",
			home: { actuate: "onrequest", type: "internal", format: "html", keywords: ["navigation", "home"], title: "home", uri: name, url: name + ".html" },
			access: "all"
		},
		pathpoints: []
		
	};
	const points = [
		{title: "howl all", uri: "mapnlhowl", code: [...mapcode, "code/mapnlhowlelements.js",  "code/mapnlhowlstreams.js"], score: {soundplaylist: mapscore.soundplaylist, colorplaylist: mapscore.colorplaylist, textplaylist: mapscore.textplaylist, nrows:[4,8], ncols:[4,8], m: [4,8], l: [2,4] }}
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
			keywords: ["northern lights", "hawona", "howl","index", "project", "webpage"],
			description: "text for map ::: " + point.uri, 
			code: point.code, score: point.score,
			links: pathlinks
		});
		// console.log("******###" + JSON.stringify(path.pathpoints[j].score,null,2));
	});
	
	return path;
};