let z = {};
let z.controls = ["hidelink", "homelink", "pathlink", "coretextlink", "nextlink", "soundlink", "menulink"];

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
			}
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
		let pastn = Object.keys(z.score.elements.shapes).reduce(  (max, shape) => Math.max(max, z.score.elements.shapes[shape][v]), 0 );
		return {
			currentnode: 0, soundloaded: false, 
			soundplaying: false, contentvisible: true,
			version: version,
			clock: clock0,
			canvas: { 
				min: min, max = max, width: width, height: height, 
				grid: { ncols: z.score.grid.columns[v], nrows: z.score.grid.rows[v], sw: 12, pastn: pastn },
				colors: z.score.colors.playlist[0],
				sounds: z.score.sounds.playlist[0], 
				text: z.score.texts.playlist[0]
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
		let divframes = ["subtextframe", "svgframe", "textframe", "contentframe"];
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
		
		z.controls.forEach( (id,j) => {
			z.elements[id] = { el: document.querySelector("#"+id) }
		})
		divframes.forEach( (id,j) => {
			z.elements[id] = { el: document.createElement("div") };
			z.elements[id].el.setAttribute("id", id);
			z.elements[id].el.setAttribute("class", "frame");
			z.elements[id].el.setAttribute("style", "z-index:" + j*10);
			z.elements["body"].el.appendChild(z.elements[id].el)
		});
		Array.from(Array(z.score.elements.boxes.textboxes[v]).keys()).forEach(  r => {
			z.elements["textboxes"][r] = { el: document.createElement("canvas") };
			z.elements["textboxes"][r].el.setAttribute("id", "canvas_" + r);
			z.elements["textboxes"][r].el.setAttribute("class", "absolute");
			z.elements["textframe"].el.appendChild(z.elements["textboxes"][r].el);
		}
		// Array.from(Array(z.score.elements.boxes.canvasboxes[v]).keys()).forEach(  r => {
		// 	z.elements["canvasboxes"][r] = { el: document.createElement("canvas") };
		// 	z.elements["canvasboxes"][r].el.setAttribute("id", "canvas_" + r);
		// 	z.elements["canvasboxes"][r].el.setAttribute("class", "frame");
		// 	z.elements["canvasboxes"][r].ctx = z.elements["canvas"].el.getContext("2d");
		// 	z.elements["canvasframe"].el.appendChild(z.elements["canvasboxes"][r].el);
		// }
		// Array.from(Array(z.score.elements.boxes.imageboxes[v]).keys()).forEach(  r => {
		// 	z.elements["imageboxes"][r] = { el: document.createElement("img") };
		// 	z.elements["imageboxes"][r].el.setAttribute("id", "image_" + r);
		// 	z.elements["imageboxes"][r].el.setAttribute("class", "frame");
		// 	z.elements["imageframe"].el.appendChild(z.elements["imageboxes"][r].el);
		// }
		z.elements["svg"] = { el: document.createElementNS("http://www.w3.org/2000/svg", "svg") };
		z.elements["svg"].el.setAttributeNS(null, "id", "svg");
		z.elements["svg"].el.setAttributeNS(null, "class", "frame");
		z.elements["svg"].el.setAttributeNS(null, "width", window.innerWidth);
		z.elements["svg"].el.setAttributeNS(null, "height", window.innerHeight);
		z.elements["box"] = { el: document.createElementNS("http://www.w3.org/2000/svg", "rect") };
		z.elements["box"].el.setAttributeNS(null, "id", "box");
		z.elements["box"].el.setAttributeNS(null, "class", "shape square");
		z.elements["svg"].el.appendChild(z.elements["box"].el);
		z.score.elements.shapezorder.forEach( shape => {
			Array.from(Array(z.score.elements[shape[0]][v]).keys()).forEach(  r => {
				z.elements[shape[0]][r] = { el: document.createElementNS("http://www.w3.org/2000/svg", shape[1]) };
				z.elements[shape[0]][r].el.setAttributeNS(null, "id", shape[0]+"_"+r);
				z.elements[shape[0]][r].el.setAttributeNS(null, "class", "shape " + shape[1]);
				z.elements["svg"].el.appendChild(z.elements[shape[0]][r].el);
			});

		});
		z.elements["svgframe"].el.appendChild(z.elements["svg"].el);
	},

	atlascore.createdashboard = z => {
	},

	atlascore.createstreams = z => {
		let streams = {};
		streams["tick"] = ( () => {
			let dt = 1;
			let date0 = new Date();
			let t0 = Math.floor(date0.getTime()/1000);
			let state0 = { dt: dt, count: 0, date: date0, t: t0, t0: t0 };
			return Kefir.withInterval( dt*1000, emitter => { emitter.emit( { date: new Date() } ) })
						.scan( (state, e) => { 
							state.date = e.date;
							state.t = Math.floor(e.date.getTime()/1000);
							state.count = state.count + 1;
							return state;
						}, state0  )
		})( );
		streams["dimensions"] = ( () => {
			let dt = .4;
			let width = window.innerWidth, height = window.innerHeight;
			let dx = Math.floor(width/z.compass.canvas.grid.nrows), dy = Math.floor(height/z.compass.canvas.grid.ncols);
			let sw = Math.floor(Math.max(dx*.03, dy*.03, 4));
			let state0: { dt: dt, count: 0,
				grid: { nrows: z.compass.canvas.grid.nrows, ncols: z.compass.canvas.grid.ncols, dx: dx, dy: dy, sw: sw },
				width: width, height: height, 
				max: Math.max(width, height), min: Math.min(width, height), 
			};
			return Kefir.fromEvents(window, "resize").throttle(dt*1000)
				.scan( (state,e) => {
					state.width = window.innerWidth;
					state.height = window.innerHeight;
					state.max = Math.max(state.width, state.height);
					state.min = Math.min(state.width, state.height);
					state.grid.dx = Math.floor(state.width/state.grid.nrows);
					state.grid.dy = Math.floor(state.height/state.grid.ncols);
					state.grid.sw = Math.floor(Math.max(state.grid.dx*.03, state.grid.dy*.03, 4));
					return state
				}, state0) 

		})( );
		

		z.controls.forEach( control => {
			streams[control] = ( () => {
				return Kefir.fromEvents(z.elements[control].el, "click");
			})( );
		});

		(z.score.createstreams(z)).keys().forEach( key => {streams[key] = pathpointstreams[key]} );
		return streams;
	}

	atlascore.createactions = z => {
		// let z.controls = ["hidelink", "homelink", "pathlink", "coretextlink", "nextlink", "soundlink", "menulink"];
		let z.dashboard = {
			resumeaudio: (z) => {
				try {
					if(!z.compass.soundloaded){
						z.radio.loadclips(z);
					}
					z.radio.player.context.resume().then(() => {
						z.tools.logmsg("playback resumed");
						
						if(!z.compass.soundplaying) {
							z.elements["telegraph"].el.innerHTML =  "<i>loading sound ...</i>";
							window.setTimeout(() => { z.elements["telegraph"].el.innerHTML =  "sound on"}, 8000);
						}
						else {
							z.elements["telegraph"].el.innerHTML =  "sound on";
						}
						z.compass.soundplaying = true;
						z.elements["soundlink"].el.classList.add("active");
					});
				} catch(e) { z.tools.logerror("dashboard ::: resumeaudio " + e) }
			},
			suspendaudio: (z) => {
				try {
					z.radio.player.context.suspend().then(() => {
						z.elements["telegraph"].el.innerHTML =  "sound off";
						z.compass.soundplaying = false;
						z.elements["soundlink"].el.classList.remove("active");
					});
				} catch(e) { z.tools.logerror("dashboard ::: suspendaudio " + e) }
			},
			showcontent: (z) => {
				try {
					z.tools.logmsg("show content");
					document.querySelector('main').style.opacity=0.8;
					z.score.contentvisible = true;
				} catch(e) { z.tools.logerror("dashboard ::: showcontent " + e) }
			},
			hidecontent: (z) => {
				try {
					z.tools.logmsg("hide content");
					document.querySelector('main').style.opacity=0;
					z.score.contentvisible = false;
				} catch(e) { z.tools.logerror("dashboard ::: hidecontent " + e) }
			},
			hidecontrols: (z) => {
				try {
					z.tools.logmsg("hidden");
					z.elements["controls"].el.style.display='none';
					z.elements["menulink"].el.style.display='block';
				} catch(e) { z.tools.logerror("dashboard ::: hidecontrols " + e) }
			},
			showcontrols: (z) => {
				try {
					z.tools.logmsg("show");
					z.elements["controls"].el.style.display='block';
					z.elements["menulink"].el.style.display='none';
				} catch(e) { z.tools.logerror("dashboard ::: showcontrols " + e) }
			},
			next: (z) => {
				let nextlinks = z.links.filter( link => link.keywords.includes("next"));
				let next = nextlinks[0];
				z.tools.logmsg("next ::: " + JSON.stringify(nextlinks));
				try {
					if( next.actuate === "onrequest" ) {
						window.location = next.url;
					}
					else if ( next.type === "internal" && next.actuate === "onload" ) {
						let nextnodes = document.querySelectorAll(".nextnode");
						for(n=0; n<nextnodes.length; ++n) {
							nextnodes[n].style.display = 'none';
						}
						document.querySelector("#"+next.url).style.display = 'block';
					}
					// z.score.currentnext = (z.score.currentnext + 1) % z.nav.next.length;
					// z.tools.logmsg("next ::: z.score.currentnext = " + z.score.currentnext + " ::: " + JSON.stringify(z.nav.next[z.score.currentnext], null, "  "));
					z.elements["nextlink"].el.classList.add("active");

				} catch(err) { z.tools.logerror("dashboard ::: next " + err) }
			},
		};
		return {
			[
				{
					stream: "hidelink",
					action: e => {
						z.dashboard.hidecontent(z);
						z.dashboard.hidecontrols(z);
						// z.tools.logmsg("hidelink stream " + JSON.stringify(e));
					}
				},
				{
					stream: "homelink",
					action: e => {
						z.dashboard.gototransform1(z);
						// z.tools.logmsg("hidelink stream " + JSON.stringify(e));
					}
				},
				{
					stream: "pathlink",
					action: e => {
						z.dashboard.showpath(z);
						// z.tools.logmsg("hidelink stream " + JSON.stringify(e));
					}
				},
				{
					stream: "nextlink",
					action: e => {
						z.dashboard.gotonexttransform(z);
						// z.tools.logmsg("hidelink stream " + JSON.stringify(e));
					}
				},
				{
					stream: "menulink",
					action: e => {
						z.dashboard.showcontent(z);
						z.dashboard.showcontrols(z);
						// z.tools.logmsg("hidelink stream " + JSON.stringify(e));
					}
				},
				{
					stream: "soundlink",
					action: e => {
						if(!z.compass.soundplaying) { z.dashboard.resumeaudio(z); }
						else { z.dashboard.suspendaudio(z); }
						// z.tools.logmsg("soundlink stream " + JSON.stringify(e));
					}
				},
			]
		}
	}

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
