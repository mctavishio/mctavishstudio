let createdrawp = z => {
	// ***** drawing parameters stream ---------
	(function() {
		let name = "drawp";
		let dt = 1; //in seconds
		let date0 = new Date();
		let t0 = Math.floor(date0.getTime()/1000);
		let tostring = function(e) {return "draw parameters"};
		let drawp0 = {
			count: 0,
			dt:dt, t0:t0, tostring: tostring, name:name 
		};
		z.streams[name] = Kefir.combine([z.streams["tick"]], [z.streams["palette"], z.streams["canvas"], z.streams["boxpick"]], (tick, palette, canvas, boxpick) => { return {tick:tick, palette:palette, canvas:canvas, boxpick:boxpick } })
			.scan( (state, e) => { 
				state.tick = e.tick;
				state.palette = e.palette;
				state.canvas = e.canvas;
				state.boxpick = e.boxpick;
				state.count = state.count + 1;
				return state;
		}, drawp0  );
		z.streams[name].onValue( e => { 
			// z.tools.logmsg(JSON.stringify(e));
		});
	})();
};