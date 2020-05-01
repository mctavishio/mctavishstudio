let z = {};

let createatlascore = z => {
	let atlascore = {};

	atlascore.createtools = z => {
		return {
			//normalize velocity timings
			brokenstick: b => {
				//[ {durationmin: tn1, delaymin: dn1, durationmax: tn2, delaymax: dn2}, [duration2, delay2] ] => normalized
				// ex ::: [ {durationmin: 4, delaymin: 1, durationmax: 8, delaymax: 3}, {durationmin: 6, delaymin: 0, durationmax: 9, delaymax: 0} ]
				// => take randominteger(durationmin1, durationmax1), randominteger(delaymin1, delaymax1), randominteger(durationmin2, durationmax2), randominteger(delaymin2, delaymax2)
				// return [ {duration: tn1, delay: dn1}, {duration: tn2, delay: dn2} ]
				// => then normalize to a total of 900 (for 90% of dt ::: 900 ms * dt in velocity calls)

			}
			randominteger: (min, max) => {
				return Math.floor( min + Math.random()*(max-min));
			},
			normalrandominteger: (min, max, n) => { // CLT
				return n === 0 ? z.tools.randominteger(min,max) : Math.floor(Array.from(Array(n).keys()).reduce( (sum, j) => { return sum + z.tools.randominteger(min,max) }, 0) / n)
			},
			clearDOMelement: (el) => {
				el.innerHTML = "";
			},
			telegraph: (el, msg) => {
				if(el) {
					try { el.innerHTML =  msg; z.tools.logmsg("... " + msg);}
					catch(err) { z.tools.logerror(err) }
				}
				else {
					z.tools.logmsg(" || ... " + msg);
				}
			},
			logmsg: function(msg) {
				try { 
					// console.log("### ::: " + msg); 
				}
				catch(err) { z.tools.logerror(err) }
			},
			logerror: function(error) {
				try { console.log("rusty error ... " + error); }
				catch(err) {}
			},
			randomhighharmonic: () => {
				let multipliers = [10.0, 12.5, 13.33, 15, 20];
				return multipliers[ z.tools.randominteger( 0, multipliers.length) ];
			},
			randomharmonic: () => {
				let multipliers = [5, 7.5, 10.0, 12.5, 13.33, 15, 20];
				return multipliers[ z.tools.randominteger( 0, multipliers.length) ];
			},
			randomlowharmonic: () => {
				let multipliers = [5, 7.5, 10.0, 12.5, 13.33, 15, 20];
				return multipliers[ z.tools.randominteger( 0, multipliers.length) ]/2;
			},
			randomkey: (object) => {
				let keys = Object.keys(object);
				let key = keys[z.tools.randominteger(0,keys.length)];
				// z.tools.logmsg("key = " + key);
				return key;
			},
			togrid: (min=1, max=1, x=1, ndivisions=1) => {
				let dx = Math.floor( (max-min) / ndivisions );
				return Math.floor( ( x-min+dx/2)/dx )*dx + min;
			},
			getrandomblanks: (ndrawings, nshapes) => {
				let blanks = [[0],[0,1]];
				for(let d=1; d<ndrawings+1; ++d) {
					let blank = []
					for(let s=0; s<d*nshapes; ++s) {
						blank.push(s);
					}
					blanks.push(blank);
				}
				return blanks[ z.tools.randominteger(0,ndrawings+2) ];
			},
			shuffle: (array) => {
				copy = array.slice();
				for (var i = copy.length - 1; i > 0; i--) {
					var j = Math.floor(Math.random() * (i + 1));
					var temp = copy[i];
					copy[i] = copy[j];
					copy[j] = temp;
				}
				return copy;
			},
			logstreams: streams => {
				Object.keys(streams).filter( key => {return key !== "clock"}).forEach( key => {
					z.tools.logmsg("key " + key );
					streams[key].onValue( e => { z.tools.logmsg("onvalue ::: " + key + ": " + JSON.stringify(e)) });
				});
			},
			datestr: function(date, options) {
				if(options===undefined) options = {year: "numeric", month: "2-digit", day: "numeric", hour12: true, hour: "2-digit", minute: "2-digit", second: "2-digit"};
				return date.toLocaleTimeString("en-US", options);
			},
			applyCSS: function(el, css, j, n) {
				var j = j || 0, n = n || 1;
				for (var key in css) {
					if (css.hasOwnProperty(key)) {
						if(typeof css[key] === "function") el.style[ key ] = css[key](j, n);
						else el.style[ key ] = css[key];
					}
				}
			},
		}
	};
	atlascore.createcompass = z => {
		let date0 = new Date();
		let t0 = Math.floor(date0.getTime()/1000);
		let clock0 = { date: date0, t: t0, t0:t0 };
		let width = window.innerWidth, height = window.innerHeight;
		let min = Math.min(width, height), max = Math.max(width, height);
		let version = (min < 480 && max < 1025) ? "small" : "large";
		let v = version === "small" ? 0 : 1;
		return {
			currentnode: 0, soundloaded: false, 
			soundplaying: false, contentvisible: true,
			version: version,
			clock: clock0,
			canvas: { 
				min: min, max = max, width: width, height: height, grid: { ncols: z.score.grid.columns[v], nrows: z.score.grid.rows[v] },
				colors: { choices: z.score.colors.playlist[0]}, sounds: { choices: z.score.sounds.playlist[0] }, 
				texts: { choices: z.score.texts.playlist[0]}
			}
		}
	}

	atlascore.createradio = z => {
		return {
			player: {}, loading: [],
			clipduration: { min:0, max:0 },
			n: { buffersplaying: 0, grainsplaying:0 },
			max: { buffersplaying: z.compass.version === "small" ? z.score.sound.playing.maxbuffers[0] : z.score.sound.playing.maxbuffers[1], grainsplaying: z.compass.version === "small" ? z.score.sound.playing.maxgrains[0] : z.score.sound.playing.maxgrains[1] },
			durationthrottle: z.compass.version === "small" ? z.score.sound.playing.durationthrottle[0] : z.score.sound.playing.durationthrottle[1],
			loadclips: z => {
				Object.keys(z.score.sound.clips).forEach( key => {
					let clip = z.score.sound.clips[key];
					if(!z.radio.loading.includes(clip.url)) {
						z.radio.loading.push(clip.url);
						let request = new XMLHttpRequest();
						//for localhost testing
						// request.open("GET", window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/web/" + clip.url, true);
						// for deploy
						request.open("GET", window.location.protocol + "//" + window.location.hostname + "/" + clip.url, true);
						z.tools.logmsg("url = " + window.location.protocol + "//" + window.location.hostname + "/"  + clip.url);
						request.responseType = "arraybuffer";
						request.onload = () =>  {
							// z.tools.logmsg("loaded" + clip.url);
							z.radio.player.context.decodeAudioData(request.response, buffer => {
								clip.loaded = true;
								clip.buffer = buffer;
								clip.duration = clip.buffer.duration;
								if( clip.duration > z.radio.clipduration.max) {z.radio.clipduration.max = clip.duration}
								else if( clip.duration < z.radio.clipduration.min) {z.radio.clipduration.min  = clip.duration}
								// z.tools.logmsg("decoded" + clip.url);
							}, e => {
								z.tools.logerror("audio error! clip = " + clip.url + ", err = " + e);
							});
							
						};
						request.send();
					}
				});
				z.score.soundloaded = true;
			},
			start: z => {
				/* set up player*/
				window.AudioContext = window.AudioContext || window.webkitAudioContext;
				z.radio.player.context = new AudioContext();
				/* experimental parameters */
				let parameters = [
					{ gain: 0.4, threshold: -24, knee: 30, ratio: 12, attack: 0.003, release: 0.25 }, //default
					{ gain: 0.3, threshold: -18, knee: 30, ratio: 18, attack: 0.0003, release: 0.28 },
					{ gain: 0.5, threshold: -8, knee: 30, ratio: 18, attack: 0.003, release: 0.28 },
					{ gain: 0.8, threshold: -8, knee: 30, ratio: 18, attack: 0.003, release: 0.28 },
					];
				let n = 3;

				z.radio.player.gain = z.radio.player.context.createGain();
				z.radio.player.gain.gain.value = parameters[n].gain;
				//with no compressor
				z.radio.player.gain.connect(z.radio.player.context.destination);
			},
			playtone: e => {
				let vco = z.radio.player.context.createOscillator();
				vco.frequency.value = e.frequency;
				vco.type = "sine";
				let vca = z.radio.player.context.createGain();
				
				vco.connect(vca);
				vca.connect(z.radio.player.gain);
				let now = z.radio.player.context.currentTime;
				//fade in
				vca.gain.exponentialRampToValueAtTime(0.001, now + e.delay);
				vca.gain.exponentialRampToValueAtTime(e.volume, now + e.fadetime + e.delay);
				//fade out
				vca.gain.linearRampToValueAtTime(e.volume, now + e.duration + e.delay - e.fadetime);
				vca.gain.linearRampToValueAtTime(0.001, now + e.duration + e.delay);
				vco.start(now + e.delay);
				vco.stop(now + e.delay + e.duration + e.fadetime);
				vco.onended = function() {
				  	vco.disconnect(); vca.disconnect();
				}
			},
			playbuffer: e =>  {
				try {
					let instrument = z.score.sound.instruments[e.instrument];
					let clip = z.score.sound.clips[instrument.clip];

					if(clip.loaded) {
						let rate = 1.0;
						if(instrument.playbackRate) {
							rate = instrument.playbackRate();
							
						}
						let prob = z.tools.randominteger(0,100)/100;
						let isplayed = (z.radio.n.buffersplaying<z.radio.max.buffersplaying-1) || z.radio.durationthrottle.reduce( (isplayed,d) => { 
							// z.tools.logmsg("prob = " + prob + " ::: isplayed = " + isplayed + " ::: d = " + d + " ::: duration = " + clip.duration*rate); 
							return isplayed || (clip.duration*rate < d[0] && prob <= d[1]) }, false);
						if(isplayed) {
							try {
								// z.tools.logmsg("rate = " + rate + " ::: duration = " + clip.duration*rate);
								let vca = z.radio.player.context.createGain(); 
								vca.gain.value = e.volume;
								let source = z.radio.player.context.createBufferSource();
								source.buffer = clip.buffer;
								source["playbackRate"].value = rate;
								source.connect(vca);
								vca.connect(z.radio.player.gain);
								source.loop = false;
								source.onended = e =>  { 
									// z.tools.logmsg("ended ::: " + JSON.stringify(e));
									z.radio.n.buffersplaying=z.radio.n.buffersplaying-1
								} ;
								++z.radio.n.buffersplaying;
								let now = z.radio.player.context.currentTime;
								source.start(now + e.delay);
								// z.tools.logmsg("playing = " + clip.url);
							} catch(e) { z.tools.logerror("error applying params to audio buffer e::: " + e) }
						}
						else {	
							z.tools.logmsg("NOT playing = " + clip.url);
						}
					}
				}
				catch(e) { z.tools.logerror("line 104" + e) }
			},
			playgrain: e =>  {
				// z.tools.logmsg("ngrainsplaying = " + z.radio.n.grainsplaying);
				// if(z.radio.n.grainsplaying<z.radio.max.grainsplaying) {
					try {
						// let instrument = z.data.sounds.instruments[e.instrument];
						let instrument = z.score.sound.instruments[e.instrument];
						let clip = z.score.sound.clips[instrument.clip];
						// z.tools.logmsg("grain playing = " + instrument.clip);
						if(clip.loaded) {
							let rate = 1.0;
							if(instrument.playbackRate) {
									rate = instrument.playbackRate();
							}
							let now = z.radio.player.context.currentTime;
							let dt = Math.min(z.tools.randominteger(18,48)/10,rate*clip.duration*.4);
							// let dt = Math.min(z.tools.randominteger(18,24)/10,clip.duration*.3);
							let offset = z.tools.randominteger(0, (rate*clip.duration-2*dt)*10)/10;
							// let offset = z.tools.randominteger(0, (clip.duration-2*dt)*10)/10;
							// z.tools.logmsg("in playgrain ::: clip = " + e.instrument + ", clip duration = " + clip.duration + ", clip new duration = " + clip.duration*rate + ", dt = " + dt + ", rate = " + rate + ", offset = " + offset);
							let vca = z.radio.player.context.createGain(); 
							let source = z.radio.player.context.createBufferSource();
							source.buffer = clip.buffer;
							source["playbackRate"].value = rate;
							source.connect(vca);
							vca.connect(z.radio.player.gain);
							source.loop = false;
							source.onended = e =>  { z.radio.n.grainsplaying=z.radio.n.grainsplaying-1} ;
							++z.radio.n.grainsplaying;
							source.start(now, offset, dt*3); //parameters (when,offset,duration
							vca.gain.setValueAtTime(0.0, now);
							vca.gain.linearRampToValueAtTime(e.volume, now + dt);
							// vca.gain.linearRampToValueAtTime(1.0, now + dt);
							vca.gain.linearRampToValueAtTime(0, now + 2*dt ); 
						}
					}
					catch(e) { z.tools.logerror("radio 141 " + e) }
			}
		}
	},

	atlascore.createelements = z => {
		let elements = {};
		let divframes = ["projectionframe", "canvasframe", "subtextframe", "svgframe", "textframe", "contentframe"];
		let controls = ["hidelink", "menulink", "homelink", "maplink", "aboutauthorlink", "aboutprojectlink", "nextlink", "documentlink", "artifactlink", "soundlink"];
		elements["circles"] = []; 
		elements["rectangles"] = []; 
		elements["lines"] = [];
		elements["textboxes"] = [];
		elements["canvasboxes"] = [];
		elements["imageboxes"] = [];
		let v = z.compass.version === "small" ? 0 : 1;

		z.elements["body"] = { el: document.querySelector("body") };
		z.elements["body"].el.setAttribute("id", "body");

		z.elements["clock"] = { el: document.querySelector("#clock") };
		z.elements["telegraph"] = { el: document.querySelector("#telegraph") };
		z.elements["controls"] = { el: document.querySelector("#controls") };
		
		controls.forEach( (id,j) => {
			z.elements[id] = { el: document.querySelector("#"+id) }
		})
		divframes.forEach( (id,j) => {
			z.elements[id] = { el: document.createElement("div") };
			z.elements[id].el.setAttribute("id", id);
			z.elements[id].el.setAttribute("class", "frame");
			z.elements[id].el.setAttribute("style", "z-index:" + j*10);
			z.elements["body"].el.appendChild(z.elements[id].el)
		});
		Array.from(Array(z.score.elements.textboxes[v]).keys()).forEach(  r => {
			z.elements["textboxes"][r] = { el: document.createElement("canvas") };
			z.elements["textboxes"][r].el.setAttribute("id", "canvas_" + r);
			z.elements["textboxes"][r].el.setAttribute("class", "absolute");
			z.elements["textframe"].el.appendChild(z.elements["textboxes"][r].el);
		}
		Array.from(Array(z.score.elements.canvasboxes[v]).keys()).forEach(  r => {
			z.elements["canvasboxes"][r] = { el: document.createElement("canvas") };
			z.elements["canvasboxes"][r].el.setAttribute("id", "canvas_" + r);
			z.elements["canvasboxes"][r].el.setAttribute("class", "frame");
			z.elements["canvasboxes"][r].ctx = z.elements["canvas"].el.getContext("2d");
			z.elements["canvasframe"].el.appendChild(z.elements["canvasboxes"][r].el);
		}
		Array.from(Array(z.score.elements.imageboxes[v]).keys()).forEach(  r => {
			z.elements["imageboxes"][r] = { el: document.createElement("img") };
			z.elements["imageboxes"][r].el.setAttribute("id", "image_" + r);
			z.elements["imageboxes"][r].el.setAttribute("class", "frame");
			z.elements["projectionframe"].el.appendChild(z.elements["imageboxes"][r].el);
		}
		z.elements["svg"] = { el: document.createElementNS("http://www.w3.org/2000/svg", "svg") };
		z.elements["svg"].el.setAttributeNS(null, "id", "svg");
		z.elements["svg"].el.setAttributeNS(null, "class", "frame");
		z.elements["svg"].el.setAttributeNS(null, "width", window.innerWidth);
		z.elements["svg"].el.setAttributeNS(null, "height", window.innerHeight);
		z.elements["box"] = { el: document.createElementNS("http://www.w3.org/2000/svg", "rect") };
		z.elements["box"].el.setAttributeNS(null, "id", "box");
		z.elements["box"].el.setAttributeNS(null, "class", "shape square");
		z.elements["svg"].el.appendChild(z.elements["box"].el);
		shapezorder.forEach( shape => {
			Array.from(Array(z.score.elements[shape[0]][v]).keys()).forEach(  r => {
				z.elements[shape[0]][r] = { el: document.createElementNS("http://www.w3.org/2000/svg", shape[1]) };
				z.elements[shape[0]][r].el.setAttributeNS(null, "id", shape[0]+"_"+r);
				z.elements[shape[0]][r].el.setAttributeNS(null, "class", "shape " + shape[1]);
				z.elements["svg"].el.appendChild(z.elements[shape[0]][r].el);
			});

		});
		z.elements["svgframe"].el.appendChild(z.elements["svg"].el);
	},

	atlascore.createstreams = z => {

		// ***** clock stream ---------
		(function() {
			let name = "tick";
			let dt = 1; //in seconds
			let date0 = new Date();
			let t0 = Math.floor(date0.getTime()/1000);
			let tostring = function(e) {return "clock"};
			let clock0 = {
				date: date0,
				t: t0, count: 0,
				changed: false,
				count: 0,
				past: Math.floor(t0 / 1000),
				dt:dt, t0:t0, tostring: tostring, name:name 
			};
			z.streams[name] = Kefir.withInterval( 1000, emitter => { emitter.emit( { date: new Date() } ) })
				.scan( (state, e) => { 
					state.date = e.date;
					state.past = state.t;
					state.t = Math.floor(e.date.getTime()/1000);
					state.changed = state.t !== state.past ? true : false;
					state.count = state.count + 1;
					return state;
				}, clock0  )
			z.streams[name].onValue( e => { 
				// z.tools.logmsg(JSON.stringify(e));
				// z.elements["clock"].el.innerHTML = z.tools.datestr(new Date(e.t*1000));
				z.elements["clock"].el.innerHTML = z.tools.datestr(e.date);
				z.compass.clock.date = e.date;
				z.compass.clock.t = e.t;
				// z.elements["clock"].el.innerHTML = z.tools.datestr(e.date, {hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit"});
			});
		})();

		

	},

	atlascore.createdashboard = z => {
	},

	return atlascore;
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
window.onload = z => { 
	z.score = createscore(z);
	z.atlascore = createatlascore(z);
	z.tools = atlascore.createtools(z);
	z.compass = atlascore.createcompass(z);
	z.elements = atlascore.createelements(z);
	z.radio = atlascore.createradio(z);
	z.radio.start(z);

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
