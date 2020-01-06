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
				
				Velocity({	
					elements: e.elements.el,
					properties: { fillOpacity: 0.0, strokeOpacity: 1.0, stroke: color, strokeWidth: z.tools.randominteger(e.canvas.min/100, e.canvas.min/40), strokeDasharray: z.tools.randominteger(10, e.canvas.max*2), fill: color, x: 0, y: 0, width: e.canvas.width, height: e.canvas.height },
					options: { duration: z.tools.randominteger(e.dt*800,e.dt*900),  delay: z.tools.randominteger(0,e.dt*80), easing: "easeInOutQuad" },
				});
				
				
				
			} catch(err) {}
			// z.tools.logmsg(JSON.stringify(e));
		});
	})();

	// ***** hr stream ---------
	if(z.score.dataset.includes("hr")) {
		(function() {
			let name = "hr";
			let dt = z.score.data["hr"].normalizedrate;
			z.tools.logmsg("hr dt = " + dt)
			let tostring = function(e) {return "hr"};
			let nshapes = z.elements[name].length;
			let data = z.score.data[name].normalizeddata;
			let hr0 = {
				count: 0, data: data,
				n: data.length, start: z.score.data["hr"].t0, 
				end: z.score.data["hr"].tend,
				dt:dt, tostring: tostring, name: name 
			}
			z.tools.logmsg(" start = " + z.tools.datestr(new Date(hr0.start*1000)) + " end = " + z.tools.datestr(new Date(hr0.end*1000)));
			z.streams[name] = z.streams["drawp"].filter( e => e.tick.t%dt===0 )
				.scan( (state, e) => { 
					state.tick = e.tick;
					state.palette = e.palette;
					state.canvas = e.canvas;
					state.clock = e.clock;
					state.count = state.count + 1;
					if(e.clock.t <= state.start || e.clock.t >= state.end) { state.count = 0 }
					return state;
				}, hr0  )
			z.streams[name].onValue( e => { 
				try {
					let min = Math.min(e.canvas.grid.dx, e.canvas.grid.dy);
					// z.tools.logmsg(" start = " + e.start + " end = " + e.end);
					let j = e.count%nshapes;
					let k = e.count;
					let data = e.data[k%e.n], color = "#9a0000";

					if(e.clock.t >= e.start && e.clock.t <= e.end) {
						let pulsedt = e.tick.dt*980*e.dt/5;
						let r = .1*e.canvas.min + e.canvas.min*data, sw = min*data/6;
						Kefir.sequentially(pulsedt, ["p", "u", "l", "s", "e"]).onValue( l => {
							let pulsedt = e.tick.dt*980*e.dt/5;
							let r = (j+1)*e.canvas.min/10 + e.canvas.min*data*.6, sw = min*data/6;
							
							Velocity({	
								elements: z.elements["hr"][j].el,
								properties: { fillOpacity: 0.4, strokeOpacity: 1.0, stroke: color, strokeWidth: sw, fill: color, cx: e.canvas.width/2, cy: e.canvas.height/2, r: r },
								options: { duration: e.dt*e.tick.dt*480*nshapes,  delay: e.dt*e.tick.dt*220*nshapes*(nshapes-j), easing: "easeInOutSine" },
							});
							Velocity({	
								elements: z.elements["hr"][j].el,
								properties: { fillOpacity: 1.0, strokeOpacity: 1.0, stroke: color, strokeWidth: sw*1.2, fill: color, cx: e.canvas.width/2, cy: e.canvas.height/2, r: r*0.95 },
								options: { duration: e.dt*e.tick.dt*180*nshapes,  delay: 0, easing: "easeInOutSine" },
							});
						});
					}
					else {
						Velocity({	
							elements: z.elements["hr"][j].el,
							properties: { fillOpacity: 0.0, strokeOpacity: 0.0, stroke: color, strokeWidth: min*data/6, fill: color, cx: e.canvas.width*( (j+0.5)/nshapes), cy: e.canvas.height-data*e.canvas.height, r: e.canvas.min*data*0.9 },
							options: { duration: e.dt*e.tick.dt*480*nshapes,  delay: 0, easing: "easeInOutSine" },
						});
					}
				} catch(err) { z.tools.logerror("jules stream  ::: hr" + err);; }
				// z.tools.logmsg("*** hr " + JSON.stringify(e.count));
			});
		})();	
	}
	// ***** temp stream ---------
	if(z.score.dataset.includes("temp")) {
		(function() {
			let name = "temp";
			let dt = z.score.data["temp"].normalizedrate;
			let tostring = function(e) {return "temp"};
			let nshapes = z.elements[name].length;
			let data = z.score.data[name].normalizeddata;
			let temp0 = {
				count: 0, data: data,
				n: data.length, start: z.score.data["temp"].t0, 
				end: z.score.data["temp"].tend,
				dt:dt, tostring: tostring, name: name 
			}
			// z.tools.logmsg(" start = " + z.tools.datestr(new Date(temp0.start*1000)) + " end = " + z.tools.datestr(new Date(temp0.end*1000)));
			z.streams[name] = z.streams["drawp"].filter( e => e.tick.t%dt===0 )
				.scan( (state, e) => { 
					state.tick = e.tick;
					state.palette = e.palette;
					state.canvas = e.canvas;
					state.clock = e.clock;
					state.count = state.count + 1;
					if(e.clock.t < state.start || e.clock.t >= state.end) { state.count = 0 }
					return state;
				}, temp0  )
			z.streams[name].onValue( e => { 
				try {
					let min = Math.min(e.canvas.grid.dx, e.canvas.grid.dy);
					// z.tools.logmsg(" temp start = " + e.start + " end = " + e.end);
					let j = e.count%nshapes;
					let k = e.count;
					let data = e.data[k%e.n], color = "#006699";
					let sw = data*e.canvas.height*.6, dash = z.tools.randominteger(10,e.canvas.width*.6*[1.0,0.4][j]);
					color = e.palette.colors[z.tools.randominteger(0,e.palette.colors.length)]
					if(e.clock.t >= e.start && e.clock.t <= e.end ) {
						Velocity({	
							elements: z.elements["temp"][j].el,
							properties: { strokeOpacity: 1.0, stroke: color, strokeWidth: sw, strokeDasharray: dash, x1: 0, x2: e.canvas.width, y1: e.canvas.height/2, y2: e.canvas.height/2 },
							options: { duration: e.dt*e.tick.dt*680*nshapes,  delay: 0, easing: "easeInOutSine" },
						});
					}
					else {
						Velocity({	
							elements: z.elements["temp"][j].el,
							properties: { strokeOpacity: 1.0, stroke: color, strokeWidth: 10, strokeDasharray: dash, x1: 0, x2: e.canvas.width, y1: e.canvas.height/2, y2: e.canvas.height/2 },
							options: { duration: e.dt*e.tick.dt*480*nshapes,  delay: 0, easing: "easeInOutSine" },
						});
						Velocity({	
							elements: z.elements["temp"][j].el,
							properties: { strokeOpacity: 0.4, strokeDasharray: z.tools.randominteger(10,e.canvas.width*.2)},
							options: { duration: e.dt*e.tick.dt*480*nshapes,  delay: 0, easing: "easeInOutSine" },
						});
					}
				} catch(err) { z.tools.logerror("jules stream  ::: temp" + err); }
			});
		})();
	}
	// ***** eda stream ---------
	if(z.score.dataset.includes("eda")) {
		(function() {
			let name = "eda";
			let dt = z.score.data["eda"].normalizedrate;
			let tostring = function(e) {return "eda"};
			let nshapes = z.elements[name].length;
			z.tools.logmsg("nshapes = " + nshapes);
			let data = z.score.data[name].normalizeddata;
			let eda0 = {
				count: 0, data: data,
				n: data.length, start: z.score.data["eda"].t0, 
				end: z.score.data["eda"].tend,
				dt:dt, tostring: tostring, name: name 
			}
			// z.tools.logmsg(" start = " + z.tools.datestr(new Date(eda0.start*1000)) + " end = " + z.tools.datestr(new Date(eda0.end*1000)));
			z.streams[name] = z.streams["drawp"].filter( e => e.tick.t%dt===0 )
				.scan( (state, e) => { 
					state.tick = e.tick;
					state.palette = e.palette;
					state.canvas = e.canvas;
					state.clock = e.clock;
					state.count = state.count + 1;
					if(e.clock.t < state.start || e.clock.t >= state.end) { state.count = 0 }
					return state;
				}, eda0  )
			z.streams[name].onValue( e => { 
				try {
					let min = Math.min(e.canvas.grid.dx, e.canvas.grid.dy);
					// z.tools.logmsg(" start = " + e.start + " end = " + e.end);


					let j = e.count%nshapes;
					
					// z.tools.logmsg(" e.canvas.width*( (j)/nshapes) " + e.canvas.width*( (j)/nshapes));

					let data = e.data[e.count%e.n];
					let color = ["#9a0000", "#fcfbe3", "#191918"][j%3]; //"warmbwred"
					if(e.clock.t >= e.start && e.clock.t <= e.end ) {
						let sw = min*data/4;
						Velocity({	
							elements: z.elements["eda"][j].el,
							properties: { fillOpacity: 1.0, strokeOpacity: 1.0, stroke: color, strokeWidth: min*data/6, fill: color, x: e.canvas.width*( (j)/nshapes), width: e.canvas.width/nshapes, y: 0.9*e.canvas.height, height: 0.1*e.canvas.height },
							options: { duration: e.dt*e.tick.dt*180*nshapes,  delay: 0, easing: "easeInOutSine" },
						});
						Velocity({	
							elements: z.elements["eda"][j].el,
							properties: { fillOpacity: 1.0, strokeOpacity: 1.0, stroke: color, strokeWidth: sw, fill: color, x: e.canvas.width*( (j)/nshapes)+sw/2, width: e.canvas.width/nshapes-sw, y: e.canvas.height-data*e.canvas.height, height: data*e.canvas.height },
							options: { duration: e.dt*e.tick.dt*180*nshapes,  delay: 0, easing: "easeInOutSine" },
						});
						Velocity({	
							elements: z.elements["eda"][j].el,
							properties: { fillOpacity: 0.4, strokeOpacity: 1.0, stroke: color, strokeWidth: sw, fill: color, x: e.canvas.width*( (j)/nshapes)+sw/2, width: e.canvas.width/nshapes-sw, y: e.canvas.height-data*e.canvas.height, height: data*e.canvas.height },
							options: { duration: e.dt*e.tick.dt*380*nshapes,  delay: 0, easing: "easeInOutSine" },
						});
					}
					else {

						Velocity({	
							elements: z.elements["eda"][j].el,
							properties: { fillOpacity: 1.0, strokeOpacity: 1.0, stroke: color, strokeWidth: sw, fill: color, x: e.canvas.width*( (j+0.5)/nshapes)+sw/2, width: e.canvas.width/nshapes-sw, y: e.canvas.height/2, height: 0.1*e.canvas.height },
							options: { duration: e.dt*e.tick.dt*480*nshapes,  delay: 0, easing: "easeInOutSine" },
						});
						Velocity({	
							elements: z.elements["eda"][j].el,
							properties: { fillOpacity: 0.4, strokeOpacity: 1.0, stroke: color, strokeWidth: sw, fill: color, x: e.canvas.width*( (j+0.5)/nshapes)+sw/2, width: e.canvas.width/nshapes-sw, y: e.canvas.height/2, height: 0.2*e.canvas.height },
							options: { duration: e.dt*e.tick.dt*300*nshapes,  delay: 0, easing: "easeInOutSine" },
						});
					}
					
				} catch(err) { z.tools.logerror("eda error ::: " + err); }
				// z.tools.logmsg("*** eda count = " + JSON.stringify(e.count) + " e.n =  " + JSON.stringify(e.n));
			});
		})();
	}
	// ***** bvp stream ---------
	if(z.score.dataset.includes("bvp")) {
		(function() {
			let name = "bvp";
			let dt = z.score.data["bvp"].normalizedrate;
			let tostring = function(e) {return "bvp"};
			let nshapes = z.elements[name].length;
			let nlines = z.elements[name + "yline"].length;
			let data = z.score.data[name].normalizeddata;
			let bvp0 = {
				count: 0, data: data,
				n: data.length, start: z.score.data["bvp"].t0, 
				end: z.score.data["bvp"].tend,
				dt:dt, tostring: tostring, name: name 
			}
			z.streams[name] = z.streams["drawp"].filter( e => e.tick.t%dt===0 )
				.scan( (state, e) => { 
					state.tick = e.tick;
					state.palette = e.palette;
					state.canvas = e.canvas;
					state.clock = e.clock;
					state.count = state.count + 1;
					if(e.clock.t < state.start || e.clock.t >= state.end) { state.count = 0 }
					return state;
				}, bvp0  )
			z.streams[name].onValue( e => { 
				try {
					let min = Math.min(e.canvas.grid.dx, e.canvas.grid.dy);
					// z.tools.logmsg(" start = " + e.start + " end = " + e.end);
					let j = e.count%nshapes, jline = e.count%nlines;
					let k = e.count;

					let data = e.data[k%e.n], color = "#fcfbe3";
					let jcolor = e.palette.colors[z.tools.randominteger(0,e.palette.colors.length)]
					if(e.clock.t >= e.start && e.clock.t <= e.end ) {
						Velocity({	
							elements: z.elements["bvpyline"][jline].el,
							properties: { strokeOpacity: 1.0, strokeDasharray: z.tools.randominteger(10,e.canvas.width), stroke: jcolor, strokeWidth: 18*data*data, y1: data*e.canvas.height, y2: data*e.canvas.height, x1: 0, x2: e.canvas.width },
							options: { duration: e.dt*e.tick.dt*680*nlines,  delay: 0, easing: "easeInOutSine" },
						});
						Velocity({	
							elements: z.elements["bvpyline"][jline].el,
							properties: { strokeOpacity: 1.0, strokeDasharray: z.tools.randominteger(10,e.canvas.width), y1: data*e.canvas.height, y2: data*e.canvas.height, x1: 0, x2: e.canvas.width },
							options: { duration: e.dt*e.tick.dt*180*nlines,  delay: 0, easing: "easeInOutSine" },
						});

						Velocity({	
							elements: z.elements["bvp"][j].el,
							properties: { fillOpacity: 1.0, strokeOpacity: 1.0, stroke: color, strokeWidth: min*data/6, fill: color, cx: e.canvas.width*( (j+0.5)/nshapes), cy: data*e.canvas.height, r: 0.8*e.canvas.width*data/nshapes },
							options: { duration: e.dt*e.tick.dt*480*nshapes,  delay: 0, easing: "easeInOutSine" },
						});
						Velocity({	
							elements: z.elements["bvp"][j].el,
							properties: { fillOpacity: 0.4, strokeOpacity: 1.0, stroke: color, strokeWidth: min*data/6, fill: color, cx: e.canvas.width*( (j+0.5)/nshapes), cy: data*e.canvas.height, r: 0.8*e.canvas.width*data/nshapes },
							options: { duration: e.dt*e.tick.dt*300*nshapes,  delay: 0, easing: "easeInOutSine" },
						});
					}
					else {
						Velocity({	
							elements: z.elements["bvpyline"][jline].el,
							properties: { strokeOpacity: 1.0, strokeDasharray: z.tools.randominteger(10,e.canvas.width), stroke: e.palette.colors[z.tools.randominteger(0,e.palette.colors.length)], strokeWidth: 10*data*data, y1: e.canvas.height, y2: e.canvas.height, x1: 0, x2: e.canvas.width },
							options: { duration: e.dt*e.tick.dt*380*nlines,  delay: 0, easing: "easeInOutSine" },
						});
						Velocity({	
							elements: z.elements["bvpyline"][jline].el,
							properties: { strokeOpacity: 1.0, strokeDasharray: z.tools.randominteger(10,e.canvas.width), strokeWidth: 20*data*data, y1: data*e.canvas.height, y2: data*e.canvas.height, x1: 0, x2: e.canvas.width },
							options: { duration: e.dt*e.tick.dt*280*nlines,  delay: 0, easing: "easeInOutSine" },
						});

						Velocity({	
							elements: z.elements["bvp"][j].el,
							properties: { fillOpacity: 1.0, strokeOpacity: 1.0, stroke: color, strokeWidth: min*data/6, fill: color, cx: e.canvas.width*( (j+0.5)/nshapes), cy: 0, r: z.tools.randominteger(4,min) },
							options: { duration: e.dt*e.tick.dt*480*nshapes,  delay: 0, easing: "easeInOutSine" },
						});
						Velocity({	
							elements: z.elements["bvp"][j].el,
							properties: { fillOpacity: 0.4, strokeOpacity: 1.0, stroke: color, strokeWidth: min*data/6, fill: color, cx: e.canvas.width*( (j+0.5)/nshapes), cy: 0, r: z.tools.randominteger(4,min)*2 },
							options: { duration: e.dt*e.tick.dt*300*nshapes,  delay: 0, easing: "easeInOutSine" },
						});
					}
					
				} catch(err) { z.tools.logmsg("bvp error ::: " + err); }
				// z.tools.logmsg("*** bvp count = " + JSON.stringify(e.count) + " e.n =  " + JSON.stringify(e.n));
			});
		})();
	}
	// ***** acc stream ---------
	if(z.score.dataset.includes("acc")) {
		(function() {
			let name = "acc";
			let dt = z.score.data["acc"].normalizedrate;
			let tostring = function(e) {return "acc"};
			let nshapes = z.elements[name].length;
			let nlines = z.elements[name + "yline"].length;
			let data = z.score.data[name].normalizeddata;
			let acc0 = {
				count: 0, data: data,
				n: data.length, start: z.score.data["acc"].t0, 
				end: z.score.data["acc"].tend, total: z.score.data["acc"].tend-z.score.data["acc"].t0,
				dt:dt, tostring: tostring, name: name 
			}
			// z.tools.logmsg(" start = " + z.tools.datestr(new Date(acc0.start*1000)) + " end = " + z.tools.datestr(new Date(acc0.end*1000)));
			z.streams[name] = z.streams["drawp"].filter( e => e.tick.t%dt===0 )
				.scan( (state, e) => { 
					state.tick = e.tick;
					state.palette = e.palette;
					state.canvas = e.canvas;
					state.clock = e.clock;
					state.count = state.count + 1;
					if(e.clock.t < state.start || e.clock.t >= state.end) { state.count = 0 }
					return state;
				}, acc0  )
			z.streams[name].onValue( e => { 
				try {
					let min = Math.min(e.canvas.grid.dx, e.canvas.grid.dy);
					// z.tools.logmsg(" start = " + e.start + " end = " + e.end);
					let j = e.count%nshapes, jline = e.count%nlines;
					let k = e.count;
					let data = e.data[k%e.n];
					let color = ["#ffcc00", "#fcfbe3", "#191918"][j%3]; //"warmbwyellow"
					if(e.clock.t >= e.start && e.clock.t <= e.end ) {
						let cx = data[0]*e.canvas.width, cy = data[1]*e.canvas.height, cz = data[2]*(nshapes-j)/nshapes;
						Velocity({	
							elements: z.elements["accyline"][jline].el,
							properties: { strokeOpacity: 1.0, strokeDasharray: z.tools.randominteger(10,e.canvas.width), stroke: "#000000", strokeWidth: 20*cz*cz, y1: cy, y2: cy, x1: 0, x2: e.canvas.width },
							options: { duration: e.dt*e.tick.dt*780*nlines,  delay: 0, easing: "easeInOutSine" },
						});
						Velocity({	
							elements: z.elements["accyline"][jline].el,
							properties: { strokeOpacity: 0.4, strokeDasharray: z.tools.randominteger(10,e.canvas.width/2), stroke: "#000000", strokeWidth: 40*cz*cz, y1: cy, y2: cy, x1: 0, x2: e.canvas.width },
							options: { duration: e.dt*e.tick.dt*180*nlines,  delay: 0, easing: "easeInOutSine" },
						});

						Velocity({	
							elements: z.elements["accxline"][jline].el,
							properties: { strokeOpacity: 1.0, strokeDasharray: z.tools.randominteger(10,e.canvas.height), stroke: "#000000", strokeWidth: 20*cz*cz, y1: 0, y2: e.canvas.height, x1: cx, x2: cx },
							options: { duration: e.dt*e.tick.dt*680*nlines,  delay: 0, easing: "easeInOutSine" },
						});
						Velocity({	
							elements: z.elements["accxline"][jline].el,
							properties: { strokeOpacity: 0.4, strokeDasharray: z.tools.randominteger(10,e.canvas.height/2), stroke: "#000000", strokeWidth: 40*cz*cz, y1: 0, y2: e.canvas.height, x1: cx, x2: cx },
							options: { duration: e.dt*e.tick.dt*280*nlines,  delay: 0, easing: "easeInOutSine" },
						});

						Velocity({	
							elements: z.elements["acc"][j].el,
							properties: { fillOpacity: k%4===0 ? 1.0 : 0.0, strokeOpacity: 1.0, stroke: color, strokeWidth: 80*cz, fill: color, cx: cx, cy: cy, r: e.canvas.min*cz/4 },
							options: { duration: e.dt*e.tick.dt*900*nshapes-20*j,  delay: e.dt*e.tick.dt*20*j, easing: "easeInOutSine" },
						});
					}
					else {
						let cx = 0, cy = 0, cz = 0;
						Velocity({	
							elements: z.elements["accyline"][jline].el,
							properties: { strokeOpacity: 1.0, strokeDasharray: z.tools.randominteger(10,e.canvas.width), stroke: "#000000", strokeWidth: 20*cz*cz, y1: cy, y2: cy, x1: 0, x2: e.canvas.width },
							options: { duration: e.dt*e.tick.dt*680*nlines,  delay: 0, easing: "easeInOutSine" },
						});
						Velocity({	
							elements: z.elements["accyline"][jline].el,
							properties: { strokeOpacity: 1.0, strokeDasharray: z.tools.randominteger(10,e.canvas.width), stroke: "#000000", strokeWidth: 40*cz*cz, y1: cy, y2: cy, x1: 0, x2: e.canvas.width },
							options: { duration: e.dt*e.tick.dt*180*nlines,  delay: 0, easing: "easeInOutSine" },
						});

						Velocity({	
							elements: z.elements["accxline"][jline].el,
							properties: { strokeOpacity: 1.0, strokeDasharray: z.tools.randominteger(10,e.canvas.width), stroke: "#000000", strokeWidth: 20*cz*cz, y1: 0, y2: e.canvas.height, x1: cx, x2: cx },
							options: { duration: e.dt*e.tick.dt*680*nlines,  delay: 0, easing: "easeInOutSine" },
						});
						Velocity({	
							elements: z.elements["accxline"][jline].el,
							properties: { strokeOpacity: 1.0, strokeDasharray: z.tools.randominteger(10,e.canvas.width), stroke: "#000000", strokeWidth: 40*cz*cz, y1: 0, y2: e.canvas.height, x1: cx, x2: cx },
							options: { duration: e.dt*e.tick.dt*180*nlines,  delay: 0, easing: "easeInOutSine" },
						});

						Velocity({	
							elements: z.elements["acc"][j].el,
							properties: { fillOpacity: 0.0, strokeOpacity: 1.0, stroke: color, strokeWidth: 100*cz, fill: color, cx: cx, cy: cy, r: e.canvas.min*cz/4 },
							options: { duration: e.dt*e.tick.dt*480*nshapes,  delay: 0, easing: "easeInOutSine" },
						});
						Velocity({	
							elements: z.elements["acc"][j].el,
							properties: { fillOpacity: 0.8, strokeOpacity: 1.0, stroke: color, strokeWidth: 120*cz, fill: color, cx: cx, cy: cy, r: e.canvas.min*cz/4 },
							options: { duration: e.dt*e.tick.dt*300*nshapes,  delay: 0, easing: "easeInOutSine" },
						});
					}
					
				} catch(err) { z.tools.logmsg("acc error ::: " + err); }
				// z.tools.logmsg("*** acc count = " + JSON.stringify(e.count) + " e.n =  " + JSON.stringify(e.n));
			});
		})();	
	}

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