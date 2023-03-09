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
						properties: { fillOpacity: 0.0, strokeOpacity: 1.0, stroke: color, strokeWidth: z.tools.randominteger(e.canvas.min/40, e.canvas.min/10), strokeDasharray: z.tools.randominteger(10, e.canvas.max*2), fill: color, x: 0, y: 0, width: e.canvas.width, height: e.canvas.height },
						options: { duration: z.tools.randominteger(e.dt*800,e.dt*900),  delay: z.tools.randominteger(0,e.dt*80), easing: "easeInOutQuad" },
					});
				}
				else if(e.count%3===0) {
					Velocity({	
						elements: e.elements.el,
						properties: { fillOpacity: 0.0, strokeOpacity: 1.0, stroke: color, strokeWidth: z.tools.randominteger(e.canvas.min/4, e.canvas.min/2), strokeDasharray: 9, fill: color, x: 0, y: 0, width: e.canvas.width, height: e.canvas.height },
						options: { duration: z.tools.randominteger(e.dt*800,e.dt*900),  delay: z.tools.randominteger(0,e.dt*80), easing: "easeInOutQuad" },
					});
				}
				else if(e.count%2===0) {
					Velocity({	
						elements: e.elements.el,
						properties: { fillOpacity: 0.0, strokeOpacity: 1.0, stroke: color, strokeWidth: z.tools.randominteger(e.canvas.min/40, e.canvas.min/10), strokeDasharray: z.tools.randominteger(10, e.canvas.min*2), fill: color, x: z.tools.randominteger(0,e.canvas.grid.nrows-1)*e.canvas.grid.dx, y: 0, width: e.canvas.grid.dx, height: e.canvas.height },
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
				Array.from(Array(z.score.m).keys()).forEach(  m => {
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
			} catch(err) { z.tools.logerror("circles: " + err ); }
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
				Array.from(Array(z.score.m).keys()).forEach(  m => {
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
						options: { duration: duration,  delay: delay, easing: "easeInOutQuad", complete: () => { console.log("done " + m) } },
					});
				});

			} catch(err) { z.tools.logerror("lines ::: " + err)}
			// z.tools.logmsg(JSON.stringify(e));
		});
	})();

	// ***** canvas stream ---------

	(function() { z.streams["canvas"].onValue( e => { 
		z.elements["canvas"].el.setAttribute("width", e.width);
		z.elements["canvas"].el.setAttribute("height", e.height);
	}) })();
	//https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Advanced_animations
	(function() {
		let name = "canvas";
		let dt = 1; //in seconds
		let ratios = [4,8,12,16,20];
		let warmgrays = ["#fcfbe3", "#e2e1cc", "#c9c8b5", "#b0af9e", "#979688", "#7e7d71", "#64645a", "#4b4b44", "#32322d", "#191916", "#000000"];

		let tostring = function(e) {return "canvas stream"};
		let box0 = {
			elements: z.elements["canvas"],
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
			}, box0  )
		z.streams[name].onValue( e => { 
			
			let color = ["#fcfbe3", "#191918"][z.tools.randominteger(0,2)];
			let dx = e.canvas.grid.dx, dy = e.canvas.grid.dy;

			// Array.from(Array(z.score.m).keys()).forEach(  m => {
				// try {
					// color = warmgrays[z.tools.randominteger(0,warmgrays.length)];
					color = e.palette.colors[z.tools.randominteger(0,e.palette.colors.length)];
					e.elements.ctx.fillStyle = color;
					e.elements.ctx.strokeStyle = color;
					e.elements.ctx.lineWidth = z.tools.randominteger(5,e.canvas.min/20);
					// e.elements.ctx.lineWidth = e.canvas.min*ratios[z.tools.randominteger(0,ratios.length)]/200;
					let m = e.count%z.score.m;
					
					let x0 = e.boxpick.past[m][1]*dx + dx/2;
					let y0 = e.boxpick.past[m][0]*dy + dy/2;
					// z.tools.logmsg("e.boxpick.past[m][0]*dx = " + e.boxpick.past[m][0]*dx);
					// z.tools.logmsg("e.boxpick.past[m][0]*dy = " + e.boxpick.past[m][0]*dy);
					
					let r = z.tools.randominteger(10, e.canvas.min/3);
					let x1=x0+r, x2=x0-r;
					let y1=y0+r, y2=y0-r;
					
					// e.elements.ctx.arc(x0,y0,r,startangle,endangle)
					e.elements.ctx.beginPath();
					e.elements.ctx.arc(x0, y0, r, 0,2 * Math.PI);
					if(z.tools.randominteger(0,10)<11) { e.elements.ctx.fill(); }
					else { e.elements.ctx.stroke(); }

					color = e.palette.colors[z.tools.randominteger(0,e.palette.colors.length)];
					e.elements.ctx.strokeStyle = color;
					e.elements.ctx.moveTo(x0,y1);
					e.elements.ctx.lineTo(x0, y2);
					e.elements.ctx.moveTo(x1,y0);
					e.elements.ctx.lineTo(x2, y0);
					e.elements.ctx.stroke();

					// e.elements.ctx.fillRect(x2, y2, dx, dy);
					// e.elements.ctx.fillRect(x1, y1, dx, dy);
					// e.elements.ctx.fillRect(x0, y0, dx, dy);
				// } catch(err) {}
				// z.tools.logmsg(JSON.stringify(e));
			// });
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