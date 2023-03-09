module.exports = () => {
	const mapcode = ["code/velocity.min.js", "code/kefir201911.min.js", "code/tools.js", "code/mapdata.js", "code/radio.js", "code/mapcoreelements.js", "code/mapdrawp.js", "code/mapdashboard.js", "code/mapstart.js"];
	const mapscore = {soundplaylist: "howana", colorplaylist: "hawona", textplaylist: "hawonalines", nrows:[4,8], ncols:[4,8], m: [2,4], l: [2,4] };
	const name = "comingtogetherindex";

	let path = 
	{
		site: {
			id:  "id_"+ Date.now() + "_" + name,
			uri: name, url: name + ".html",
			title: "northern lights howl ::: 2020.04",
			subtitle: ``, 
			keywords: ["northern lights", "coming together", "spring howl", "index", "project", "webpage"],
			description: "northern lights spring howl ::: 2020.04", 
			code:  [...mapcode, "code/mapnlhowlelements.js",  "code/mapnlhowlstreams.js"],
			score: mapscore,
			content: `<p>Northern Lights.mn howl fundraiser ::: 2020.04 ::: text by Hawona Sullivan Janzen ::: mix by Kathy McTavish </p>`,
			links: [],
			css: [],
			index: "swarm",
			home: { actuate: "onrequest", type: "internal", format: "html", keywords: ["navigation", "home"], title: "home", uri: name, url: name + ".html" },
			access: "all"
		},
		pathpoints: []
		
	};
	const points = [
		{title: "howl all", uri: "comingtogether", code: [...mapcode, "code/mapnlhowlelements.js",  "code/mapnlhowlstreams.js"], score: {soundplaylist: mapscore.soundplaylist, colorplaylist: mapscore.colorplaylist, textplaylist: mapscore.textplaylist, nrows:[4,8], ncols:[4,8], m: [4,8], l: [3,6] }}
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
			title: "a coming together", subtitle: "text ::: Hawona Sullivan Janzen <br/> mix ::: Kathy McTavish<br/>commissioned by Northern Lights.mn for Spring Howl: a virtual art experience, April 2020", 
			//my vimeo link ::: https://vimeo.com/402029996/9947e38740
			content: "<h5>welcome! </h5><div class='small'><ul class='circle'><li>Turn on sound by tapping the audio button above.</li><li>To hide this text panel tap the eye button in the upper left.</li><li>To view the vimeo version of the poem as a whole ::: <a href='https://vimeo.com/403757243/8a130f743a' title='link to vimeo version'>click here.</a></li><li>To view more about the project ::: <a href='http://northern.lights.mn/2020/01/spring-howl-2020/' title='link to northern lights'>click here.</a>.</li><li>View in full screen or open two browsers to experience a duet.</li><li>You can read the full poem below.</li><li>Thank you for being our community. Thank you for supporting us.</li></ul></div><hr/><h5 class='center'>a coming together</h5><p class='center'>you are but one part of this<br/>what is it?<br/>it was nothing at first <br/>we had seen it before<br/>the frustration<br/>degradation<br/>instigation<br/>separation<br/>we had seen it all before <br/>an emergence<br/>a loop<br/>a bitmapped process, perhaps<br/>a solitary thing<br/>a sound a sound a sound<br/>then <br/>a formless form<br/>urging the other forms <br/>to get into formation <br/>a convergence<br/>we had seen it before <br/>you are but one part <br/>of this weather system <br/>uncommon in its commonness<br/>a reminder of what happens when nothing else is happening<br/>but we still can't sleep<br/>on the brink of this convergence<br/>there was a granular component <br/>a technicolored tidal wave <br/>a growing <br/>a shifted mass <br/>of us <br/>at first static <br/>then growling <br/>and pawing<br/>and feeding <br/>then tipping dipping flipping<br/>then dancing <br/>we were lost <br/>but never fearful<br/>we always saw the after  <br/>there was a respite <br/>then<br/>a coming together <br/>a coming together<br/>a coming together <br/>...something like a howl<br/></p><hr/><h5>ingredients :::</h5><p class='small'>Spoken / whispered text by Hawona, code and fragments of sound created / recorded by Kathy with notes from Zeitgeist New Music and Mags David.<br/>To access an audio only recording ::: <a href='http://mctavish.io/data/comingtogether.mp3' title='link to pdf flipbook'>click here.</a><br/>To access a pdf flipbook of stills ::: <a href='http://mctavish.io/data/comingtogetherlines.pdf' title='link to pdf flipbook'>click here.</a><br/>To access a pdf flipbook of the whole ::: <a href='http://mctavish.io/data/comingtogetherbroadsides.pdf' title='link to pdf broadsides'>click here.</a></p>", 
			keywords: ["northern lights", "hawona", "howl","index", "project", "webpage"],
			description: "text for map ::: " + point.uri, 
			code: point.code, score: point.score,
			links: pathlinks
		});
		// console.log("******###" + JSON.stringify(path.pathpoints[j].score,null,2));
	});
	
	return path;
};