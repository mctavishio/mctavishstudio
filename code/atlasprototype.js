// ***** ############## initialize z ############## ---------
let z = {};

let createscore = z => {
	let soundcorepath = "data/sound/";
	let instruments = {
		piano1low: {clip: "piano1", minvolume: 0.3, maxvolume: 0.9, playbackRate: () => { return z.tools.randomlowharmonic()/10 } },
		piano1random: {clip: "piano1", minvolume: 0.3, maxvolume: 0.8, playbackRate: () => { return z.tools.randominteger(2,48)/10 } },
		piano1: {clip: "piano1", minvolume: 0.3, maxvolume: 0.9, playbackRate: () => { return z.tools.randomharmonic()/10 } },
		accordion: {clip: "accordion", minvolume: 0.4, maxvolume: 0.9, playbackRate: () => { return z.tools.randomharmonic()/4 } },
		knocking1: {clip: "knocking1", minvolume: 0.4, maxvolume: 0.9, playbackRate: () => { return z.tools.randominteger(4,48)/10 } },
		bird1harmonic: {clip: "bird1", minvolume: 0.8, maxvolume: 1.0, playbackRate: () => { return z.tools.randomharmonic()/10 } },
		longbell: {clip: "longbell", minvolume: 0.4, maxvolume: 0.8, playbackRate: () => { return z.tools.randominteger(9,18)/10 } },
		bell11low: {clip: "bell11", minvolume: 0.5, maxvolume: 0.8, playbackRate: () => { return z.tools.randominteger(2,6)/10 } },
		bell11: {clip: "bell11", minvolume: 0.5, maxvolume: 0.8, playbackRate: () => { return z.tools.randominteger(4,13)/10 } },
		cello_pitch1harmonic: {clip: "cello_pitch1", minvolume: 0.3, maxvolume: 0.8, playbackRate: () => { return z.tools.randomharmonic()/10 } },
		cello_pitch1: {clip:"cello_pitch1",minvolume:0.1,maxvolume:0.3},
		cello_pitch1I: {clip: "cello_pitch1", minvolume: 0.3, maxvolume: 0.8, playbackRate: () => { return z.data.sounds.intervals.I(100) / 100 } },
		cello_pitch2: {clip: "cello_pitch2", minvolume: 0.3, maxvolume: 0.9, playbackRate: () => { return z.tools.randomharmonic()/10 } },
		cello_pitch3: {clip: "cello_pitch3", minvolume: 0.3, maxvolume: 0.9, playbackRate: () => { return z.tools.randomharmonic()/10 } },
		mags1: {clip: "magsSessionClips_1", minvolume: 0.3, maxvolume: 0.8 },
		mags1harmonic: {clip: "magsSessionClips_1", minvolume: 0.3, maxvolume: 0.8, playbackRate: () => { return z.tools.randomlowharmonic()/10 } },
		mags2harmonic: {clip: "magsSessionClips_2a", minvolume: 0.3, maxvolume: 0.8, playbackRate: () => { return z.tools.randomlowharmonic()/10 } },
		submarineecho1: {clip: "submarineecho", minvolume: 0.2, maxvolume: 0.8 },
		submarineecho2: {clip: "submarineecho",  minvolume: 0.2, maxvolume: 0.8, playbackRate: () => { return z.tools.randomharmonic()/10 } },
		submarineecho3: {clip: "submarineecho",  minvolume: 0.2, maxvolume: 0.8, playbackRate: () => { return z.tools.randomlowharmonic()/14 } },
	};
	console.log(JSON.stringify(Object.entries(instruments)));
	let clips = {};
	Object.entries(instruments).forEach( instrument => {
		console.log(instrument[1].clip);
		clips[instrument[1].clip] = { url: soundcorepath + instrument[1].clip + ".mp3", loaded:false, duration:0, buffer:{} };
	});
	console.log(JSON.stringify(clips));

	let showcontent = ( (z,contentid) => {
		z.compass.pathpoints.currentcontent = z.compass.pathpoints.contents.indexOf(contentid) ? z.compass.pathpoints.contents.indexOf(contentid) : 0;
		z.compass.pathpoints.contents.forEach( id => { z.elements["contents"][id].el.style.display="none" } );
		z.elements["contents"][z.compass.pathpoints.contents[z.compass.pathpoints.currentcontent]].el.style.display="block";

	})
	// let clips = Object.entries(instruments).reduce( ( clips, instrument ) => {
	// 	console.log(instrument[1].clip);
	// 	console.log(JSON.stringify(clips));
	// 	clips[instrument[1].clip] = { url: soundcorepath + instrument[1].clip + ".mp3", loaded:false, duration:0, buffer:{} };
	// });
	return {
		// controls: ["hidelink", "homelink", "pathlink", "coretextlink", "nextlink", "soundlink", "menulink"],
		controls: ["hidelink", "homelink", "pathlink", "nextlink", "soundlink", "menulink"],
		ngrids: [4,8], nshapes: [16,64], nwords: [0,0], npasts: [2,4],
		sounds: {
			clips: clips,
			instruments: instruments,
			playlist: [  
				["piano1low"],
				["piano1random", "accordion"],
				["accordion"], ["accordion", "knocking1"],
				["knocking1"], ["piano1"],  ["piano1", "bird1harmonic"], ["piano1low"], 
				["longbell"], ["bell11low"], 
				["cello_pitch1I"], ["cello_pitch3", "cello_pitch2"], 
				["cello_pitch2"], ["cello_pitch1harmonic"], 
				["bird1harmonic"], [ "submarineecho1"], [ "submarineecho2"],[ "submarineecho3"], 
				["mags1harmonic", "accordion"], ["mags1harmonic"], ["mags2harmonic"],
				["mags1","cello_pitch1harmonic"], ["longbell"], ["bell11"],
				["accordion", "bird1harmonic"],
				["bird1harmonic"], ["piano1"],
				["piano1low"], [ "piano1random"], ["piano1", "bird1harmonic"], ["piano1low"],
				["mags1harmonic"], ["cello_pitch1I"], ["cello_pitch3", "cello_pitch2"],
				["cello_pitch2"], ["cello_pitch1harmonic"], 
				["mags1harmonic"], ["mags2harmonic"], ["mags1","cello_pitch1harmonic"], ["bird1harmonic"], ["piano1"] 
				],
			playing: { maxbuffers: [6,12], maxgrains: [6,12], durationthrottle: [[[6,0.9],[8,0.6],[14,0.4],[18,0.2],[40,0.1]], [[6,1.0],[8,0.8],[14,0.6],[18,0.4],[40,0.3]]]},
		},
		colors: { 
			pigments: {
				white: "#ffffff", warmwhite: "#fcfbe3", black: "#000000", warmblack: "#191918",
				gray: "#484848", lightgray: "#888888", warmlightgray: "#656560", warmgray: "#4b4b44",
				blue: "#006699", red: "#9a0000", yellow: "ffcc00"
			}, 
			playlist: [
				["#ffcc00", "#ffcc00","#fcfbe3", "#e2e1cc", "#c9c8b5", "#b0af9e", "#979688", "#7e7d71", "#64645a", "#4b4b44", "#32322d", "#191916", "#000000"], //warmgraysyellow
				["#006699", "#006699", "#006699", "#fcfbe3", "#e2e1cc", "#c9c8b5", "#b0af9e", "#979688", "#7e7d71", "#64645a", "#4b4b44", "#32322d", "#191916", "#000000"], //warmgraysblue
				["#fcfbe3", "#191918"], //"warmbw",
				["#fcfbe3", "#e2e1cc", "#c9c8b5", "#b0af9e", "#979688", "#7e7d71", "#64645a", "#4b4b44", "#32322d", "#191916", "#000000"], //warmgrays
				["#9a0000", "#9a0000", "#9a0000", "#fcfbe3", "#e2e1cc", "#c9c8b5", "#b0af9e", "#979688", "#7e7d71", "#64645a", "#4b4b44", "#32322d", "#191916", "#000000"], //warmgraysred 
				["#9a0000", "#fcfbe3", "#191918"], //"warmbwred",
				["#fcfbe3", "#191918"], //"warmbw",
				["#fcfbe3", "#e2e1cc", "#c9c8b5", "#b0af9e", "#979688", "#7e7d71", "#64645a", "#4b4b44", "#32322d", "#191916", "#000000"], //warmgrays
				["#9a0000", "#fcfbe3", "#191918"], //"warmbwred",
				["#ffcc00", "#fcfbe3", "#191918"], //"warmbwyellow",
				["#006699", "#fcfbe3", "#191918"], //"warmbwblue",
				["#fcfbe3", "#191918"], //"warmbw",
				["#fcfbe3", "#e2e1cc", "#c9c8b5", "#b0af9e", "#979688", "#7e7d71", "#64645a", "#4b4b44", "#32322d", "#191916", "#000000"], //warmgrays
			], 
		},
		words: { playlist: [] },
		transformations: [
				{ uri: "map3a", title: "map3a", subtitle: "", content: ""},
				{ uri: "map3b", title: "map3b", subtitle: "", content: ""},
				{ uri: "map3c", title: "map3c", subtitle: "", content: ""},
		],
		createcompass: z => {
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
		},
		createstreams: z => {
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
				let state0 = { dt: dt, count: 0,
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
			streams["boxpick"] = ( () => {
				let dt = 9;
				let state0 = { 
						dt: dt, count: 0,
						row: 0, col: 0,
						nrows: z.compass.canvas.grid.nrows, ncols: z.compass.canvas.grid.ncols,
						past: [],
					};
				//build memory
				Array.from(Array(z.compass.canvas.grid.pastn).keys()).forEach(  r => {
					state0.past.unshift([z.tools.randominteger(0, z.compass.canvas.grid.nrows), z.tools.randominteger(0, z.compass.canvas.grid.ncols)]);
				});
				return streams["tick"].filter( e => e.t%dt===0 )
					.scan( (state, e) => { 
						state.past.shift();
						state.past.push([z.tools.randominteger(0, state.nrows), z.tools.randominteger(0, state.ncols)]);
						state.count = state.count + 1;
						return state;
					}, state0  );
			})( );
			streams["colorplaylist"] = ( () => {
				let dt = 48;
				let date0 = new Date();
				let t0 = Math.floor(date0.getTime()/1000);
				let state0 = { 
						dt: dt, count: 0,
						playlist: z.score.colors.playlist,
						colors: z.score.colors.playlist[ Math.floor(t0/dt)%z.score.colors.playlist.length ]
					};
				return streams["tick"].filter( e => e.t%dt===0 )
					.scan( (state, e) => { 
						state.colors = state.playlist[ Math.floor(e.t/dt)%state.playlist.length ];
						state.count = state.count + 1;
						return state;
					}, state0  )
			})( );
			streams["wordplaylist"] = ( () => {
				let dt = 68;
				let date0 = new Date();
				let t0 = Math.floor(date0.getTime()/1000);
				let state0 = { 
					dt: dt, count: 0,
					playlist: z.score.words.playlist,
					word: z.score.words.playlist[ Math.floor(t0/dt)%z.score.words.playlist.length ]
				};
				return streams["tick"].filter( e => e.t%dt===0 )
					.scan( (state, e) => { 
						state.word = state.playlist[ Math.floor(e.t/dt)%state.playlist.length ];
						state.count = state.count + 1;
						return state;
					}, state0  )

			})( );
			streams["soundplaylist"] = ( () => {
				let dt = 38;
				let date0 = new Date();
				let t0 = Math.floor(date0.getTime()/1000);
				let state0 = { 
					dt: dt, count: 0,
					playlist: z.score.sounds.playlist,
					sounds: z.score.sounds.playlist[ Math.floor(t0/dt)%z.score.sounds.playlist.length ]
				};
				return streams["tick"].filter( e => e.t%dt===0 )
					.scan( (state, e) => { 
						state.sounds = state.playlist[ Math.floor(e.t/dt)%state.playlist.length ];
						state.count = state.count + 1;
						return state;
					}, state0  )
			})( );
			streams["playsounds"] = ( () => {
				let dt = 1;
				let chance = .8;
				let state0 = { 
					dt: dt, count: 0, chance: chance,
				};
				return streams["tick"].filter( e => e.t%dt===0 && z.compass.sound.playing && z.tools.randominteger(0,10)<chance*10 )
					.scan( (state, e) => { 
						state.count = state.count + 1;
						state.tick = e.tick;
						return state;
					}, state0  )
			})( );
			z.tools.logmsg("controls = " + JSON.stringify(z.score.controls));
			z.score.controls.forEach( control => {
				streams[control] = ( () => {
					z.tools.logmsg("control = " + control);
					z.tools.logmsg("z.elements[control].el.getAttribute('id') = " + z.elements[control].el.getAttribute('id'));
					return Kefir.fromEvents(z.elements[control].el, "click");
				})( );
			});
			z.score.controls.forEach( control => {
				streams[control].onValue( e => z.tools.logmsg(" clicked " + control))
			});

			Object.keys(z.elements["transforms"]).forEach( key => {
				let link = z.elements["transforms"][key];
				z.tools.logmsg("link = " + link.uri);
				streams["transform"+link.uri] = ( () => {
					return Kefir.fromEvents(link.el, "click", e=>{return {uri:link.uri,id:"transform"+link.uri,el:link}});
				})( );
			});
			Object.keys(z.elements["transforms"]).forEach( key => {
				let link = z.elements["transforms"][key];
				streams["transform"+link.uri].onValue( e => {
					z.tools.logmsg(" clicked " + "transform"+link.id);
					showcontent(z,link.uri);
					// link.el.style.color="#ffffff";
				});
			});

			let gears = [
				{name: "box", dt: 2, chance:1.0},
				{name: "rectangles", dt: 4, chance:1.0},
				{name: "circles", dt: 3, chance:1.0},
			];
			gears.forEach( gear => {
				let filter = gear.chance === 1.0 ? e => e.t%gear.dt===0 : e => (e.t%gear.dt===0 && z.tools.randominteger(0,10)<gear.chance*10);
				streams[gear.name] = streams["tick"].filter( filter )
					.scan( (state, e) => { 
						state.count = state.count + 1;
						state.tick = e;
						return state;
					}, {dt: gear.dt, count: 0, chance: gear.chance, elements: z.tools.vectorToMatrix(z.elements[gear.name], Math.floor(z.compass.canvas.grid.nrows), Math.floor(z.compass.canvas.grid.ncols)) } )
			})
			return streams
		},
		createactions: z => { return {
			all: [
				{
					stream: "start",
					action: e => {
						z.tools.logmsg("initialize all");
					}
				},
				{
					stream: "tick",
					action: e => {
						z.compass.clock = e;
						z.elements["clock"].el.innerHTML = z.tools.datestr(new Date(e.t*1000));
					}
				},
				{
					stream: "dimensions",
					action: e => {
						z.compass.canvas.width = e.width;
						z.compass.canvas.height = e.height;
						z.compass.canvas.min = e.min;
						z.compass.canvas.max = e.max;
						z.compass.canvas.grid.dx = e.grid.dx;
						z.compass.canvas.grid.dy = e.grid.dy;
						z.compass.canvas.grid.sw = e.grid.sw;
						// z.tools.logmsg("dimensions stream " + JSON.stringify(e));
					}
				},
				{
					stream: "boxpick",
					action: e => {
						z.compass.canvas.boxpick = e.past;
						// z.tools.logmsg("dimensions stream " + JSON.stringify(e));
					}
				},
				{
					stream: "colorplaylist",
					action: e => {
						z.compass.canvas.colors = e.colors;
						// z.tools.logmsg("dimensions stream " + JSON.stringify(e));
					}
				},
				{
					stream: "textplaylist",
					action: e => {
						z.compass.canvas.text = e.text;
						// z.tools.logmsg("dimensions stream " + JSON.stringify(e));
					}
				},
				{
					stream: "soundplaylist",
					action: e => {
						z.compass.canvas.sounds = e.sounds;
						// z.tools.logmsg("dimensions stream " + JSON.stringify(e));
					}
				},
				{
					stream: "playsounds",
					action: e => {
						try {
							let sound = z.compass.canvas.sounds[z.tools.randominteger(0, z.compass.canvas.sounds.length)];
							// z.tools.logmsg(" play instrument ::: " + sound);
							let instrument = z.score.sounds.instruments[sound];
							let vol = z.tools.randominteger(instrument.minvolume*10, instrument.maxvolume*10)/10;
							z.radio.playbuffer( { instrument: sound, volume: vol, delay: z.tools.randominteger(0,4)/10 } );
							if(z.tools.randominteger(0,10) < 2) {
								Kefir.sequentially(400, [0, 1, 2, 3]).onValue( x => { 
									z.radio.playgrain( { instrument: sound, volume: vol, delay: 0 } );
								});
							}

						} catch(err) {}
						// z.tools.logmsg("dimensions stream " + JSON.stringify(e));
					}
				},
				{
					stream: "box",
					action: e => {
						try {
							let color = z.compass.canvas.colors[z.tools.randominteger(0, z.compass.canvas.colors.length)];
							let elements = z.elements["box"];
							if(e.count%5!==0) {
								Velocity({	
									elements: elements.el,
									properties: { fillOpacity: 0.0, strokeOpacity: 1.0, stroke: color, strokeWidth: z.tools.randominteger(z.compass.canvas.min/100, z.compass.canvas.min/40), strokeDasharray: z.tools.randominteger(10, z.compass.canvas.max*2), fill: color, x: 0, y: 0, width: z.compass.canvas.width, height: z.compass.canvas.height },
									options: { duration: z.tools.randominteger(e.dt*800,e.dt*900),  delay: z.tools.randominteger(0,e.dt*80), easing: "easeInOutQuad" },
								});
							}
							else if(e.count%3===0) {
								Velocity({	
									elements: elements.el,
									properties: { fillOpacity: 0.0, strokeOpacity: 1.0, stroke: color, strokeWidth: z.tools.randominteger(z.compass.canvas.min/40, z.compass.canvas.min/10), strokeDasharray: 9, fill: color, x: 0, y: 0, width: z.compass.canvas.width, height: z.compass.canvas.height },
									options: { duration: z.tools.randominteger(e.dt*800,e.dt*900),  delay: z.tools.randominteger(0,e.dt*80), easing: "easeInOutQuad" },
								});
							}
							else if(e.count%2===0) {
								Velocity({	
									elements: elements.el,
									properties: { fillOpacity: 0.0, strokeOpacity: 1.0, stroke: color, strokeWidth: z.tools.randominteger(z.compass.canvas.min/100, z.compass.canvas.min/40), strokeDasharray: z.tools.randominteger(10, z.compass.canvas.min*2), fill: color, x: z.tools.randominteger(0,z.compass.canvas.grid.nrows-1)*z.compass.canvas.grid.dx, y: 0, width: z.compass.canvas.grid.dx, height: z.compass.canvas.height },
									options: { duration: z.tools.randominteger(e.dt*800,e.dt*900),  delay: z.tools.randominteger(0,e.dt*80), easing: "easeInOutQuad" },
								});
							}
							else {
								Velocity({	
									elements: elements.el,
									properties: { fillOpacity: 0.0, strokeOpacity: 1.0, stroke: color, strokeWidth: z.tools.randominteger(z.compass.canvas.min/100, z.compass.canvas.min/40), strokeDasharray: z.tools.randominteger(10, z.compass.canvas.min*2), fill: color, x: 0, y: z.tools.randominteger(0,z.compass.canvas.grid.ncols-1)*z.compass.canvas.grid.dy, width: z.compass.canvas.width, height: z.compass.canvas.grid.dy },
									options: { duration: z.tools.randominteger(e.dt*800,e.dt*900),  delay: z.tools.randominteger(0,e.dt*80), easing: "easeInOutQuad" },
								});
							}
						} catch(err) { z.tools.logerror("all ::: boxes ::: " + err ) }
					},
				},
				{
					stream: "rectangles",
					action: e => {
						// z.tools.logmsg("all ::: squares e = " + JSON.stringify(e));
						try {
							let dx = z.compass.canvas.grid.dx, dy = z.compass.canvas.grid.dy;
							let color = z.compass.canvas.colors[z.tools.randominteger(0, z.compass.canvas.colors.length)];
							// let elements = z.tools.vectorToMatrix(z.elements["rectangles"], z.compass.canvas.grid.nrows, z.compass.canvas.grid.ncols);
							// let elements = e.elements;
							let ratios = [5,10,15,20,30,40];
							// z.tools.logmsg("all ::: squares elements = " + JSON.stringify(elements));
							e.elements.forEach( (row, r) => {
								if(Math.floor(e.tick.t/e.dt)%4!==0) { color = z.compass.canvas.colors[z.tools.randominteger(0, z.compass.canvas.colors.length)];}
								let y = (r%z.compass.canvas.grid.nrows)*dy;
								e.elements[r].forEach( (col,c) => {
									if(Math.floor(e.tick.t/e.dt)%5!==0) { color = z.compass.canvas.colors[z.tools.randominteger(0, z.compass.canvas.colors.length)];}
									let x = c*dx;
									// z.tools.logmsg("c="+e.palette.colors.length + " color="+color);
									Velocity({	
										elements: e.elements[r][c].el,
										properties: { fillOpacity: 1.0, strokeOpacity: 0.0, stroke: color, strokeWidth: 12, fill: color, x: x, y: y, width: dx*ratios[z.tools.randominteger(0,ratios.length)]/10, height: dy*ratios[z.tools.randominteger(0,ratios.length)] },
										options: { duration: z.tools.randominteger(e.dt*200,e.dt*400),  delay: z.tools.randominteger(0,e.dt*600), easing: "easeInOutQuad" },
									});
								})

							})
							
						} catch(err) { z.tools.logerror("all ::: squares ::: " + err ) }
						// z.tools.logmsg("rectangles stream " + JSON.stringify(e));
					}
				},
				// controls: ["hidelink", "homelink", "pathlink", "nextlink", "soundlink", "menulink"],
				{
					stream: "hidelink",
					action: e => {
						z.tools.logmsg("hide content !");
						try {
							z.tools.logmsg("hide content");
							z.elements["main"].el.style.opacity=0;
							z.compass.pathpoints.contentvisible = false;
							z.elements["controls"].el.style.display='none';
							z.elements["menulink"].el.style.display='block';
						} catch(e) { z.tools.logerror("dashboard ::: hidelink " + e) }
					}
				},
				{
					stream: "menulink",
					action: e => {
						z.tools.logmsg("show controls !");
						try {
							z.tools.logmsg("show content");
							z.elements["main"].el.style.opacity=0.8;
							z.compass.pathpoints.contentvisible = true;
							z.elements["controls"].el.style.display='block';
							z.elements["menulink"].el.style.display='none';
						} catch(e) { z.tools.logerror("menulink " + e) }
					}
				},
				{
					stream: "homelink",
					action: e => {
						try {
							showcontent(z, z.compass.pathpoints.contents[0]);
							z.tools.logmsg("homelink");
						} catch(e) { z.tools.logerror("homelink " + e) }
					}
				},
				{
					stream: "pathlink",
					action: e => {
						try {
							z.tools.logmsg("pathlink");
							showcontent(z,"path");
						} catch(e) { z.tools.logerror("pathlink " + e) }
					}
				},
				{
					stream: "nextlink",
					action: e => {
						
						// z.tools.logmsg("z.compass.pathpoints.actions[z.compass.pathpoints.currentaction] = " + z.compass.pathpoints.actions[z.compass.pathpoints.currentaction]);
						try {
							z.tools.logmsg("next >> ");
							z.tools.logmsg("z.compass.pathpoints.currentaction = " + z.compass.pathpoints.currentaction);
							z.tools.logmsg("z.compass.pathpoints.actions[z.compass.pathpoints.currentaction] = " + z.compass.pathpoints.actions[z.compass.pathpoints.currentaction]);

							z.actions[ z.compass.pathpoints.actions[z.compass.pathpoints.currentaction] ].filter( action => action.stream !== "start" && z.streams[action.stream] ).forEach( action => {
								z.tools.logmsg("remove action from action.stream = " + action.stream);
								// z.tools.logmsg("action to be removed :::  " + action.action);
								z.streams[action.stream].offValue( action.action );
							});

							z.compass.pathpoints.currentaction = (z.compass.pathpoints.currentaction+ 1) % z.compass.pathpoints.actions.length;
							z.tools.logmsg("z.compass.pathpoints.currentaction = " + z.compass.pathpoints.currentaction);
							z.actions[ z.compass.pathpoints.actions[z.compass.pathpoints.currentaction] ].filter( action => action.stream == "start" ).forEach( action => {
								action.action({});
							});
							z.actions[ z.compass.pathpoints.actions[z.compass.pathpoints.currentaction] ].filter( action => action.stream !== "start" && z.streams[action.stream] ).forEach( action => {
								z.tools.logmsg("add action to action.stream = " + action.stream);
								z.streams[action.stream].onValue( action.action );
							});

							z.compass.pathpoints.currentcontent = (z.compass.pathpoints.currentcontent + 1) % z.compass.pathpoints.contents.length;
							showcontent(z, z.compass.pathpoints.contents[z.compass.pathpoints.currentcontent])
							// z.compass.pathpoints.contents.forEach( id => { z.elements["contents"][id].el.style.display="none" } );
							// z.elements["contents"][z.compass.pathpoints.contents[z.compass.pathpoints.currentcontent]].el.style.display="block";
						} catch(err) {z.tools.logmsg("oops" + err)}
					}
				},
				{
					stream: "soundlink",
					action: e => {
						z.tools.logmsg("play sound !");
						if(!z.compass.sound.playing) { 
							try {
								if(!z.compass.sound.loaded){
									z.radio.loadclips(z);
								}
								z.radio.player.context.resume().then(() => {
									z.tools.logmsg("playback resumed");
									
									if(!z.compass.sound.playing) {
										z.elements["telegraph"].el.innerHTML =  "<i>loading sound ...</i>";
										window.setTimeout(() => { z.elements["telegraph"].el.innerHTML =  "sound on"}, 8000);
									}
									else {
										z.elements["telegraph"].el.innerHTML =  "sound on";
									}
									z.compass.sound.playing = true;
									z.elements["soundlink"].el.classList.add("active");
								});
							} catch(e) { z.tools.logerror("dashboard ::: resumeaudio " + e) } 
						}
						else { 
							try {
								z.radio.player.context.suspend().then(() => {
									z.elements["telegraph"].el.innerHTML =  "sound off";
									z.compass.sound.playing = false;
									z.elements["soundlink"].el.classList.remove("active");
								});
							} catch(e) { z.tools.logerror("dashboard ::: suspendaudio " + e) }
						}
					}
				},
			],
			map3a: [
				{
					stream: "start",
					action: e => {
						z.tools.logmsg("initialize map3a");
					}
				},
				{
					stream: "circles",
					action: e => {
						// z.tools.logmsg("map3a ::: circles 0 e = " + JSON.stringify(e));
						try {
							let dx = z.compass.canvas.grid.dx, dy = z.compass.canvas.grid.dy;
							let min = Math.min(dx,dy);
							// let elements = z.tools.vectorToMatrix(z.elements["circles"].filter( (circle, j, circles) => j < circles.length/2 ), Math.floor(z.compass.canvas.grid.nrows/2), Math.floor(z.compass.canvas.grid.ncols/2));
							// let elements = z.tools.vectorToMatrix(z.elements["circles"], Math.floor(z.compass.canvas.grid.nrows), Math.floor(z.compass.canvas.grid.ncols));
							e.elements.forEach( (row, r) => {
								let cy = r*dy + dy/2;
								e.elements[r].forEach( (col,c) => {
									let cx = c*dx + dx/2; 
									let radius = min*z.tools.randominteger(3,5)/10;
									let color = z.compass.canvas.colors[z.tools.randominteger(0, z.compass.canvas.colors.length)];
									let x = c*dx;
									Velocity({	
										elements: e.elements[r][c].el,
										properties: { fillOpacity: 0.0, strokeOpacity: 1.0, stroke: color, strokeWidth: z.compass.canvas.grid.sw, fill: color, cx: cx, cy: cy, r: radius },
										options: { duration: z.tools.randominteger(e.dt*200,e.dt*400),  delay: z.tools.randominteger(0,e.dt*600), easing: "easeInOutQuad" },
									});
								})

							})
						} catch(err) { z.tools.logerror("map3a ::: circles ::: " + err ) }
						// z.tools.logmsg("dimensions stream " + JSON.stringify(e));
					}
				},
			],
			map3b: [
				{
					stream: "start",
					action: e => {
						z.tools.logmsg("initialize map3b");
					}
				},
				{
					stream: "circles",
					action: e => {
						try {
							let dx = z.compass.canvas.grid.dx, dy = z.compass.canvas.grid.dy;
							let min = Math.min(dx,dy);
							let elements = z.tools.vectorToMatrix(z.elements["circles"], Math.floor(z.compass.canvas.grid.nrows/2), Math.floor(z.compass.canvas.grid.ncols/2));
							e.elements.forEach( (row, r) => {
								let cy = r*dy + dy/2;
								e.elements[r].forEach( (col,c) => {
									let cx = c*dx + dx/2; 
									let radius = min*z.tools.randominteger(3,5)/10;
									let color = z.compass.canvas.colors[z.tools.randominteger(0, z.compass.canvas.colors.length)];
									let x = c*dx;
									Velocity({	
										elements: e.elements[r][c].el,
										properties: { fillOpacity: 1.0, strokeOpacity: 0.0, stroke: color, strokeWidth: 12, fill: color, cx: cx, cy: cy, r: radius },
										options: { duration: z.tools.randominteger(e.dt*200,e.dt*400),  delay: z.tools.randominteger(0,e.dt*600), easing: "easeInOutQuad" },
									});
								})

							})
						} catch(err) { z.tools.logerror("map3b ::: circles 1 ::: " + err ) }
						// z.tools.logmsg("dimensions stream " + JSON.stringify(e));
					}
				}
			],
			map3c: [
				{
					stream: "start",
					action: e => {
						z.tools.logmsg("initialize map3c");
					}
				},
				{
					stream: "circles",
					action: e => {
						try {
							let dx = z.compass.canvas.grid.dx, dy = z.compass.canvas.grid.dy;
							let min = Math.min(dx,dy);
							let elements = z.tools.vectorToMatrix(z.elements["circles"], Math.floor(z.compass.canvas.grid.nrows/2), Math.floor(z.compass.canvas.grid.ncols/2));
							e.elements.forEach( (row, r) => {
								let cy = r*dy + dy/2;
								e.elements[r].forEach( (col,c) => {
									let cx = c*dx + dx/2; 
									let radius = min*z.tools.randominteger(4,20)/10;
									let color = z.compass.canvas.colors[z.tools.randominteger(0, z.compass.canvas.colors.length)];
									let x = c*dx;
									Velocity({	
										elements: e.elements[r][c].el,
										properties: { fillOpacity: 0.0, strokeOpacity: 1.0, stroke: color, strokeWidth: z.compass.canvas.grid.sw, fill: color, cx: cx, cy: cy, r: radius },
										options: { duration: z.tools.randominteger(e.dt*200,e.dt*400),  delay: z.tools.randominteger(0,e.dt*600), easing: "easeInOutQuad" },
									});
								})

							})
						} catch(err) { z.tools.logerror("map3c ::: circles 0 ::: " + err ) }
						// z.tools.logmsg("dimensions stream " + JSON.stringify(e));
					}
				},
			],

		} },
		createtools: z => {
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
		},
		createradio: z => {
			return {
				player: {}, loading: [],
				clipduration: { min:0, max:0 },
				n: { buffersplaying: 0, grainsplaying:0 },
				max: { buffersplaying: z.compass.sound.maxbuffers, grainsplaying: z.compass.sound.maxgrains },
				durationthrottle: z.compass.sound.durationthrottle,
				loadclips: z => {
					Object.keys(z.score.sounds.clips).forEach( key => {
						let clip = z.score.sounds.clips[key];
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
					z.compass.sound.loaded = true;
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
						let instrument = z.score.sounds.instruments[e.instrument];
						let clip = z.score.sounds.clips[instrument.clip];
						z.tools.logmsg("buffer playing = " + instrument.clip);
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
					catch(err) { z.tools.logerror("line playbuffer" + err) }
				},
				playgrain: e =>  {
					// z.tools.logmsg("ngrainsplaying = " + z.radio.n.grainsplaying);
					// if(z.radio.n.grainsplaying<z.radio.max.grainsplaying) {
					try {
						let instrument = z.score.sounds.instruments[e.instrument];
						let clip = z.score.sounds.clips[instrument.clip];
						z.tools.logmsg("grain playing = " + instrument.clip);
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
					catch(err) { z.tools.logerror("radio playgrain " + err) }
				}
			}
		},
		createelements: z => {
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
			
			elements["transforms"] = [];
			z.tools.logmsg('document.querySelectorAll(".transform").length = ' + document.querySelectorAll(".pathpointlink").length);
			document.querySelectorAll(".transform").forEach( ( el, j ) => {
				elements["transforms"][ el.getAttribute("id") ] = { el: el, uri: el.getAttribute("uri"), id: el.getAttribute("id") };
				z.tools.logmsg('el.getAttribute("id") = ' + el.getAttribute("id"));
			});

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
		},
	} 
}

window.onload = z => { 
	z.score = createscore(z);
	z.tools = z.score.createtools(z);
	z.compass = z.score.createcompass(z);
	z.elements = z.score.createelements(z);
	z.radio = z.score.createradio(z);
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
	z.tools.logmsg("z.compass.pathpoints.contents = " + JSON.stringify(z.compass.pathpoints.contents));
	z.compass.pathpoints.contents.forEach( id => z.elements["contents"][id].el.style.display="none" );
	z.elements["contents"][z.compass.pathpoints.contents[0]].el.style.display="block";

	if(!z.actions["all"]) z.actions["all"] = [];

	z.actions[ "all" ].filter( action => action.stream == "start" ).forEach( action => {
		action.action({});
	});
	z.actions[ "all" ].filter( action => action.stream !== "start" && z.streams[action.stream] ).forEach( action => {
		z.streams[action.stream].onValue( action.action );
	});
	z.tools.logmsg("z.compass.pathpoints.actions[0].stream = " + z.actions[z.compass.pathpoints.actions[0]].map(action => action.stream ));
	z.actions[ z.compass.pathpoints.actions[0] ].filter( action => action.stream == "start" ).forEach( action => {
		action.action({});
	});
	z.actions[ z.compass.pathpoints.actions[0] ].filter( action => action.stream !== "start" && z.streams[action.stream] ).forEach( action => {
		z.tools.logmsg("action.stream = " + action.stream);
		z.streams[action.stream].onValue( action.action );
	});
	
	// z.tools.logmsg("z.score = " + JSON.stringify(z.score,null,2));
}

