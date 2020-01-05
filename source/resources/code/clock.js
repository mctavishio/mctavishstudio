let createclock = z => {
	// ***** clock stream ---------
	(function() {
		let name = "tick";
		let dt = 1; //in seconds
		let date0 = new Date();
		let t0 = Math.floor(date0.getTime()/1000);
		let tostring = function(e) {return "clock"};
		let clock0 = {
			date: date0,
			t: t0, count: 0,
			changed: false,
			count: 0,
			past: Math.floor(t0 / 1000),
			dt:dt, t0:t0, tostring: tostring, name:name 
		};
		z.streams[name] = Kefir.withInterval( 1000, emitter => { emitter.emit( { date: new Date() } ) })
			.scan( (state, e) => { 
				state.date = e.date;
				state.past = state.t;
				state.t = Math.floor(e.date.getTime()/1000);
				state.changed = state.t !== state.past ? true : false;
				state.count = state.count + 1;
				return state;
			}, clock0  )
		z.streams[name].onValue( e => { 
			// z.tools.logmsg(JSON.stringify(e));
			z.elements["clock"].el.innerHTML = z.tools.datestr(new Date(e.t*1000));
			// z.elements["clock"].el.innerHTML = z.tools.datestr(e.date, {hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit"});
		});
	})();
};