let z = {};
// z.score0 = score0 ? score0 : { };

let createatlascore = z => {
	let atlascore = {};
	atlascore.createtools = z => {
		return {
			//normalize velocity timings
			brokenstick: timingsp => {
				//[ {durationmin: tn1, delaymin: dn1, durationmax: tn2, delaymax: dn2}, [duration2, delay2] ] => normalized
				// ex ::: [ {durationmin: 4, delaymin: 1, durationmax: 8, delaymax: 3}, {durationmin: 6, delaymin: 0, durationmax: 9, delaymax: 0} ]
				// => take randominteger(durationmin1, durationmax1), randominteger(delaymin1, delaymax1), randominteger(durationmin2, durationmax2), randominteger(delaymin2, delaymax2)
				// return [ {duration: tn1, delay: dn1}, {duration: tn2, delay: dn2} ]
				// => then normalize to a total of 900 (for 90% of dt ::: 900 ms * dt in velocity calls)
				let initialValue = 0
				let sum = [{x: 1}, {x: 2}, {x: 3}].reduce(function (accumulator, currentValue) {
				    return accumulator + currentValue.x
				}, initialValue)

				console.log(sum) // logs 6

				let rtimings = timingsp.map( t => {
					return { duration: z.tools.randominteger( t.durationmin, t.durationmax),  duration: z.tools.randominteger( t.delaymin, t.delaymax) }
				});
				let ttotal = rtimings.reduce( (acc, t) => {
					return acc + t.duration + t.delay;
				}, 0 );
				let ntimings = rtimings.map( t => {
					return { duration: 900*t.duration/ttotal, delay: 900*t.delay/ttotal }
				})
				return ntimings;
			},
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
					console.log("### ::: " + msg); 
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
			shuffle: array => {
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
			datestr: (date, options) => {
				if(options===undefined) options = {year: "numeric", month: "2-digit", day: "numeric", hour12: true, hour: "2-digit", minute: "2-digit", second: "2-digit"};
				return date.toLocaleTimeString("en-US", options);
			},
			vectorToMatrix: (array, nrows, ncols) => {
				let matrix = [];
				for(let r=0; r<nrows; ++r) {
					matrix[r] = [];
					for(let c=0; c<ncols; ++c) {
						matrix[r][c] = array[r*c + c];
					}
				}
				return matrix;
			},
			applyCSS: (el, css, j, n) => {
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
		let grid = { nrows: z.score.ngrids[v], ncols: z.score.ngrids[v], dx: Math.floor(width/z.score.ngrids[v]), dy: Math.floor(height/z.score.ngrids[v]), sw: 12, pastn: z.score.npasts[v] };
		let nshapes = z.score.nshapes[v], nwords = z.score.nwords[v], npasts = z.score.npasts[v];

		//build memory
		let past = [];
		Array.from(Array(npasts).keys()).forEach(  r => {
			past.unshift([z.tools.randominteger(0, grid.nrows), z.tools.randominteger(0, grid.ncols)]);
		});
		return {
			pathpoints: { actions: [], contents: [], currentaction: 0, currentcontent: 0, contentvisible: true },
			sound: { loaded: false, playing: false, durationthrottle: z.score.sounds.playing.durationthrottle[v], maxbuffers: z.score.sounds.playing.maxbuffers[v], maxgrains: z.score.sounds.playing.maxgrains[v]  },
			version: version,
			clock: clock0,
			canvas: { 
				min: min, max: max, width: width, height: height, 
				past: past,
				grid: grid,
				nshapes: nshapes, nwords: nwords, npasts: npasts,
				colors: z.score.colors.playlist[0],
				sounds: z.score.sounds.playlist[0], 
				words: z.score.words.playlist[0],
				boxpick: past,
			}
		}
	};
	atlascore.createradio = z => {
		return {
			player: {}, loading: [],
			clipduration: { min:0, max:0 },
			n: { buffersplaying: 0, grainsplaying:0 },
			max: { buffersplaying: z.compass.sound.maxbuffers, grainsplaying: z.compass.sound.maxgrains },
			durationthrottle: z.compass.sound.durationthrottle,
			loadclips: z => {
				Object.keys(z.score.sound.clips).forEach( key => {
					let clip = z.score.sound.clips[key];
					if(!z.radio.loading.includes(clip.url)) {
						z.radio.loading.push(clip.url);
						let request = new XMLHttpRequest();
						//for localhost testing
						request.open("GET", window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/web/" + clip.url, true);
						// for deploy
						// request.open("GET", window.location.protocol + "//" + window.location.hostname + "/" + clip.url, true);
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
				z.compass.sounds.loaded = true;
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
	};
	atlascore.createelements = z => {
		let elements = {};
		let divframes = ["subtextframe", "svgframe", "wordframe", "contentframe"];
		elements["circles"] = []; 
		elements["rectangles"] = []; 
		elements["lines"] = [];
		elements["words"] = [];

		elements["body"] = { el: document.querySelector("body") };
		elements["main"] = { el: document.querySelector("main") };
		elements["clock"] = { el: document.querySelector("#clock") };
		elements["telegraph"] = { el: document.querySelector("#telegraph") };
		elements["controls"] = { el: document.querySelector("#controls") };
		
		z.score.controls.forEach( (id,j) => {
			elements[id] = { el: document.querySelector("#"+id) }
		})
		divframes.forEach( (id,j) => {
			elements[id] = { el: document.querySelector("#"+id) };
		});
		Array.from(Array(z.compass.canvas.nwords).keys()).forEach(  r => {
			elements["words"][r] = { el: document.createElement("div") };
			elements["words"][r].el.setAttribute("id", "word_" + r);
			elements["words"][r].el.setAttribute("class", "absolute");
			elements["wordframe"].el.appendChild(elements["words"][r].el);
		});
		elements["svg"] = { el: document.createElementNS("http://www.w3.org/2000/svg", "svg") };
		elements["svg"].el.setAttributeNS(null, "id", "svg");
		elements["svg"].el.setAttributeNS(null, "class", "frame");
		elements["svg"].el.setAttributeNS(null, "width", window.innerWidth);
		elements["svg"].el.setAttributeNS(null, "height", window.innerHeight);
		elements["box"] = { el: document.createElementNS("http://www.w3.org/2000/svg", "rect") };
		elements["box"].el.setAttributeNS(null, "id", "box");
		elements["box"].el.setAttributeNS(null, "class", "shape rect");
		elements["svg"].el.appendChild(elements["box"].el);
		Array.from(Array(z.compass.canvas.nshapes).keys()).forEach(  r => {
			elements["rectangles"][r] = { el: document.createElementNS("http://www.w3.org/2000/svg", "rect") };
			elements["rectangles"][r].el.setAttributeNS(null, "id", "rect_"+r);
			elements["rectangles"][r].el.setAttributeNS(null, "class", "shape rect");
			elements["svg"].el.appendChild(elements["rectangles"][r].el);
		});
		Array.from(Array(z.compass.canvas.nshapes).keys()).forEach(  r => {
			elements["circles"][r] = { el: document.createElementNS("http://www.w3.org/2000/svg", "circle") };
			elements["circles"][r].el.setAttributeNS(null, "id", "circle_"+r);
			elements["circles"][r].el.setAttributeNS(null, "class", "shape circle");
			elements["svg"].el.appendChild(elements["circles"][r].el);
		});
		Array.from(Array(z.compass.canvas.nshapes).keys()).forEach(  r => {
			let l = r*2;
			elements["lines"][l] = { el: document.createElementNS("http://www.w3.org/2000/svg", "line") };
			elements["lines"][l].el.setAttributeNS(null, "id", "line_"+ l);
			elements["lines"][l].el.setAttributeNS(null, "class", "shape line");
			elements["svg"].el.appendChild(elements["lines"][l].el);

			l = r*2 + 1;
			elements["lines"][l] = { el: document.createElementNS("http://www.w3.org/2000/svg", "line") };
			elements["lines"][l].el.setAttributeNS(null, "id", "line_"+ l);
			elements["lines"][l].el.setAttributeNS(null, "class", "shape line");
			elements["svg"].el.appendChild(elements["lines"][l].el);
		});
		elements["svgframe"].el.appendChild(elements["svg"].el);
		return elements;
	};
	return atlascore;
}


window.onload = z => { 
	z.score = createscore(z);
	z.atlascore = createatlascore(z);
	z.tools = z.atlascore.createtools(z);
	z.compass = z.atlascore.createcompass(z);
	z.elements = z.atlascore.createelements(z);
	z.radio = z.atlascore.createradio(z);
	z.radio.start(z);
	z.streams = z.score.createstreams(z);
	z.actions = z.score.createactions(z);
	
	z.compass.pathpoints.actions = Object.keys(z.actions).filter( key => key !== "all" );
	
	z.tools.logmsg("z.compass.pathpoints.actions = " + JSON.stringify(z.compass.pathpoints.actions));

	z.compass.pathpoints.contents = [];
	z.elements["contents"] = [];

	document.querySelectorAll(".content").forEach( ( el, j ) => {
		z.elements["contents"][ el.getAttribute("id") ] = { el: el };
		z.tools.logmsg('el.getAttribute("id") = ' + el.getAttribute("id"));
		z.compass.pathpoints.contents.push(el.getAttribute("id"));
	});

	let coreactions = z.actions["all"] ? z.actions["all"] : [];

	coreactions.forEach( action => {
		if( z.streams[action.stream] ) {
			z.streams[action.stream].onValue( action.action );
		}
	});

	z.actions[ z.compass.pathpoints.actions[0] ].forEach( action => {
		if( z.streams[action.stream] ) {
			z.streams[action.stream].onValue( action.action );
		}
	});
	z.tools.logmsg("z.compass.pathpoints.contents = " + JSON.stringify(z.compass.pathpoints.contents));
	// z.compass.pathpoints.contents.forEach( id => z.elements["contents"][id].el.style.display="none" );
	z.elements["contents"][z.compass.pathpoints.contents[0]].el.style.display="block";
	// z.tools.logmsg("z.score = " + JSON.stringify(z.score,null,2));
}
