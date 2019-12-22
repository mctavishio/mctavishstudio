// ***** ############## dom elements ############## ---------
let createelements = z => {
	let elements = {};
	elements["body"] = { el: document.querySelector("body") };
	elements["body"].el.setAttribute("id", "body");
	elements["clock"] = { el: document.querySelector("#clock") };
	elements["telegraph"] = { el: document.querySelector("#telegraph") };
	elements["stage"] = { el: document.createElement("div") };
	elements["stage"].el.setAttribute("id", "stage");
	elements["stage"].el.setAttribute("class", "frame");
	elements["stage"].el.setAttribute("style", "background-color: #191918");
	elements["body"].el.appendChild(elements["stage"].el);
	elements["text"] = { el: document.createElement("div") };
	elements["text"].el.setAttribute("id", "text");
	elements["text"].el.setAttribute("class", "absolute large");
	elements["stage"].el.appendChild(elements["text"].el);
	elements["svg"] = { el: document.createElementNS("http://www.w3.org/2000/svg", "svg") };
	elements["svg"].el.setAttributeNS(null, "id", "svg");
	elements["svg"].el.setAttributeNS(null, "class", "frame");
	elements["svg"].el.setAttributeNS(null, "width", window.innerWidth);
	elements["svg"].el.setAttributeNS(null, "height", window.innerHeight);
	elements["circles0"] = []; 
	elements["circles1"] = []; 
	elements["squares"] = []; 
	Array.from(Array(z.nrows).keys()).forEach(  r => {
		elements["circles0"][r] = []; 
		elements["circles1"][r] = []; 
		elements["squares"][r] = []; 
		Array.from(Array(z.ncols).keys()).forEach(  c => {
			elements["squares"][r].push({ el: document.createElementNS("http://www.w3.org/2000/svg", "rect") });
			elements["squares"][r][c].el.setAttributeNS(null, "id", "squares_r"+r+"c"+c);
			elements["squares"][r][c].el.setAttributeNS(null, "class", "shape square");
			elements["svg"].el.appendChild(elements["squares"][r][c].el);

			elements["circles1"][r][c] = { el: document.createElementNS("http://www.w3.org/2000/svg", "circle") };
			elements["circles1"][r][c].el.setAttributeNS(null, "id", "circles1_r"+r+"c"+c);
			elements["circles1"][r][c].el.setAttributeNS(null, "class", "shape circle");
			elements["svg"].el.appendChild(elements["circles1"][r][c].el);
		
			elements["circles0"][r][c] = { el: document.createElementNS("http://www.w3.org/2000/svg", "circle") };
			elements["circles0"][r][c].el.setAttributeNS(null, "id", "circles0_r"+r+"c"+c);
			elements["circles0"][r][c].el.setAttributeNS(null, "class", "shape circle");
			elements["svg"].el.appendChild(elements["circles0"][r][c].el);

		})
	});
	elements["box"] = { el: document.createElementNS("http://www.w3.org/2000/svg", "rect") };
	elements["box"].el.setAttributeNS(null, "id", "box");
	elements["box"].el.setAttributeNS(null, "class", "shape square");
	elements["svg"].el.appendChild(elements["box"].el);
	elements["stage"].el.appendChild(elements["svg"].el);

	return elements;
}
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
		z.streams[name] = Kefir.combine([z.streams["tick"].filter( e => e.t%dt===0 )], [z.streams["palette"], z.streams["canvas"]], (tick, palette, canvas) => { return {tick:tick, palette:palette, canvas:canvas } })
			.scan( (state, e) => { 
				state.tick = e.tick;
				state.palette = e.palette;
				state.canvas = e.canvas;
				state.count = state.count + 1;
				return state;
			}, squares0  )
		z.streams[name].onValue( e => { 
			try {
				let dx = e.canvas.grid.dx, dy = e.canvas.grid.dy;
				let color = e.palette.colors[z.tools.randominteger(0,e.palette.colors.length)];
				e.elements.forEach( (row, r) => {
					if(Math.floor(e.tick.t/dt)%4!==0) { color = e.palette.colors[z.tools.randominteger(0,e.palette.colors.length)];}
					let y = r*dy;
					e.elements[r].forEach( (col,c) => {
						if(Math.floor(e.tick.t/dt)%5!==0) { color = e.palette.colors[z.tools.randominteger(0,e.palette.colors.length)];}
						let x = c*dx;
						// console.log("c="+e.palette.colors.length + " color="+color);
						Velocity({	
							elements: e.elements[r][c].el,
							properties: { fillOpacity: 1.0, strokeOpacity: 0.0, stroke: color, strokeWidth: 12, fill: color, x: x, y: y, width: dx*ratios[z.tools.randominteger(0,ratios.length)]/10, height: dy*ratios[z.tools.randominteger(0,ratios.length)] },
							options: { duration: z.tools.randominteger(e.dt*200,e.dt*400),  delay: z.tools.randominteger(0,e.dt*600), easing: "easeInOutQuad" },
						});
					})

				})
				
			} catch(err) {}
			// // z.tools.logmsg(JSON.stringify(e));
		});
	})();


	// ***** circles0 stream ---------
	(function() {
		let name = "circles0";
		let dt = 3; //in seconds
		let ratios = [5,10,15,20,30,40];
		let tostring = function(e) {return "circles0"};
		let circles0 = {
			elements: z.elements["circles0"],
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
			}, circles0  )
		z.streams[name].onValue( e => { 
			try {
				let min = Math.min(e.canvas.grid.dx, e.canvas.grid.dy);
				// let pick = z.tools.randominteger(0,e.canvas.grid.ncols*e.canvas.grid.nrows);
				e.elements.forEach( (row, r) => {
					let cy = r*e.canvas.grid.dy + e.canvas.grid.dy/2;
					e.elements[r].forEach( (col,c) => {
						let cx = c*e.canvas.grid.dx + e.canvas.grid.dx/2, color = e.palette.colors[z.tools.randominteger(0,e.palette.colors.length)];
						// let radius = ( ((e.boxpick.row ===r && e.boxpick.col===c) || (e.boxpick.row ===c && e.boxpick.col===r)) && e.count%2===0) ? min*ratios[z.tools.randominteger(0,ratios.length)]/10 : min*z.tools.randominteger(1,3)/10;
						let radius = min*z.tools.randominteger(1,3)/10;
						// console.log("c="+e.palette.colors.length + " color="+color);

						Velocity({	
							elements: e.elements[r][c].el,
							properties: { fillOpacity: 1.0, strokeOpacity: 0.0, stroke: color, strokeWidth: e.canvas.grid.sw, fill: color, cx: cx, cy: cy, r: radius },
							options: { duration: z.tools.randominteger(e.dt*200,e.dt*400),  delay: z.tools.randominteger(0,e.dt*600), easing: "easeInOutQuad" },
						});
					})

				})
				
			} catch(err) {}
			// // z.tools.logmsg(JSON.stringify(e));
		});
	})();

	// ***** circles1 stream ---------
	(function() {
		let name = "circles1";
		let dt = 3; //in seconds
		let ratios = [5,10,15,20];
		let tostring = function(e) {return "circles1"};
		let circles1 = {
			elements: z.elements["circles1"],
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
			}, circles1  )
		z.streams[name].onValue( e => { 
			try {
				let min = Math.min(e.canvas.grid.dx, e.canvas.grid.dy);
				// let pick = z.tools.randominteger(0,e.canvas.grid.ncols*e.canvas.grid.nrows);
				e.elements.forEach( (row, r) => {
					let cy = r*e.canvas.grid.dy + e.canvas.grid.dy/2;
					e.elements[r].forEach( (col,c) => {
						// console.log("c="+c + " e.boxpick.col="+e.boxpick.col + "r="+r + " e.boxpick.row="+e.boxpick.row);
						// let radius = ( ((e.boxpick.row ===r && e.boxpick.col===c) || (e.boxpick.row ===c && e.boxpick.col===r)) && e.count%5===0)  ? min*ratios[z.tools.randominteger(0,ratios.length)]/10 : min*z.tools.randominteger(1,3)/10;
						let radius = min*z.tools.randominteger(3,5)/10;
						let cx = c*e.canvas.grid.dx + e.canvas.grid.dx/2, color = e.palette.colors[z.tools.randominteger(0,e.palette.colors.length)];
						// console.log("c="+e.palette.colors.length + " color="+color);
						Velocity({	
							elements: e.elements[r][c].el,
							properties: { fillOpacity: 1.0, strokeOpacity: 0.0, stroke: color, strokeWidth: 12, fill: color, cx: cx, cy: cy, r: radius },
							options: { duration: z.tools.randominteger(e.dt*200,e.dt*400),  delay: z.tools.randominteger(0,e.dt*600), easing: "easeInOutQuad" },
						});
					})

				})
				
			} catch(err) {}
			// // z.tools.logmsg(JSON.stringify(e));
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
			dt:dt, tostring: tostring, name:name, sounds: z.score.orchestration[0] 
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
				// z.tools.logmsg(" e.sounds ::: " + JSON.stringify(e.sounds));
				let sound = e.sounds[z.tools.randominteger(0,e.sounds.length)];
				
				let instrumentname = sound;
				let instrument = z.data.sounds.instruments[sound];
				let vol = z.tools.randominteger(instrument.minvolume*10, instrument.maxvolume*10)/10;
				z.radio.playbuffer( { instrument: sound, volume: vol, delay: z.tools.randominteger(0,4)/10 } );
				if(z.tools.randominteger(0,10) < 2) {
					Kefir.sequentially(400, [0, 1, 2, 3]).onValue( x => { 
						z.radio.playgrain( { instrument: instrumentname, volume: vol, delay: 0 } );
					});
				}

			} catch(err) { z.tools.logerror("521 ::: " + err) }
			// z.tools.logmsg(JSON.stringify(e));
		});
	})();

}