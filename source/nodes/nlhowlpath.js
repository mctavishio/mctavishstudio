module.exports = () => {
	const mapcode = ["code/velocity.min.js", "code/kefir201911.min.js", "code/tools.js", "code/mapdata.js", "code/radio.js", "code/mapcoreelements.js", "code/mapdrawp.js", "code/mapdashboard.js", "code/mapstart.js"];
	const mapscore = {soundplaylist: "howana", colorplaylist: "hawona", textplaylist: "hawonalines", nrows:[4,8], ncols:[4,8], m: [2,4], l: [2,4] };
	const name = "nlhowl";

	let path = 
	{
		site: {
			id:  "id_"+ Date.now() + "_nlhowl",
			uri: name, url: name + ".html",
			title: "northern lights howl ::: 2020.04",
			subtitle: ``, 
			keywords: ["northern lights", "hawona", "howl","index", "project", "webpage"],
			description: "northern lights spring howl ::: 2020.04", 
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
		{title: "howl all", uri: "mapnlhowl", code: [...mapcode, "code/mapnlhowlelements.js",  "code/mapnlhowlstreams.js"], score: {soundplaylist: mapscore.soundplaylist, colorplaylist: mapscore.colorplaylist, textplaylist: mapscore.textplaylist, nrows:[4,8], ncols:[4,8], m: [4,8], l: [3,6] }}
	];

	points.forEach( ( point, j ) => {
		// let text = texts[j%texts.length];
		let herej = points.map( l => l.uri ).indexOf(point.uri);
		let nextj = (herej+1)%points.length;

		let pathlinks = points.map( ( p, k ) => {
			return {
				actuate: "onrequest", type: "internal", //internal, external
				format: "html", keywords: nextj===k && points.length>1 ? ["path", "next"] : ["path"],
				title: p.title, uri: p.uri, url: p.uri + ".html", action: "traverse"
			}
		});
		// console.log("******" + JSON.stringify(pathlinks,null,2));

		path.pathpoints.push( {
			id:  "id_"+ Date.now() + "_" + j, 
			uri: point.uri, url: point.uri + ".html",
			title: "A Coming Together", subtitle: "text ::: Hawona Sullivan Janzen <br/> mix ::: Kathy McTavish", 
			content: "<h5>welcome! ::: </h5><p class='small'>Turn on sound by tapping the audio button above.<br/>To hide this text panel tap the eye button in the upper left.<br/>To view the vimeo version of the whole ::: the confluence ::: <a href='https://vimeo.com/400479163/91b6d9e55c' title='link to vimeo version'>click here.</a><br/>You can read the full poem below.</p><div><hr/><h5 class='center'>a coming together</h5><p class='center'>you are but one part of this<br/>what is it?<br/>it was nothing at first <br/>we had seen it before<br/>the frustration<br/>degradation<br/>instigation<br/>separation<br/>we had seen it all before <br/>an emergence<br/>a loop<br/>a bitmapped process, perhaps<br/>a solitary thing<br/>a sound a sound a sound<br/>then <br/>a formless form<br/>urging the other forms <br/>to get into formation <br/>a convergence<br/>we had seen it before <br/>you are but one part <br/>of this weather system <br/>uncommon in its commonness<br/>a reminder of what happens when nothing else is happening<br/>but we still can't sleep<br/>on the brink of this convergence<br/>there was a granular component <br/>a technicolored tidal wave <br/>a growing <br/>a shifted mass <br/>of us <br/>at first static <br/>then growling <br/>and pawing<br/>and feeding <br/>then tipping dipping flipping<br/>then dancing <br/>we were lost <br/>but never fearful<br/>we always saw the after  <br/>there was a respite <br/>then<br/>a coming together <br/>a coming together<br/>a coming together <br/>...something like a howl<br/></p></div>", 
			keywords: ["northern lights", "hawona", "howl","index", "project", "webpage"],
			description: "text for map ::: " + point.uri, 
			code: point.code, score: point.score,
			links: pathlinks
		});
		// console.log("******###" + JSON.stringify(path.pathpoints[j].score,null,2));
	});
	
	return path;
};