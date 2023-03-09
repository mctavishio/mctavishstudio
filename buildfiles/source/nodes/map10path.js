module.exports = () => {
	const mapcode = ["code/velocity.min.js", "code/kefir201911.min.js", "code/tools.js", "code/mapdata.js", "code/radio.js", "code/mapcoreelements.js", "code/mapdrawp.js", "code/mapdashboard.js", "code/mapstart.js"];
	const mapscore = {soundplaylist: "ocean", colorplaylist: "industry", nrows:[4,8], ncols:[4,8], m: [2,4] };
	const name = "map10";

	let path = 
	{
		site: {
			id:  "id_"+ Date.now() + "_map10",
			uri: name, url: name + ".html",
			title: "count map pulse breathe ::: map 10",
			subtitle: ``, 
			keywords: ["count map pulse breathe", "index", "project", "webpage"],
			description: "index of map 10 ::: map3 sound", 
			code:  [...mapcode, "code/map10elements.js", "code/map10streams.js"],
			score: mapscore,
			content: `<p>count map pulse breathe ::: map 10 film / sound work</p>`,
			links: [],
			css: [],
			index: "studio",
			home: { actuate: "onrequest", type: "internal", format: "html", keywords: ["navigation", "home"], title: "home", uri: name, url: name + ".html" },
			access: "all"
		},
		pathpoints: []
		
	};
	const points = [
		{title: "map 10a", uri: "map10a", code: [...mapcode, "code/map10elements.js",  "code/map10streams.js"], score: {soundplaylist: mapscore.soundplaylist, colorplaylist: mapscore.colorplaylist, nrows:[4,8], ncols:[4,8], m: [4,8], vimeo: "382957610" }},
		{title: "map 10b", uri: "map10b", code: [...mapcode, "code/map10elements.js",  "code/map10streams.js"], score: {soundplaylist: mapscore.soundplaylist, colorplaylist: mapscore.colorplaylist, nrows:[4,8], ncols:[4,8], m: [8,16], vimeo: "382957610" }},
		];

	points.forEach( ( point, j ) => {
		// let text = texts[j%texts.length];
		let herej = points.map( l => l.uri ).indexOf(point.uri);
		let nextj = (herej+1)%points.length;

		let pathlinks = points.map( ( p, k ) => {
			return {
				actuate: "onrequest", type: "internal", //internal, external
				format: "html", keywords: nextj===k ? ["path", "next"] : ["path"],
				title: p.title, uri: p.uri, url: p.uri + ".html", action: "alert"
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