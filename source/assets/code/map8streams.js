// ***** ############## streams ############## ---------
let createstreams = z => {
	z.streams = {};

	// ***** clock stream ---------
	createclock(z);

	// ***** box pick stream ---------
	(function() {
		let name = "boxpick";
		let dt = 9; //in seconds
		let ratios = [5,10,15,20,30,40];
		
		let tostring = function(e) {return "box pick"};
		let pick0 = {
			row: 0, col: 0,
			count: 0, nrow: z.nrows, ncols: z.ncols,
			past: [0,0],
			dt:dt, tostring: tostring, name:name 
		};
		z.streams[name] = z.streams["tick"].filter( e => e.t%dt===0 )
			.scan( (state, e) => { 
				state.past = [state.row,state.col];
				state.row = z.tools.randominteger(0, state.nrows);
				state.col = z.tools.randominteger(0, state.ncols);
				state.count = state.count + 1;
				return state;
			}, pick0  )
		z.streams[name].onValue( e => { 
			// z.elements["stage"].el.setAttribute("style", "background-color: " + e.colors[z.tools.randominteger(0, e.colors.length)]);
			// z.tools.logmsg(JSON.stringify(e));
		});
	})();

	// ***** color palette stream ---------
	(function() {
		let name = "palette";
		let dt = 48; //in seconds
		let date0 = new Date();
		let t0 = Math.floor(date0.getTime()/1000);
		let palette = z.score.palette;
		let tostring = function(e) {return "color palette"};
		let palette0 = {
			palette: palette,
			colors: palette[ Math.floor(t0/dt)%palette.length ],
			count: 0,
			past: ["#fcfbe3", "#191918"],
			dt:dt, tostring: tostring, name:name 
		};
		z.streams[name] = z.streams["tick"].filter( e => e.t%dt===0 )
			.scan( (state, e) => { 
				state.past = state.colors;
				state.colors = state.palette[ Math.floor(e.t/dt)%state.palette.length ];
				state.count = state.count + 1;
				return state;
			}, palette0  )
		z.streams[name].onValue( e => { 
			// z.elements["stage"].el.setAttribute("style", "background-color: " + e.colors[z.tools.randominteger(0, e.colors.length)]);
			// z.tools.logmsg(JSON.stringify(e.colors));
		});
	})();

	// ***** canvas stream ---------
	(function() {
		let name = "canvas";
		let dt = 400; //in milliseconds
		let tostring = e => { return "canvas stream" };
		let width = window.innerWidth, height = window.innerHeight;
		// let nrows = 8, ncols = 8;
		let dx = Math.floor(width/z.nrows), dy = Math.floor(height/z.ncols);
		let sw = Math.floor(Math.max(dx*.03, dy*.03, 4));
		// z.tools.logmsg("strokewidth = " + sw);
		let canvas0 = { 
			grid: { nrows: z.nrows, ncols: z.ncols, dx: dx, dy: dy, sw: sw },
			width: width, height: height, 
			max: Math.max(window.innerWidth, window.innerHeight), min: Math.min(window.innerWidth, window.innerHeight), 
			dt:dt, tostring: tostring, name:name 
		};
		z.streams[name] = Kefir.fromEvents(window, "resize").throttle(dt)
			.scan( (state,e) => {
				state.width = window.innerWidth;
				state.height = window.innerHeight;
				state.max = Math.max(state.width, state.height);
				state.min = Math.min(state.width, state.height);
				state.grid.dx = Math.floor(state.width/state.grid.nrows);
				state.grid.dy = Math.floor(state.height/state.grid.ncols);
				state.grid.sw = Math.floor(Math.max(state.grid.dx*.03, state.grid.dy*.03, 4));
				// z.tools.logmsg("strokewidth = " + state.grid.sw);
				// z.tools.logmsg("size ::: " + state.width + " x " + state.height);
				// z.tools.logmsg("canvas = " + JSON.stringify(state));
				return state
			}, canvas0)

		z.streams[name].onValue( e => { 
			// z.tools.logmsg(JSON.stringify(e));
		});
	})();

	// ***** box pick stream ---------
	(function() {
		let name = "boxpick";
		let dt = 9; //in seconds
		let ratios = [5,10,15,20,30,40];
		
		let tostring = function(e) {return "box pick"};
		let pick0 = {
			row: 0, col: 0,
			count: 0, nrows: z.nrows, ncols: z.ncols,
			past: [0,0],
			dt:dt, tostring: tostring, name:name,
			past: [],
		};
		//build memory
		Array.from(Array(z.m).keys()).forEach(  r => {
			pick0.past.unshift([0,0]);
		});
		z.streams[name] = z.streams["tick"].filter( e => e.t%dt===0 )
			.scan( (state, e) => { 
				state.past.shift();
				state.past.push([z.tools.randominteger(0, state.nrows), z.tools.randominteger(0, state.ncols)]);
				state.row = z.tools.randominteger(0, state.nrows);
				// state.col = z.tools.randominteger(0, state.ncols);
				state.count = state.count + 1;
				return state;
			}, pick0  );
		z.streams[name].onValue( e => { 
			// z.tools.logmsg("boxpick stream " + JSON.stringify(e));
		});
	})();

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
		z.streams[name] = Kefir.combine([z.streams["tick"].filter( e => e.t%dt===0 )], [z.streams["palette"], z.streams["canvas"]], (tick, palette, canvas) => { return {tick:tick, palette:palette, canvas:canvas } })
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
						properties: { fillOpacity: 0.0, strokeOpacity: 1.0, stroke: color, strokeWidth: z.tools.randominteger(e.canvas.min/100, e.canvas.min/40), strokeDasharray: z.tools.randominteger(10, e.canvas.max*2), fill: color, x: 0, y: 0, width: e.canvas.width, height: e.canvas.height },
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
						properties: { fillOpacity: 0.0, strokeOpacity: 1.0, stroke: color, strokeWidth: z.tools.randominteger(e.canvas.min/100, e.canvas.min/40), strokeDasharray: z.tools.randominteger(10, e.canvas.min*2), fill: color, x: 0, y: z.tools.randominteger(0,e.canvas.grid.ncols-1)*e.canvas.grid.dy, width: e.canvas.width, height: e.canvas.grid.dy },
						options: { duration: z.tools.randominteger(e.dt*800,e.dt*900),  delay: z.tools.randominteger(0,e.dt*80), easing: "easeInOutQuad" },
					});
				}
				
			} catch(err) {}
			// z.tools.logmsg(JSON.stringify(e));
		});
	})();

	// ***** square stream ---------
	(function() {
		let name = "squares";
		let dt = 4; //in seconds
		let ratios = [5,10,15,20,30,40];
		let tostring = function(e) {return "squares"};
		let squares0 = {
			elements: z.elements["squares"],
			count: 0,
			dt:dt, tostring: tostring, name:name 
		};
		z.streams[name] = z.streams["drawp"].filter( e => e.tick.t%dt===0 )
			.scan( (state, e) => { 
				state.tick = e.tick;
				state.palette = e.palette;
				state.canvas = e.canvas;
				state.boxpick = e.boxpick;
				state.count = state.count + 1;
				return state;
			}, squares0  )
		z.streams[name].onValue( e => { 
			try {
				// z.tools.logmsg("** e.canvas = " + JSON.stringify(e.canvas));
				let dx = e.canvas.grid.dx, dy = e.canvas.grid.dy;
				let color = e.palette.colors[z.tools.randominteger(0,e.palette.colors.length)];
				let ratio = ratios[z.tools.randominteger(0,ratios.length)]/10;
				e.elements.filter( (row, r) => r!==e.boxpick.past[0][0] ).forEach( (row, r) => {
					if(Math.floor(e.tick.t/dt)%4!==0) { color = e.palette.colors[z.tools.randominteger(0,e.palette.colors.length)];}
					let y = r*dy;
					e.elements[r].forEach( (col,c) => {
						if(Math.floor(e.tick.t/dt)%5!==0) { color = e.palette.colors[z.tools.randominteger(0,e.palette.colors.length)];}
						let x = c*dx;
						let n = (c === e.boxpick.past[0][1]) ? 20 : z.tools.randominteger(1,14);
						// console.log("c="+e.palette.colors.length + " color="+color);
						Velocity({	
							elements: e.elements[r][c].el,
							properties: { fillOpacity: 1.0, strokeOpacity: 0.0, stroke: color, strokeWidth: 12, fill: color, x: x, y: y, width: dx*ratio*n, height: dy*ratio*n },
							options: { duration: z.tools.randominteger(e.dt*200,e.dt*400),  delay: z.tools.randominteger(0,e.dt*600), easing: "easeInOutQuad" },
						});
					})

				})
			} catch(err) { 
				// z.tools.logerror("squares " + err)
			}
			
		});
	})();

	// ***** circles stream ---------
	(function() {
		let name = "circles";
		let dt = 3; //in seconds
		let ratios = [5,10,15,20,30,40];
		let rhythms = [
			[960, 20], [680, 300], [940, 40], [480, 480], [880,100], [680, 300], [800,180]
		];
		let tostring = function(e) {return "circles"};
		let circles0 = {
			elements: z.elements["circles"],
			count: 0,
			dt:dt, tostring: tostring, name:name 
		};
		z.streams[name] = z.streams["drawp"].filter( e => e.tick.t%dt===0 )
			.scan( (state, e) => { 
				state.tick = e.tick;
				state.palette = e.palette;
				state.canvas = e.canvas;
				state.boxpick = e.boxpick;
				state.count = state.count + 1;
				return state;
			}, circles0  )
		z.streams[name].onValue( e => { 
			try {
				// let past = e.boxpick.past.sort( (a, b) => b[1] - b[0] );
				let past = e.boxpick.past;
				let min = Math.floor(e.canvas.min/14);
				let n = z.tools.randominteger(0, rhythms.length);
				let r,cx,cy,radius,color,duration,delay;
				let dx = e.canvas.grid.dx, dy = e.canvas.grid.dy;
				let colors = e.palette.colors;
				//build memory
				Array.from(Array(z.m).keys()).forEach(  m => {
					r = past[m][0], c = past[m][1];
					cx = c*dx + dx/2, cy = r*dy + dy/2;
					color = colors[z.tools.randominteger(0,colors.length)];
					radius = min*ratios[(e.count+m)%ratios.length]/10;
					duration = z.tools.randominteger(e.dt*rhythms[(n+m)%rhythms.length][0]*.8, e.dt*rhythms[(n+m)%rhythms.length][0]);
					delay = z.tools.randominteger(e.dt*rhythms[(n+m)%rhythms.length][1]*.8, e.dt*rhythms[(n+m)%rhythms.length][1]);
					Velocity({	
						elements: e.elements[m][0].el,
						properties: { fillOpacity: 1.0, strokeOpacity: 0.0, stroke: color, strokeWidth: e.canvas.grid.sw*2, fill: color, cx: cx, cy: cy, r: radius },
						options: { duration: duration,  delay: delay, easing: "easeInOutQuad" },
					});
					color = colors[z.tools.randominteger(0,colors.length)];
					radius = radius*(z.tools.randominteger(10,38)/40);
					duration = z.tools.randominteger(e.dt*rhythms[(n+m)%rhythms.length][0]*.8, e.dt*rhythms[(n+m)%rhythms.length][0]);
					delay = z.tools.randominteger(e.dt*rhythms[(n+m+1)%rhythms.length][1]*.8, e.dt*rhythms[(n+m)%rhythms.length][1]);
					
					Velocity({	
						elements: e.elements[m][1].el,
						properties: { fillOpacity: 1.0, strokeOpacity: 0.0, stroke: color, strokeWidth: e.canvas.grid.sw*2, fill: color, cx: cx, cy: cy, r: radius },
						options: { duration: duration,  delay: delay, easing: "easeInOutQuad" },
					});
				});
			} catch(err) {}
			// z.tools.logmsg(JSON.stringify(e));
		});
	})();

	// ***** lines stream ---------
	(function() {
		let name = "lines";
		let dt = 2; //in seconds
		let ratios = [5,10,15,20,30,40];
		let rhythms = [
			[960, 20], [680, 300], [940, 40], [480, 480], [880,100], [680, 300], [800,180]
		];
		let tostring = function(e) {return "lines"};
		let lines0 = {
			elements: z.elements["lines"],
			count: 0,
			dt:dt, tostring: tostring, name:name 
		};
		z.streams[name] = z.streams["drawp"].filter( e => e.tick.t%dt===0 )
			.scan( (state, e) => { 
				state.tick = e.tick;
				state.palette = e.palette;
				state.canvas = e.canvas;
				state.boxpick = e.boxpick;
				state.count = state.count + 1;
				return state;
			}, lines0  )
		z.streams[name].onValue( e => { 
			try {
				// let past = e.boxpick.past.sort( (a, b) => b[1] - b[0] );
				let past = e.boxpick.past;
				let min = Math.min(e.canvas.grid.dx, e.canvas.grid.dy);
				let n = z.tools.randominteger(0, rhythms.length);
				let r,cx,cy,sw,dash,color,duration,delay;
				let dx = e.canvas.grid.dx, dy = e.canvas.grid.dy;
				let colors = e.palette.colors;
				let sw0 = e.canvas.grid.sw;
				//build memory
				Array.from(Array(z.m).keys()).forEach(  m => {
					r = past[m][0], c = past[m][1];
					cx = c*dx + dx/2, cy = r*dy + dy/2;
					color = colors[z.tools.randominteger(0,colors.length)];
					sw = sw0*z.tools.randominteger(2,14);
					dash = z.tools.randominteger(10, e.canvas.max);					duration = z.tools.randominteger(e.dt*rhythms[(n+m)%rhythms.length][0]*.8, e.dt*rhythms[(n+m)%rhythms.length][0]);
					delay = z.tools.randominteger(e.dt*rhythms[(n+m)%rhythms.length][1]*.8, e.dt*rhythms[(n+m)%rhythms.length][1]);
					Velocity({	
						elements: e.elements[m][0].el,
						properties: { strokeOpacity: 1.0, stroke: color, strokeWidth: sw, strokeDasharray: dash, x1: cx, x2: cx, y1: 0, y2: e.canvas.height },						options: { duration: duration,  delay: delay, easing: "easeInOutQuad" },
					});
					color = colors[z.tools.randominteger(0,colors.length)];
					sw = sw0*z.tools.randominteger(2,14);
					dash = z.tools.randominteger(10, e.canvas.max);	
					duration = z.tools.randominteger(e.dt*rhythms[(n+m+1)%rhythms.length][0]*.8, e.dt*rhythms[(n+m+1)%rhythms.length][0]);
					delay = z.tools.randominteger(e.dt*rhythms[(n+m+1)%rhythms.length][1]*.8, e.dt*rhythms[(n+m+1)%rhythms.length][1]);
					Velocity({	
						elements: e.elements[m][1].el,
						properties: { strokeOpacity: 1.0, stroke: color, strokeWidth: sw, strokeDasharray: dash, x1: 0, x2: e.canvas.width, y1: cy, y2: cy },
						options: { duration: duration,  delay: delay, easing: "easeInOutQuad" },
					});
					// r0 = past[(m+1)%past.length][0], c0 = past[(m+1)%past.length][1];
					// cx0 = c0*dx + dx/2, cy0 = r0*dy + dy/2;
					// color = "#fcfbe3";
					// sw = sw0*z.tools.randominteger(8,20);
					// dash = z.tools.randominteger(10, e.canvas.max);	
					// duration = e.dt*800;
					// delay = e.dt*180;
					// Velocity({	
					// 	elements: e.elements[m][2].el,
					// 	properties: { strokeOpacity: 1.0, stroke: color, strokeWidth: sw, strokeDasharray: dash, x1: cx0, x2: cx0, y1: 0, y2: e.canvas.height },
					// 	options: { duration: duration,  delay: delay, easing: "easeInOutQuad" },
					// });
					// Velocity({	
					// 	elements: e.elements[m][3].el,
					// 	properties: { strokeOpacity: 1.0, stroke: color, strokeWidth: sw, strokeDasharray: dash, x1: 0, x2: e.canvas.width, y1: cy0, y2: cy0 },
					// 	options: { duration: duration,  delay: delay, easing: "easeInOutQuad" },
					// });
				});

			} catch(err) { z.tools.logerror("lines" + err)}
			// z.tools.logmsg(JSON.stringify(e));
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
		z.streams[name] = Kefir.combine([z.streams["tick"].filter( e => e.t%dt===0 && z.soundplaying && z.tools.randominteger(0,10)<8 )], [z.streams["sounds"]], (tick, sounds) => { return {tick:tick, sounds:sounds } })
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
				let instrument = z.resources.sounds.instruments[sound];
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