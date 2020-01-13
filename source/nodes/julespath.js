module.exports = () => {
	const mapcode = ["code/velocity.min.js", "code/kefir201911.min.js", "code/tools.js", "code/radio.js", "code/mapcoreelements.js", "code/julesdrawp.js", "code/mapdata.js", "code/mapdashboard.js", "code/julesstart.js", "code/juleselements.js", "code/julesstreams.js"];
	const datacode = ["code/JulesTestSession_10.14.19/acc.js", "code/JulesTestSession_10.14.19/bvp.js", "code/JulesTestSession_10.14.19/temp.js", "code/JulesTestSession_10.14.19/hr.js", "code/JulesTestSession_10.14.19/eda.js"];
	let mappath = [];
	const mapcontrols = ["home", "next", "about"];
	const nshapes = {acc: [2,3], bvp: [8,16], eda: [3,6], hr: [2,2], temp: [2,2]};
	let mapscore = {nshapes: nshapes, nrows:[4,8], ncols:[4,8], m: [4,8], soundplaylist: "map3", colorplaylist: "jules", tickrate: .125, dataset: ["acc", "bvp", "eda", "hr", "temp"]};
	const name = "jules";

	let path = 
	{
		site: {
			id:  "id_"+ Date.now() + "_jules",
			uri: name,
			title: 'jules data research',
			description: 'research with jules rosskam ::: film / data',
			subtitle: "jules data index",
			keywords: ["rosskam", "mctavish", "data", "film", "webpage"],
			description: "index of count map pulse breathe ::: map3 sound", 
			code:  [...mapcode, ...datacode],
			score: mapscore,
			content: ``,
			links: [],
			css: [],
			index: "studio",
			home: { actuate: "onrequest", type: "internal", format: "html", keywords: ["navigation", "home"], title: "home", url: name }
		},
		pathpoints: [
		]
	};

	const points = [
		{uri: "julessketch2019.10.14_all_2", title: "2019.10.14 all data ::: grayscale jules film", score: {nshapes: nshapes, nrows:[4,8], ncols:[4,8], m: [4,8], soundplaylist: "map3", colorplaylist: "jules", tickrate: .125, dataset: ["acc", "bvp", "eda", "hr", "temp"], video: "382475998" } },
		{uri: "julessketch2019.10.14_acc_2", title: "2019.10.14 acc data ::: grayscale jules film", score: {nshapes: nshapes, nrows:[4,8], ncols:[4,8], m: [4,8], soundplaylist: "map3", colorplaylist: "jules", tickrate: .25, dataset: ["acc"], video: "382475998" } },
		{uri: "julessketch2019.10.14_bvp_2", title: "2019.10.14 bvp data ::: grayscale jules film", score: {nshapes: nshapes, nrows:[4,8], ncols:[4,8], m: [4,8], soundplaylist: "map3", colorplaylist: "jules", tickrate: .125, dataset: ["bvp"], video: "382475998" } },
		{uri: "julessketch2019.10.14_eda_2", title: "2019.10.14 eda data ::: grayscale jules film", score: {nshapes: nshapes, nrows:[4,8], ncols:[4,8], m: [4,8], soundplaylist: "map3", colorplaylist: "jules", tickrate: .5, dataset: ["eda"], video: "382475998" } },
		{uri: "julessketch2019.10.14_hr_2", title: "2019.10.14 hr data ::: grayscale jules film", score: {nshapes: nshapes, nrows:[4,8], ncols:[4,8], m: [4,8], soundplaylist: "map3", colorplaylist: "jules", tickrate: 1, dataset: ["hr"], video: "382475998" } },
		{uri: "julessketch2019.10.14_temp_2", title: "2019.10.14 temp data ::: grayscale jules film", score: {nshapes: nshapes, nrows:[4,8], ncols:[4,8], m: [4,8], soundplaylist: "map3", colorplaylist: "jules", tickrate: .5, dataset: ["temp"], video: "382475998" } },
		{uri: "julessketch2019.10.14_all_1", title: "2019.10.14 all data ::: abstracted jules film", score: {nshapes: nshapes, nrows:[4,8], ncols:[4,8], m: [4,8], soundplaylist: "map3", colorplaylist: "jules", tickrate: .125, dataset: ["acc", "bvp", "eda", "hr", "temp"], video: "382500846" } },
		{uri: "julessketch2019.10.14_acc_1", title: "2019.10.14 acc data ::: abstracted jules film", score: {nshapes: nshapes, nrows:[4,8], ncols:[4,8], m: [4,8], soundplaylist: "map3", colorplaylist: "jules", tickrate: .25, dataset: ["acc"], video: "382500846" } },
		{uri: "julessketch2019.10.14_bvp_1", title: "2019.10.14 bvp data ::: abstracted jules film", score: {nshapes: nshapes, nrows:[4,8], ncols:[4,8], m: [4,8], soundplaylist: "map3", colorplaylist: "jules", tickrate: .125, dataset: ["bvp"], video: "382500846" } },
		{uri: "julessketch2019.10.14_eda_1", title: "2019.10.14 eda data ::: abstracted jules film", score: {nshapes: nshapes, nrows:[4,8], ncols:[4,8], m: [4,8], soundplaylist: "map3", colorplaylist: "jules", tickrate: .5, dataset: ["eda"], video: "382500846" } },
		{uri: "julessketch2019.10.14_hr_1", title: "2019.10.14 hr data ::: grayscale jules film", score: {nshapes: nshapes, nrows:[4,8], ncols:[4,8], m: [4,8], soundplaylist: "map3", colorplaylist: "jules", tickrate: 1, dataset: ["hr"], video: "382500846" } },
		{uri: "julessketch2019.10.14_temp_1", title: "2019.10.14 temp data ::: grayscale jules film", score: {nshapes: nshapes, nrows:[4,8], ncols:[4,8], m: [4,8], soundplaylist: "map3", colorplaylist: "jules", tickrate: .5, dataset: ["temp"], video: "382500846" } },
		{uri: "julessketch2019.10.14_all_3", title: "2019.10.14 all data ::: abstracted walking film", score: {nshapes: nshapes, nrows:[4,8], ncols:[4,8], m: [4,8], soundplaylist: "map3", colorplaylist: "jules", tickrate: .125, dataset: ["acc", "bvp", "eda", "hr", "temp"], video: "382957610" } },
		{uri: "julessketch2019.10.14_acc_3", title: "2019.10.14 acc data ::: abstracted walking film", score: {nshapes: nshapes, nrows:[4,8], ncols:[4,8], m: [4,8], soundplaylist: "map3", colorplaylist: "jules", tickrate: .25, dataset: ["acc"], video: "382957610" } },
		{uri: "julessketch2019.10.14_bvp_3", title: "2019.10.14 bvp data ::: abstracted walking film", score: {nshapes: nshapes, nrows:[4,8], ncols:[4,8], m: [4,8], soundplaylist: "map3", colorplaylist: "jules", tickrate: .125, dataset: ["bvp"], video: "382957610" } },
		{uri: "julessketch2019.10.14_eda_3", title: "2019.10.14 eda data ::: abstracted walking film", score: {nshapes: nshapes, nrows:[4,8], ncols:[4,8], m: [4,8], soundplaylist: "map3", colorplaylist: "jules", tickrate: .5, dataset: ["eda"], video: "382957610" } },
		{uri: "julessketch2019.10.14_hr_3", title: "2019.10.14 hr data ::: abstracted walking film", score: {nshapes: nshapes, nrows:[4,8], ncols:[4,8], m: [4,8], soundplaylist: "map3", colorplaylist: "jules", tickrate: 1, dataset: ["hr"], video: "382957610" } },
		{uri: "julessketch2019.10.14_temp_3", title: "2019.10.14 temp data ::: abstracted walking film", score: {nshapes: nshapes, nrows:[4,8], ncols:[4,8], m: [4,8], soundplaylist: "map3", colorplaylist: "jules", tickrate: .5, dataset: ["temp"], video: "382957610" } },
	]

	points.forEach( ( point, j ) => {
		let herej = points.map( l => l.uri ).indexOf(point.uri);
		let nextj = (herej+1)%points.length;

		let pathlinks = points.map( ( p, k ) => {
			return {
				actuate: "onrequest", type: "internal", //internal, external
				format: "html", keywords: nextj===k ? ["path", "next"] : ["path"],
				title: p.title, url: p.uri
			}
		});

		// console.log(JSON.stringify(links,null,2));
		path.pathpoints.push( {
			id:  "id_"+ Date.now() + "_" + j, 
			uri: point.uri,
			title: point.title, subtitle: point.uri, 
			content: ``, 
			keywords: ["jules", "data", "sketch", "webpage"],
			description: "text for map ::: " + point.uri, 
			code: [...mapcode, ...datacode],
			score: point.score,
			links: pathlinks
		});
	});
	// console.log(JSON.stringify(path.pathpoints.map(p => p.uri),null,2));
	return path;
};