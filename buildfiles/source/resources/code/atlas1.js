// ***** ############## initialize z ############## ---------
let createscore = z => {
	let gridn = [4,8];
	let soundcorepath = "data/sound/";
	let instruments = [
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
		cello_pitch1I: {clip: "cello_pitch1", minvolume: 0.3, maxvolume: 0.8, playbackRate: () => { return z.data.sounds.intervals.I(100) / 100 } },
		cello_pitch2: {clip: "cello_pitch2", minvolume: 0.3, maxvolume: 0.9, playbackRate: () => { return z.tools.randomharmonic()/10 } },
		cello_pitch3: {clip: "cello_pitch3", minvolume: 0.3, maxvolume: 0.9, playbackRate: () => { return z.tools.randomharmonic()/10 } },
		meow: {clip: "meow",minvolume: 0.6, maxvolume: 1.0, playbackRate: () => { return z.tools.randominteger(1, 9)/10 } },
		meowlow: {clip: "meow",minvolume: 0.8, maxvolume: 1.0, playbackRate: () => { return z.tools.randominteger(1,4)/10 } },
		mags1: {clip: "mags1", minvolume: 0.3, maxvolume: 0.8 },
		mags1harmonic: {clip: "mags1", minvolume: 0.3, maxvolume: 0.8, playbackRate: () => { return z.tools.randomlowharmonic()/10 } },
		mags2harmonic: {clip: "mags2", minvolume: 0.3, maxvolume: 0.8, playbackRate: () => { return z.tools.randomlowharmonic()/10 } },
		submarineecho1: {clip: "submarineecho", minvolume: 0.2, maxvolume: 0.8 },
		submarineecho2: {clip: "submarineecho",  minvolume: 0.2, maxvolume: 0.8, playbackRate: () => { return z.tools.randomharmonic()/10 } },
		submarineecho3: {clip: "submarineecho",  minvolume: 0.2, maxvolume: 0.8, playbackRate: () => { return z.tools.randomlowharmonic()/14 } },
	];
	let clips = instruments.reduce( ( clips, instrument ) => {
		clips[instrument.clip] = { url: soundcorepath + instrument.clip + ".mp3", loaded:false, duration:0, buffer:{} };
	});
	return {
		elements: {
			shapes: { circles: [ gridn[0]*gridn[0], gridn[1]*gridn[1] ], rectangles: [ gridn[0]*gridn[0], gridn[1]*gridn[1] ], lines: [0,0] },
			shapezorder: [["rectangles","rect"], ["lines","line"], ["circles","circle"]],
			boxes: {textboxes: [2,4]}, 
		},
		grid: {columns: [ gridn[0], gridn[1] ], rows: [ gridn[0], gridn[1] ]},
		sound: { 
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
				["meow", "meow","meowlow"], 
				["mags1harmonic", "accordion"], ["mags1harmonic"], ["mags2harmonic"],
				["mags1","cello_pitch1harmonic"], ["longbell"], ["bell11"], ["accordion", "bird1harmonic"],
				["bird1harmonic"], ["piano1"],
				["piano1low"], [ "piano1random"], ["piano1", "bird1harmonic"], ["piano1low"],
				["mags1harmonic"], ["cello_pitch1I"], ["cello_pitch3", "cello_pitch2"], ["cello_pitch2"], ["cello_pitch1harmonic"], 
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
		texts: { words: [], playlist: [], text: [] },
		transformationlist: ["map3a", "map3b","map3c"],
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
			streams["boxpick"] = ( () => {
				let dt = 9;
				let state0: { 
						dt: dt, count: 0,
						row: 0, col: 0,
						nrows: z.compass.canvas.grid.nrows, ncols: z.compass.canvas.grid.ncols,
						past: [],
					};
				//build memory
				Array.from(Array(z.compass.canvas.grid.pastn).keys()).forEach(  r => {
					state0.past.unshift([z.tools.randominteger(0, z.compass.canvas.grid.nrows), z.tools.randominteger(0, z.compass.canvas.grid.ncols)]);
				});
				return z.streams["tick"].filter( e => e.t%dt===0 )
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
				let state0: { 
						dt: dt, count: 0,
						playlist: z.score.colors.playlist,
						colors: playlist[ Math.floor(t0/dt)%z.score.colors.playlist.length ]
					};
				return z.streams["tick"].filter( e => e.t%dt===0 )
					.scan( (state, e) => { 
						state.colors = state.playlist[ Math.floor(e.t/dt)%state.playlist.length ];
						state.count = state.count + 1;
						return state;
					}, state0  )
			})( );
			streams["textplaylist"] = ( () => {
				let dt = 68;
				let date0 = new Date();
				let t0 = Math.floor(date0.getTime()/1000);
				let state0: { 
					dt: dt, count: 0,
					playlist: z.score.texts.playlist,
					text: playlist[ Math.floor(t0/dt)%z.score.texts.playlist.length ]
				};
				return z.streams["tick"].filter( e => e.t%dt===0 )
					.scan( (state, e) => { 
						state.text = state.playlist[ Math.floor(e.t/dt)%state.playlist.length ];
						state.count = state.count + 1;
						return state;
					}, state0  )

			})( );
			streams["soundplaylist"] = ( () => {
				let dt = 38;
				let date0 = new Date();
				let t0 = Math.floor(date0.getTime()/1000);
				let state0: { 
					dt: dt, count: 0,
					playlist: z.score.sounds.playlist,
					sounds: playlist[ Math.floor(t0/dt)%z.score.sounds.playlist.length ]
				};
				return z.streams["tick"].filter( e => e.t%dt===0 )
					.scan( (state, e) => { 
						state.sounds = state.playlist[ Math.floor(e.t/dt)%state.playlist.length ];
						state.count = state.count + 1;
						return state;
					}, state0  )
			})( );
			streams["playsounds"] = ( () => {
				let dt = 1;
				let chance = .8;
				let state0: { 
					dt: dt, count: 0, chance: chance,
				};
				return z.streams["tick"].filter( e => e.t%dt===0 && z.compass.soundplaying && z.tools.randominteger(0,10)<chance*10 );
					.scan( (state, e) => { 
						state.count = state.count + 1;
						state.tick = e.tick;
						return state;
					}, state0  )
			})( );
			let controls = []
			let gears = [
				{name: "box", dt: 2, chance:1.0},
				{name: "rectangles", dt: 4, chance:1.0},
				{name: "circles", dt: 3, chance:1.0},
			];
			gears.forEach( gear => {
				let filter = gear.chance === 1.0 ? e => e.t%gear.dt===0 : e => (e.t%gear.dt===0 && z.tools.randominteger(0,10)<gear.chance*10);
				streams[gear.name] = z.streams["tick"].filter( filter )
					.scan( (state, e) => { 
						state.count = state.count + 1;
						state.tick = e.tick;
						return state;
					}, {dt: gear.dt, count: 0, chance: gear.chance}  )
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
					stream: "dimensions",
					action: e => {
						z.compass.canvas.width = e.width;
						z.compass.canvas.height = e.height;
						z.compass.canvas.min = e.min;
						z.compass.canvas.max = e.max;
						z.compass.canvas.grid.dx = e.state.grid.dx;
						z.compass.canvas.grid.dy = e.state.grid.dy;
						z.compass.canvas.grid.sw = e.state.grid.sw;
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
							let instrument = z.score.sound.instruments[sound];
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
						try {
							let dx = z.compass.canvas.grid.dx, dy = z.compass.canvas.grid.dy;
							let color = z.compass.canvas.colors[z.tools.randominteger(0, z.compass.canvas.colors.length)];
							let elements = z.tools.vectorToMatrix(z.elements["rectangles"], z.compass.canvas.grid.nrows, z.compass.canvas.grid.ncols);
							let ratios = [5,10,15,20,30,40];
							elements.forEach( (row, r) => {
								if(Math.floor(e.tick.t/dt)%4!==0) { color = z.compass.canvas.colors[z.tools.randominteger(0, z.compass.canvas.colors.length)];}
								let y = (r%z.compass.canvas.grid.nrows)*dy;
								elements[r].forEach( (col,c) => {
									if(Math.floor(e.tick.t/dt)%5!==0) { color = z.compass.canvas.colors[z.tools.randominteger(0, z.compass.canvas.colors.length)];}
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
						// z.tools.logmsg("dimensions stream " + JSON.stringify(e));
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
						try {
							let dx = z.compass.canvas.grid.dx, dy = z.compass.canvas.grid.dy;
							let min = Math.min(dx,dy);
							let elements = z.tools.vectorToMatrix(z.elements["circles"].filter( (circle, j, circles) => j < circles.length/2 ), Math.floor(z.compass.canvas.grid.nrows/2), Math.floor(z.compass.canvas.grid.ncols/2));
							elements.forEach( (row, r) => {
								let cy = r*dy + dy/2;
								elements[r].forEach( (col,c) => {
									let cx = c*dx + dx/2; 
									let radius = min*z.tools.randominteger(3,5)/10;
									let color = z.compass.canvas.colors[z.tools.randominteger(0, z.compass.canvas.colors.length)];
									let x = c*dx;
									Velocity({	
										elements: elements[r][c].el,
										properties: { fillOpacity: 0.0, strokeOpacity: 1.0, stroke: color, strokeWidth: z.compass.canvas.grid.sw, fill: color, cx: cx, cy: cy, r: radius },
										options: { duration: z.tools.randominteger(e.dt*200,e.dt*400),  delay: z.tools.randominteger(0,e.dt*600), easing: "easeInOutQuad" },
									});
								})

							})
						} catch(err) { z.tools.logerror("map3a ::: circles 0 ::: " + err ) }
						// z.tools.logmsg("dimensions stream " + JSON.stringify(e));
					}
				},
				{
					stream: "circles",
					action: e => {
						try {
							let dx = z.compass.canvas.grid.dx, dy = z.compass.canvas.grid.dy;
							let min = Math.min(dx,dy);
							let elements = z.tools.vectorToMatrix(z.elements["circles"].filter( (circle, j, circles) => j > circles.length/2-1 ), Math.floor(z.compass.canvas.grid.nrows/2), Math.floor(z.compass.canvas.grid.ncols/2));
							elements.forEach( (row, r) => {
								let cy = r*dy + dy/2;
								elements[r].forEach( (col,c) => {
									let cx = c*dx + dx/2; 
									let radius = min*z.tools.randominteger(1,3)/10;
									let color = z.compass.canvas.colors[z.tools.randominteger(0, z.compass.canvas.colors.length)];
									let x = c*dx;
									Velocity({	
										elements: elements[r][c].el,
										properties: { fillOpacity: 1.0, strokeOpacity: 0.0, stroke: color, strokeWidth: 12, fill: color, cx: cx, cy: cy, r: radius },
										options: { duration: z.tools.randominteger(e.dt*200,e.dt*400),  delay: z.tools.randominteger(0,e.dt*600), easing: "easeInOutQuad" },
									});
								})

							})
						} catch(err) { z.tools.logerror("map3a ::: circles 1 ::: " + err ) }
						// z.tools.logmsg("dimensions stream " + JSON.stringify(e));
					}
				}
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
							let elements = z.tools.vectorToMatrix(z.elements["circles"].filter( (circle, j, circles) => j < circles.length/2 ), Math.floor(z.compass.canvas.grid.nrows/2), Math.floor(z.compass.canvas.grid.ncols/2));
							elements.forEach( (row, r) => {
								let cy = r*dy + dy/2;
								elements[r].forEach( (col,c) => {
									let cx = c*dx + dx/2; 
									let radius = min*z.tools.randominteger(1,3)/10;
									let color = z.compass.canvas.colors[z.tools.randominteger(0, z.compass.canvas.colors.length)];
									let x = c*dx;
									Velocity({	
										elements: elements[r][c].el,
										properties: { fillOpacity: 0.0, strokeOpacity: 1.0, stroke: color, strokeWidth: z.compass.canvas.grid.sw, fill: color, cx: cx, cy: cy, r: radius },
										options: { duration: z.tools.randominteger(e.dt*200,e.dt*400),  delay: z.tools.randominteger(0,e.dt*600), easing: "easeInOutQuad" },
									});
								})

							})
						} catch(err) { z.tools.logerror("map3a ::: circles 0 ::: " + err ) }
						// z.tools.logmsg("dimensions stream " + JSON.stringify(e));
					}
				},
				{
					stream: "circles",
					action: e => {
						try {
							let dx = z.compass.canvas.grid.dx, dy = z.compass.canvas.grid.dy;
							let min = Math.min(dx,dy);
							let elements = z.tools.vectorToMatrix(z.elements["circles"].filter( (circle, j, circles) => j > circles.length/2-1 ), Math.floor(z.compass.canvas.grid.nrows/2), Math.floor(z.compass.canvas.grid.ncols/2));
							elements.forEach( (row, r) => {
								let cy = r*dy + dy/2;
								elements[r].forEach( (col,c) => {
									let cx = c*dx + dx/2; 
									let radius = min*z.tools.randominteger(3,5)/10;
									let color = z.compass.canvas.colors[z.tools.randominteger(0, z.compass.canvas.colors.length)];
									let x = c*dx;
									Velocity({	
										elements: elements[r][c].el,
										properties: { fillOpacity: 1.0, strokeOpacity: 0.0, stroke: color, strokeWidth: 12, fill: color, cx: cx, cy: cy, r: radius },
										options: { duration: z.tools.randominteger(e.dt*200,e.dt*400),  delay: z.tools.randominteger(0,e.dt*600), easing: "easeInOutQuad" },
									});
								})

							})
						} catch(err) { z.tools.logerror("map3a ::: circles 1 ::: " + err ) }
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
							let elements = z.tools.vectorToMatrix(z.elements["circles"].filter( (circle, j, circles) => j < circles.length/2 ), Math.floor(z.compass.canvas.grid.nrows/2), Math.floor(z.compass.canvas.grid.ncols/2));
							elements.forEach( (row, r) => {
								let cy = r*dy + dy/2;
								elements[r].forEach( (col,c) => {
									let cx = c*dx + dx/2; 
									let radius = min*z.tools.randominteger(1,3)/10;
									let color = z.compass.canvas.colors[z.tools.randominteger(0, z.compass.canvas.colors.length)];
									let x = c*dx;
									Velocity({	
										elements: elements[r][c].el,
										properties: { fillOpacity: 1.0, strokeOpacity: 0.0, stroke: color, strokeWidth: z.compass.canvas.grid.sw, fill: color, cx: cx, cy: cy, r: radius },
										options: { duration: z.tools.randominteger(e.dt*200,e.dt*400),  delay: z.tools.randominteger(0,e.dt*600), easing: "easeInOutQuad" },
									});
								})

							})
						} catch(err) { z.tools.logerror("map3a ::: circles 0 ::: " + err ) }
						// z.tools.logmsg("dimensions stream " + JSON.stringify(e));
					}

				},
				{
					stream: "circles",
					action: e => {
						try {
							let dx = z.compass.canvas.grid.dx, dy = z.compass.canvas.grid.dy;
							let min = Math.min(dx,dy);
							let elements = z.tools.vectorToMatrix(z.elements["circles"].filter( (circle, j, circles) => j > circles.length/2-1 ), Math.floor(z.compass.canvas.grid.nrows/2), Math.floor(z.compass.canvas.grid.ncols/2));
							elements.forEach( (row, r) => {
								let cy = r*dy + dy/2;
								elements[r].forEach( (col,c) => {
									let cx = c*dx + dx/2; 
									let radius = min*z.tools.randominteger(3,5)/10;
									let color = z.compass.canvas.colors[z.tools.randominteger(0, z.compass.canvas.colors.length)];
									let x = c*dx;
									Velocity({	
										elements: elements[r][c].el,
										properties: { fillOpacity: 1.0, strokeOpacity: 0.0, stroke: color, strokeWidth: 12, fill: color, cx: cx, cy: cy, r: radius },
										options: { duration: z.tools.randominteger(e.dt*200,e.dt*400),  delay: z.tools.randominteger(0,e.dt*600), easing: "easeInOutQuad" },
									});
								})

							})
						} catch(err) { z.tools.logerror("map3a ::: circles 1 ::: " + err ) }
						// z.tools.logmsg("dimensions stream " + JSON.stringify(e));
					}
				}
			]
		} },
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