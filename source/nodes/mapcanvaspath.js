module.exports = () => {
	const mapcode = ["code/velocity.min.js", "code/kefir201911.min.js", "code/tools.js", "code/mapdata.js", "code/radio.js", "code/mapcoreelements.js", "code/mapdrawp.js", "code/mapdashboard.js", "code/mapstart.js"];
	const mapscore = {soundplaylist: "ocean", colorplaylist: "industry", nrows:[8,16], ncols:[8,16], m: [4,8], canvas: true };
	const name = "mapcanvas";

	let path = 
	{
		site: {
			id:  "id_"+ Date.now() + "_"+name,
			uri: name, url: name + ".html",
			title: "count map pulse breathe ::: map canvas",
			subtitle: ``, 
			keywords: ["count map pulse breathe", "index", "project", "webpage"],
			description: "index of map canvas ::: canvas and svg exploration", 
			code:  [...mapcode, "code/mapcanvaselements.js", "code/mapcanvasstreams.js"],
			score: mapscore,
			content: `<p>count map pulse breathe ::: map canvas sound work</p>`,
			links: [],
			css: [],
			index: "studio",
			home: { actuate: "onrequest", type: "internal", format: "html", keywords: ["navigation", "home"], title: "home", uri: name, url: name + ".html" },
			access: "all"
		},
		pathpoints: []
		
	};
	const points = [ 
		{title: "map canvas", uri: "mapcanvas0", code: [...mapcode, "code/mapcanvaselements.js",  "code/mapcanvasstreams.js"], score: {soundplaylist: mapscore.soundplaylist, colorplaylist: mapscore.colorplaylist, nrows:[8,16], ncols:[8,16], m: [4,8], canvas: true }},
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