module.exports = () => {
	const mapcode = ["code/velocity.min.js", "code/kefir201911.min.js", "code/tools.js", "code/clock.js", "code/radio.js", "code/mapcoreelements.js", "code/julesdrawp.js", "code/mapdata.js", "code/mapdashboard.js", "code/julesstart.js", "code/juleselements.js", "code/julesstreams.js"];
	const datacode = ["code/JulesTestSession_10.14.19/acc.js", "code/JulesTestSession_10.14.19/bvp.js", "code/JulesTestSession_10.14.19/temp.js", "code/JulesTestSession_10.14.19/hr.js", "code/JulesTestSession_10.14.19/eda.js"];
	let mappath = [];
	const mapcontrols = ["home", "next", "about"];
	const nshapes = {acc: [2,3], bvp: [8,16], eda: [3,6], hr: [2,2], temp: [2,2]};
	let mapscore = {nshapes: nshapes, nrows:[4,8], ncols:[4,8], m: [4,8], soundplaylist: "map3", colorplaylist: "jules", tickrate: .125, dataset: ["acc", "bvp", "eda", "hr", "temp"]};
	let path = 
	{
		site: {
			title: 'jules data research',
			description: 'research with jules rosskam ::: film / data',
			baseurl: "http://mctavish.studio",
			basecss: ["css/draw.css"],
			basecode: mapcode,
			basescore: mapscore,
			basecontrols: mapcontrols,
			basedata: datacode,
			sourcepath: 'source',
			archivepath: 'source/nodes/archive',
			resourcepath: 'source/resources',
			outputpath: 'web',
			csspath: 'css',
			codepath: 'code',
			datapath: 'data',
			path: mappath,
			home: {
						actuate: "onrequest", //onload, onrequest, searchembed
						type: "internal", //internal, external
						format: "html", //pdf,ejs,html,mp3,vimeo
						keywords: ["navigation", "home"], //ex: reference, next, navigation?
						title: "home",
						url: "julessketch2019.10.14_all_2"
			},
			next: {
						actuate: "onrequest", type: "internal", format: "html", 
						keywords: ["navigation", "next"], 
						title: "next ::: index",
						url: "julessketch2019.10.14_all_2"
			},
		},
		pathpoints: [
			{ 
				id: "1578081379023",
				uri: "indexjules",
				title: "jules data / film sketches",
				keywords: ["rosskam", "mctavish", "data", "film", "webpage"],
				description: "research with jules rosskam ::: film / data ::: ",
				code:  [...mapcode, ...datacode],
				score: {nshapes: nshapes, nrows:[4,8], ncols:[4,8], m: [4,8], soundplaylist: "map3", colorplaylist: "jules", tickrate: .125, dataset: "all", nrows:[4,8], ncols:[4,8], m: [2,4] },
				links: mappath.map( pt => {
					return	{actuate: "onrequest", type: "internal", format: "html",
						keywords: ["path"],
						title: "jules data ::: " + pt, url: pt}
				}),
				content: 
				`
				<p>film ... data ...</p>
				<p><br/>data ::: zip drive from jules ::: tiny vial ::: traces ...<br/><br/>heart beat coordinates<br/>velocities<br/>heat<br/>the body's dimensions<br/>measures ::: movement<br/>change<br/>what it means to be human<br/>these numbers<br/>blood :::<br/>remembering AIDS<br/>epidemic performance<br/>(s)<br/>blood coursing spilled flung drawn tested<br/>the virus tentacular reaching filling expanding ...<br/>the body's battle :::<br/>::: still alive ::: still here ...<br/>cellular resistance street stage ::: performance / words / noise /<br/>life force :::<br/>the physics of life<br/>the contours of loss<br/><br/>time between heart beats (seconds)<br/><br/>flex pulse<br/>breathe</p>
				`
			},
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
	points.forEach( p => { mappath.push(p.uri) });
	console.log("mappath = " + mappath);
	points.forEach( ( p, j ) => {
		let links = mappath.map( next => {
			console.log("next = " + JSON.stringify(next));
			linkpt = points.filter( k => k.uri === next )[0];
			console.log("linkpt = " + JSON.stringify(linkpt));
			return {
				actuate: "onrequest", type: "internal", //internal, external
				format: "html", keywords: ["path"],
				title: linkpt.title, url: linkpt.uri
			}
		});
		let herej = mappath.indexOf(p.uri), nextj = (herej+1)%mappath.length;
		console.log("herej = " + herej); console.log("nextj = " + nextj);
		links.push({
			actuate: "onrequest", type: "internal", //internal, external
			format: "html", keywords: ["next"],
			title: mappath[nextj], url: mappath[nextj]
		})
		// console.log(JSON.stringify(links,null,2));
		path.pathpoints.push( {
			id: Date.now(), uri: p.uri, 
			title: p.title, subtitle: p.uri, 
			content: ``, 
			keywords: ["jules", "data", "sketch", "webpage"],
			description: "sketch ::: " + p.uri,
			code: [...mapcode, ...datacode], 
			score: p.score,
			links: links
		});
	});
	console.log(JSON.stringify(path.pathpoints.map(p => p.uri),null,2));
	return path;
};