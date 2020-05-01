// ***** ############## initialize z ############## ---------
let createscore = z => {
	return {
		elements: {circles: [4,8], rectangles: [4,8], lines: [4,8], textboxes: [2,4], canvasboxes: [0,0], imageboxes: [0,0], shapezorder: [["rectangles"."rect"], ["lines","line"], ["circles","circle"]},
		grid: {columns: [4,8], rows: [4,8]},
		sound: { 
			clips: {
				mags1: {url: "data/sound/magsSessionClips_1.mp3", loaded: false, duration:0, minvolume: 0.4, maxvolume: 1.0, buffer:{} },
				bell2: {url:"data/sound/bell2.mp3",loaded:false,duration:5.433469387755102,minvolume:0.5,maxvolume:0.8,buffer:{}},
				bell6: {url:"data/sound/bell6.mp3",loaded:false,duration:11.885714285714286,minvolume:0.5,maxvolume:0.8,buffer:{}},
				bell11: {url:"data/sound/bell11.mp3",loaded:false,duration:20.114285714285714,minvolume:0.5,maxvolume:0.8,buffer:{}},
				bell13: {url:"data/sound/bell13.mp3",loaded:false,duration:20.114285714285714,minvolume:0.5,maxvolume:0.9,buffer:{}},
				longbell: {url:"data/sound/longbell.mp3",loaded:false,duration:20.114285714285714,minvolume:0.5,maxvolume:0.8,buffer:{}},
				fan: {url:"data/sound/fan1.mp3",loaded:false,duration:8.150204081632653,minvolume:0.3,maxvolume:0.8,buffer:{}},
				surf: {url:"data/sound/surf.mp3",loaded:false,duration:9.95265306122449,minvolume:0.3,maxvolume:0.8,buffer:{}},
				weatherradio1: {url:"data/sound/weatherradio1.mp3",loaded:false,duration:12.747755102040816,minvolume:0.2,maxvolume:0.4,buffer:{}},
				train: {url:"data/sound/train1.mp3",loaded:false,duration:12.303673469387755,minvolume:0.3,maxvolume:0.6,buffer:{}},
			},
			instruments: [], playlist: [],
			playing: { maxbuffers: [6,12], maxgrains: [6,12], durationthrottle: [[[6,0.9],[8,0.6],[14,0.4],[18,0.2],[40,0.1]], [[6,1.0],[8,0.8],[14,0.6],[18,0.4],[40,0.3]]]},
		},
		colors: { palette: {}, playlist: [] },
		texts: { words: [], playlist: [], text: [] },
		pathpoints: {
			list: ["map0a", "map0b","map0c"]
			streams: { map0a: [
					{ 	name: name,
						createstream: z => { return stream },
						onvalue: {
							getelements: z => { return elements },
							f: z => { 
									//initialize values
									//normalize timings: [ {durationmin: tn1, delaymin: dn1, durationmax: tn2, delaymax: dn2}, [duration2, delay2] ],
									//set velocity
								},
						},
					},
				]

			},
			transformations: { map0a: z => {  } }, //1. remove selected streams & 2. create new streams (leave elements alone)
			listeners: { map0a: z => {} }
		}
		
		//in paths file :::
		// code: ["code/velocity.min.js", "code/kefir201911.min.js", "code/tools.js", "code/radio.js"],
		// css: [],
	}
}

	

z.start = () => {
	// ***** initialize resources ---------
	z.radio = createradio(z);
	z.radio.start(z);
	z.dashboard = createdashboard(z);

	let nextnodes = document.querySelectorAll('.nextnode');
	if(nextnodes.length > 0) {
		for (let j = 1; j < nextnodes.length; ++j) {
	  		nextnodes[j].style.display = "none";
		}
	}
	setTimeout( () => { document.querySelector('#contentframe').scrollIntoView(); }, 18000);
	z.dashboard.listen(z);
	createstreams(z);
};


window.onload = function() { 
	setTimeout( () => { document.querySelector('#contentframe').scrollIntoView() }, 8);
	z.tools = createtools( z );
	z.score = {
		currentnext: 0, soundloaded: false, soundplaying: false, contentvisible: true
	}; 
	z.score.winmin = Math.min(window.innerWidth, window.innerHeight);
	z.score.winmax = Math.max(window.innerWidth, window.innerHeight);
	z.score.version = (z.score.winmin < 480 && z.score.winmax < 1025) ? "small" : "large";
	if(z.score0.vimeo) { z.score.vimeo = z.score0.vimeo; };
	if(z.score0.canvas) { z.score.canvas = z.score0.canvas; };
	z.tools.logmsg("z.score = " + JSON.stringify(z.score,null,2));
	z.tools.logmsg("z.score0 = " + JSON.stringify(z.score0,null,2));
	z.score.nrows = z.score.version === "small" ? z.score0.nrows[0] : z.score0.nrows[1];
	z.score.ncols = z.score.version === "small" ? z.score0.ncols[0] : z.score0.ncols[1];
	z.score.m = z.score.version === "small" ? z.score0.m[0] : z.score0.m[1];
	z.tools.logmsg(JSON.stringify(z.score, null, 2));
	z.data = createdata( z );
	z.score.orchestration = z.data.sounds.playlists[z.score0.soundplaylist];
	z.score.palette = z.data.colors.playlists[z.score0.colorplaylist];
	let textplaylist = z.score0.textplaylist ? z.score0.textplaylist : "default";
	z.tools.logmsg("textplaylist = " + textplaylist);
	z.score.texts = z.data.language.playlists[textplaylist];
	z.elements = {};
	addcoreelements(z);
	addelements(z);
	z.start(); 
}