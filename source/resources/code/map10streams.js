// ***** ############## streams ############## ---------
let createstreams = z => {
	z.streams = {};

	// ***** drawp stream ---------
	createdrawp(z);

	// ***** box stream ---------
	(function() {
		let name = "box";
		let dt = 2; //in seconds
		let ratios = [5,10,15,20,30,40];
		let tostring = function(e) {return "box"};
		let box0 = {
			elements: z.elements["box"],
			count: 0,
			dt:dt, tostring: tostring, name:name 
		};
		z.streams[name] = z.streams["drawp"].filter( e => e.tick.t%dt===0 )
			.scan( (state, e) => { 
				state.tick = e.tick;
				state.palette = e.palette;
				state.canvas = e.canvas;
				state.count = state.count + 1;
				return state;
			}, box0  )
		z.streams[name].onValue( e => { 
			try {
				let color = e.palette.colors[z.tools.randominteger(0,e.palette.colors.length)];
				if(e.count%5!==0) {
					Velocity({	
						elements: e.elements.el,
						properties: { fillOpacity: 0.0, strokeOpacity: 1.0, stroke: color, strokeWidth: z.tools.randominteger(e.canvas.min/100, e.canvas.min/20), strokeDasharray: z.tools.randominteger(10, e.canvas.max*2), fill: color, x: 0, y: 0, width: e.canvas.width, height: e.canvas.height },
						options: { duration: z.tools.randominteger(e.dt*800,e.dt*900),  delay: z.tools.randominteger(0,e.dt*80), easing: "easeInOutQuad" },
					});
				}
				else if(e.count%3===0) {
					Velocity({	
						elements: e.elements.el,
						properties: { fillOpacity: 0.0, strokeOpacity: 1.0, stroke: color, strokeWidth: z.tools.randominteger(e.canvas.min/40, e.canvas.min/10), strokeDasharray: 9, fill: color, x: 0, y: 0, width: e.canvas.width, height: e.canvas.height },
						options: { duration: z.tools.randominteger(e.dt*800,e.dt*900),  delay: z.tools.randominteger(0,e.dt*80), easing: "easeInOutQuad" },
					});
				}
				else if(e.count%2===0) {
					Velocity({	
						elements: e.elements.el,
						properties: { fillOpacity: 0.0, strokeOpacity: 1.0, stroke: color, strokeWidth: z.tools.randominteger(e.canvas.min/100, e.canvas.min/40), strokeDasharray: z.tools.randominteger(10, e.canvas.min*2), fill: color, x: z.tools.randominteger(0,e.canvas.grid.nrows-1)*e.canvas.grid.dx, y: 0, width: e.canvas.grid.dx, height: e.canvas.height },
						options: { duration: z.tools.randominteger(e.dt*800,e.dt*900),  delay: z.tools.randominteger(0,e.dt*80), easing: "easeInOutQuad" },
					});
				}
				else {
					Velocity({	
						elements: e.elements.el,
						properties: { fillOpacity: 0.0, strokeOpacity: 1.0, stroke: color, strokeWidth: z.tools.randominteger(e.canvas.min/20, e.canvas.min/10), strokeDasharray: z.tools.randominteger(10, e.canvas.min*2), fill: color, x: 0, y: z.tools.randominteger(0,e.canvas.grid.ncols-1)*e.canvas.grid.dy, width: e.canvas.width, height: e.canvas.grid.dy },
						options: { duration: z.tools.randominteger(e.dt*800,e.dt*900),  delay: z.tools.randominteger(0,e.dt*80), easing: "easeInOutQuad" },
					});
				}
				
			} catch(err) {}
			// z.tools.logmsg(JSON.stringify(e));
		});
	})();

	// ***** text stream ---------
	(function() {
		let name = "text";
		let dt = 4; //in seconds
		let ratios = [5,10,15,20,30,40];
		let rhythms = [
			[980, 0], [680, 300], [940, 40], [480, 480], [880,100], [680, 300], [800,180]
		];
		let tostring = function(e) {return "text"};
		let text0 = {
			elements: z.elements["texts"],
			count: 0, data: z.data.language.playlists["maps1"],
			dt:dt, tostring: tostring, name:name 
		};
		z.streams[name] = z.streams["drawp"].filter( e => e.tick.t%dt===0 )
			.scan( (state, e) => { 
				state.tick = e.tick;
				state.palette = e.palette;
				state.canvas = e.canvas;
				state.count = state.count + 1;
				return state;
			}, text0  )
		z.streams[name].onValue( e => { 
			try {
				e.elements.forEach( (textel, r) => {
					if( z.tools.randominteger(0,10) < 4 ) {
						let texts = e.data[z.tools.randominteger(0,e.data.length)];
						let text = z.data.language.texts[texts];
						let n = (e.count+r)%text.length;
						// z.tools.logmsg("e.tick.dt = " + e.tick.dt + " e.dt = " + e.dt)
						let pulsedt = 100;
						let color = e.palette.colors[z.tools.randominteger(0,e.palette.colors.length)];
						let fontsize = z.tools.randominteger(e.canvas.min*.4, e.canvas.max);
						let top = z.tools.randominteger(0, e.canvas.height  - fontsize*1.5);
						let left = z.tools.randominteger(0,  e.canvas.width - fontsize);
						let staticCSS = {
							color: color,
							opacity: function(j,n){ return z.tools.randominteger(0,10)/10 },
							top: function(j,n){ return top.toString() + "px" }, 
							left: function(j,n){ return left.toString() + "px" }, 
							"font-size": fontsize + "px"
						};
						z.tools.applyCSS(e.elements[r].el, staticCSS);
						Kefir.sequentially(pulsedt, text[n]+" ").onValue( l => {
							e.elements[r].el.innerHTML = l;
						})
					}
				});

			} catch(err) {z.tools.logerror("text " + err)}
			// z.tools.logmsg(JSON.stringify(e));
		});
	})();

	// ***** square stream ---------
	(function() {
		let name = "squares";
		let dt = 1; //in seconds
		let ratios = [5,10,15,20,30,40];
		let tostring = function(e) {return "square stream"};
		let box0 = {
			elements: z.elements["squares"],
			count: 0,
			dt:dt, tostring: tostring, name:name 
		};
		z.streams[name] = z.streams["drawp"].filter( e => e.tick.t%dt===0 )
			.scan( (state, e) => { 
				state.tick = e.tick;
				state.palette = e.palette;
				state.canvas = e.canvas;
				state.count = state.count + 1;
				return state;
			}, box0  )
		z.streams[name].onValue( e => { 
			// let el = e.elements[e.count%z.score.m].el;
			Array.from(Array(z.score.m).keys()).forEach(  m => {
				// try {
					let color = e.palette.colors[z.tools.randominteger(0,e.palette.colors.length)];
					if(z.tools.randominteger(0,10) < 4 ) {
						let sw = z.tools.randominteger(e.canvas.min/10, e.canvas.min/2);
						Velocity({	
							elements: e.elements[m].el,
							properties: { fillOpacity: 0.0, strokeOpacity: 1.0, stroke: color, strokeWidth: sw, strokeDasharray: z.tools.randominteger(10, e.canvas.max), fill: color, x: z.tools.randominteger(10, e.canvas.width-10), y: 0, opacity: z.tools.randominteger(4,10)/10, width: z.tools.randominteger(10, e.canvas.width-10), height: e.canvas.height },
							options: { duration: z.tools.randominteger(e.dt*400,e.dt*600),  delay: z.tools.randominteger(0,e.dt*200), easing: "easeInOutQuad" },
						});
					}
					else {
						let sw = z.tools.randominteger(e.canvas.min/40, e.canvas.min/4);
						Velocity({	
							elements: e.elements[m].el,
							properties: { fillOpacity: 0.0, strokeOpacity: 1.0, stroke: color, strokeWidth: sw, strokeDasharray: z.tools.randominteger(10, e.canvas.max), fill: color, x: 0, y: e.canvas.height, width: e.canvas.width, height: 0 },
							options: { duration: z.tools.randominteger(e.dt*400,e.dt*600),  delay: z.tools.randominteger(0,e.dt*200), easing: "easeInOutQuad" },
						});
					}
				// } catch(err) {}
				// z.tools.logmsg(JSON.stringify(e));
			});
		});
	})();


	// ***** sound set stream ---------
	(function() {
		let name = "sounds";
		let dt = 38; //in seconds
		let date0 = new Date();
		let t0 = Math.floor(date0.getTime()/1000);
		let tostring = function(e) {return "sounds"};
		let sounds0 = {
			sounds: z.score.orchestration[ Math.floor(t0/dt)% z.score.orchestration.length ],
			count: 0,
			past: ["piano1"],
			dt:dt, tostring: tostring, name:name 
		};
		z.streams[name] = z.streams["tick"].filter( e => e.t%dt===0 )
			.scan( (state, e) => { 
				state.past = state.sounds;
				state.sounds = z.score.orchestration[ Math.floor(e.t/dt)% z.score.orchestration.length ],
				state.count = state.count + 1;
				return state;
			}, sounds0  )
		z.streams[name].onValue( e => { 
			// z.elements["stage"].el.setAttribute("style", "background-color: " + e.colors[z.tools.randominteger(0, e.colors.length)]);
			// z.tools.logmsg(JSON.stringify(e));
		});
	})();

	// ***** sound stream ---------
	(function() {
		let name = "sound";
		let dt = 1; //in seconds
		let tostring = function(e) {return "sound"};
		let sound0 = {
			count: 0,
			dt:dt, tostring: tostring, name:name 
		};
		z.streams[name] = Kefir.combine([z.streams["tick"].filter( e => e.t%dt===0 && z.score.soundplaying && z.tools.randominteger(0,10)<8 )], [z.streams["sounds"]], (tick, sounds) => { return {tick:tick, sounds:sounds } })
			.scan( (state, e) => { 
				state.tick = e.tick;
				state.sounds = e.sounds.sounds;
				state.count = state.count + 1;
				return state;
			}, sound0  )
		z.streams[name].onValue( e => { 
			try {
				let sound = e.sounds[z.tools.randominteger(0,e.sounds.length)];
				// z.tools.logmsg(" play instrument ::: " + sound);
				let instrumentname = sound;
				let instrument = z.data.sounds.instruments[sound];
				let vol = z.tools.randominteger(instrument.minvolume*10, instrument.maxvolume*10)/10;
				z.radio.playbuffer( { instrument: sound, volume: vol, delay: z.tools.randominteger(0,4)/10 } );
				if(z.tools.randominteger(0,10) < 2) {
					Kefir.sequentially(400, [0, 1, 2, 3]).onValue( x => { 
						z.radio.playgrain( { instrument: instrumentname, volume: vol, delay: 0 } );
					});
				}

			} catch(err) {}
			// z.tools.logmsg(JSON.stringify(e));
		});
	})();
}